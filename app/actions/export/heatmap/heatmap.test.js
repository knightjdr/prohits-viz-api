import constructJSON from '../../../helpers/export/construct-json.js';
import createWorkDir from '../../../helpers/files/create-work-dir.js';
import heatmap from './heatmap.js';
import logger from '../../../helpers/logging/logger.js';
import spawnProcess from './spawn.js';
import validate from '../../../helpers/validation/viz/validate.js';
import writeDataFile from '../../../helpers/export/write-data-file.js';

jest.mock('../../../config/config.js', () => ({ exportFont: 'font.ttf' }));
jest.mock('../../../helpers/export/construct-json.js');
jest.mock('../../../helpers/files/create-work-dir');
jest.mock('../../../helpers/logging/logger.js');
jest.mock('./spawn');
spawnProcess.mockResolvedValue();
jest.mock('../../../helpers/validation/viz/validate');
jest.mock('../../../helpers/export/write-data-file');
writeDataFile.mockResolvedValue();

const req = {
  body: {
    format: 'png',
    imageType: 'dotplot',
  },
};
const res = {
  locals: {
    socket: { emit: jest.fn() },
  },
  send: jest.fn(),
};

describe('Exporting heatmap', () => {
  describe('when successful', () => {
    beforeAll(async () => {
      res.send.mockClear();
      validate.mockReturnValue({ imageType: 'dotplot' });
      constructJSON.mockReturnValue({ imageType: 'dotplot' });
      createWorkDir.mockResolvedValue('tmp/workdir');
      await heatmap(req, res);
    });

    it('should end response', () => {
      expect(res.send).toHaveBeenCalled();
    });

    it('should create working directory name', () => {
      expect(createWorkDir).toHaveBeenCalled();
    });

    it('should write export data to file', () => {
      expect(writeDataFile).toHaveBeenCalledWith('tmp/workdir', { imageType: 'dotplot' });
    });

    it('should spawn child process', () => {
      const options = {
        font: 'font.ttf',
        format: 'png',
        imageType: 'dotplot',
        targetFile: 'workdir/png/dotplot.png',
        workingDir: 'tmp/workdir',
      };
      expect(spawnProcess).toHaveBeenCalledWith(res.locals.socket, options);
    });
  });

  describe('when there is promise rejection', () => {
    beforeAll(async () => {
      logger.error.mockClear();
      res.locals.socket.emit.mockClear();
      res.send.mockClear();
      validate.mockReturnValue({});
      constructJSON.mockReturnValue({});
      createWorkDir.mockImplementation(() => {
        throw new Error('could not create work dir');
      });
      await heatmap(req, res);
    });

    it('should end response', () => {
      expect(res.send).toHaveBeenCalled();
    });

    it('should log error', () => {
      expect(logger.error).toHaveBeenCalledWith('export - Error: could not create work dir');
    });

    it('should emit error event to socket', () => {
      expect(res.locals.socket.emit).toHaveBeenCalledWith('action', { type: 'EXPORT_ERROR' });
    });
  });

  describe('when there is a validation error', () => {
    beforeAll(async () => {
      logger.error.mockClear();
      res.locals.socket.emit.mockClear();
      res.send.mockClear();
      validate.mockImplementation(() => {
        throw new Error('test error');
      });
      await heatmap(req, res);
    });

    it('should log error', () => {
      expect(logger.error).toHaveBeenCalledWith('export - Error: test error');
    });

    it('should send error response', () => {
      expect(res.locals.socket.emit).toHaveBeenCalledWith('action', { type: 'EXPORT_ERROR' });
    });
  });
});
