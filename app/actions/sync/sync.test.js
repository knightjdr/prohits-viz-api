const mkdir = require('../../helpers/export/mkdir');
const spawnProcess = require('./spawn');
const validate = require('../../helpers/validation/validate');
const createWorkDir = require('../../helpers/files/create-work-dir');
const writeDataFile = require('../../helpers/export/write-data-file');

jest.mock('../../helpers/export/mkdir');
mkdir.mockResolvedValue();
jest.mock('./spawn');
spawnProcess.mockResolvedValue();
jest.mock('../../helpers/validation/validate');
jest.mock('../../helpers/export/write-data-file');
jest.mock('../../helpers/files/create-work-dir');
writeDataFile.mockResolvedValue();

const sync = require('./sync');

const req = {
  body: { imageType: 'dotplot' },
  params: {
    snapshotID: 'id',
  },
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
    beforeAll(async () => {
      res.send.mockClear();
      validate.mockReturnValue({ data: 'data' });
      createWorkDir.mockResolvedValue('workdir');
      sync(req, res);
      await sleep(200);
    });

    it('should send response', () => {
      expect(res.send).toHaveBeenCalledWith({});
    });

    it('should create working directory', () => {
      expect(createWorkDir).toHaveBeenCalled();
    });

    it('should create output directories', () => {
      expect(mkdir).toHaveBeenCalledWith('workdir', ['minimap']);
    });

    it('should write request body to file', () => {
      expect(writeDataFile).toHaveBeenCalledWith('workdir', 'data');
    });

    it('should spawn child process', () => {
      expect(spawnProcess).toHaveBeenCalledWith(res.locals.socket, 'workdir', 'id');
    });
  });

  describe('when there is promise rejection', () => {
    beforeAll(async () => {
      res.send.mockClear();
      validate.mockReturnValue({ data: 'data' });
      createWorkDir.mockRejectedValue();
      sync(req, res);
      await sleep(200);
    });

    it('should send response', () => {
      expect(res.send).toHaveBeenCalledWith({});
    });

    it('should emit error event to socket', () => {
      expect(res.locals.socket.emit).toHaveBeenCalledWith('action', { snapshotID: 'id', type: 'SYNC_ERROR' });
    });
  });

  describe('when there is a validation error', () => {
    beforeAll(async () => {
      res.send.mockClear();
      res.status.mockClear();
      validate.mockReturnValue({ err: new Error('test error') });
      sync(req, res);
      await sleep(200);
    });

    it('should set status code', () => {
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should send error response', () => {
      expect(res.send).toHaveBeenCalledWith({ message: 'Error: test error' });
    });
  });
});
