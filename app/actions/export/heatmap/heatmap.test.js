import createDirectories from '../../../helpers/files/create-dirs';
import createWorkDir from '../../../helpers/files/create-work-dir';
import heatmap from './heatmap';
import spawnProcess from './spawn';
import validate from '../../../helpers/validation/validate';
import writeDataFile from '../../../helpers/export/write-data-file';
import writeDownloadFile from '../../../helpers/export/write-download-file';

jest.mock('../../../helpers/files/create-dirs');
createDirectories.mockResolvedValue();
jest.mock('./spawn');
spawnProcess.mockResolvedValue();
jest.mock('../../../helpers/validation/validate');
jest.mock('../../../helpers/files/create-work-dir');
jest.mock('../../../helpers/export/write-data-file');
writeDataFile.mockResolvedValue();
jest.mock('../../../helpers/export/write-download-file');
writeDownloadFile.mockResolvedValue();

const req = {
  body: {
    imageType: 'dotplot',
    outputType: 'png',
  },
};
const res = {
  end: jest.fn(),
  locals: {
    socket: { emit: jest.fn() },
  },
  send: jest.fn(),
  status: jest.fn(),
};

const sleep = ms => (
  new Promise(resolve => setTimeout(resolve, ms))
);

describe('Exporting heatmap', () => {
  describe('when successful', () => {
    beforeAll(async (done) => {
      res.end.mockClear();
      validate.mockReturnValue({ data: { imageType: 'dotplot' } });
      createWorkDir.mockResolvedValue('workdir');
      heatmap(req, res);
      await sleep(200);
      done();
    });

    it('should end response', () => {
      expect(res.end).toHaveBeenCalled();
    });

    it('should create working directory', () => {
      expect(createWorkDir).toHaveBeenCalled();
    });

    it('should create output directories', () => {
      expect(createDirectories).toHaveBeenCalledWith('workdir', ['svg', 'png']);
    });

    it('should write request body to file', () => {
      expect(writeDataFile).toHaveBeenCalledWith('workdir', { imageType: 'dotplot' });
    });

    it('should write download instructions to file', () => {
      expect(writeDownloadFile).toHaveBeenCalledWith('workdir', 'dotplot', 'png');
    });

    it('should spawn child process', () => {
      expect(spawnProcess).toHaveBeenCalledWith(res.locals.socket, 'workdir', 'png');
    });
  });

  describe('when there is promise rejection', () => {
    beforeAll(async (done) => {
      res.end.mockClear();
      validate.mockReturnValue({ data: 'data' });
      createWorkDir.mockRejectedValue();
      heatmap(req, res);
      await sleep(200);
      done();
    });

    it('should end response', () => {
      expect(res.end).toHaveBeenCalled();
    });

    it('should emit error event to socket', () => {
      expect(res.locals.socket.emit).toHaveBeenCalledWith('action', { type: 'SAVE_ERROR' });
    });
  });

  describe('when there is a validation error', () => {
    beforeAll(async (done) => {
      res.send.mockClear();
      res.status.mockClear();
      validate.mockReturnValue({ err: new Error('test error') });
      heatmap(req, res);
      await sleep(200);
      done();
    });

    it('should set status code', () => {
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should send error response', () => {
      expect(res.send).toHaveBeenCalledWith({ message: 'Error: test error' });
    });
  });
});
