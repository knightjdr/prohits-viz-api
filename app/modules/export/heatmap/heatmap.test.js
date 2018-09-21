const mkdir = require('../mkdir');
const spawnProcess = require('./spawn');
const validate = require('../../validation/validate');
const workDir = require('../../helpers/work-dir');
const writeDataFile = require('../write-data-file');
const writeDownloadFile = require('../write-download-file');

jest.mock('../mkdir');
mkdir.mockResolvedValue();
jest.mock('./spawn');
spawnProcess.mockResolvedValue();
jest.mock('../../validation/validate');
jest.mock('../../helpers/work-dir');
jest.mock('../write-data-file');
writeDataFile.mockResolvedValue();
jest.mock('../write-download-file');
writeDownloadFile.mockResolvedValue();

const heatmap = require('./heatmap');

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
      workDir.mockResolvedValue('workdir');
      heatmap(req, res);
      await sleep(200);
      done();
    });

    it('should end response', () => {
      expect(res.end).toHaveBeenCalled();
    });

    it('should create working directory', () => {
      expect(workDir).toHaveBeenCalled();
    });

    it('should create output directories', () => {
      expect(mkdir).toHaveBeenCalledWith('workdir', ['svg', 'png']);
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
      workDir.mockRejectedValue();
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
