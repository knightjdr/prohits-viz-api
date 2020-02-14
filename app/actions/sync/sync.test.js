import constructJSON from '../../helpers/export/construct-json.js';
import createWorkDir from '../../helpers/files/create-work-dir.js';
import spawnProcess from './spawn.js';
import sync from './sync.js';
import validate from '../../helpers/validation/validate.js';
import writeDataFile from '../../helpers/export/write-data-file.js';

jest.mock('../../helpers/export/construct-json');
jest.mock('./spawn');
spawnProcess.mockResolvedValue();
jest.mock('../../helpers/validation/validate');
jest.mock('../../helpers/export/write-data-file');
jest.mock('../../helpers/files/create-work-dir');
writeDataFile.mockResolvedValue();

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
      validate.mockReturnValue('data');
      constructJSON.mockReturnValue('data');
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
      constructJSON.mockReturnValue({ data: 'data' });
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
});
