const mkdir = require('../export/mkdir');
const spawnProcess = require('./spawn');
const validate = require('../validation/validate');
const workDir = require('../helpers/work-dir');
const writeDataFile = require('../export/write-data-file');

jest.mock('../export/mkdir');
mkdir.mockResolvedValue();
jest.mock('./spawn');
spawnProcess.mockResolvedValue();
jest.mock('../validation/validate');
jest.mock('../helpers/work-dir');
jest.mock('../export/write-data-file');
writeDataFile.mockResolvedValue();

const sync = require('./sync');

const req = {
  body: { imageType: 'dotplot' },
};
const res = {
  locals: {
    socket: { emit: jest.fn() },
  },
  send: jest.fn(),
  status: jest.fn(),
};

const sleep = ms => (
  new Promise(resolve => setTimeout(resolve, ms))
);

describe('Syncing minimap', () => {
  describe('when successful', () => {
    beforeAll(async (done) => {
      res.send.mockClear();
      validate.mockReturnValue({ data: 'data' });
      workDir.mockResolvedValue('workdir');
      sync(req, res);
      await sleep(200);
      done();
    });

    it('should send response', () => {
      expect(res.send).toHaveBeenCalledWith({});
    });

    it('should create working directory', () => {
      expect(workDir).toHaveBeenCalled();
    });

    it('should create output directories', () => {
      expect(mkdir).toHaveBeenCalledWith('workdir', ['minimap']);
    });

    it('should write request body to file', () => {
      expect(writeDataFile).toHaveBeenCalledWith('workdir', 'data');
    });

    it('should spawn child process', () => {
      expect(spawnProcess).toHaveBeenCalledWith(res.locals.socket, 'workdir');
    });
  });

  describe('when there is promise rejection', () => {
    beforeAll(async (done) => {
      res.send.mockClear();
      validate.mockReturnValue({ data: 'data' });
      workDir.mockRejectedValue();
      sync(req, res);
      await sleep(200);
      done();
    });

    it('should send response', () => {
      expect(res.send).toHaveBeenCalledWith({});
    });

    it('should emit error event to socket', () => {
      expect(res.locals.socket.emit).toHaveBeenCalledWith('action', { type: 'SYNC_ERROR' });
    });
  });

  describe('when there is a validation error', () => {
    beforeAll(async (done) => {
      res.send.mockClear();
      res.status.mockClear();
      validate.mockReturnValue({ err: new Error('test error') });
      sync(req, res);
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
