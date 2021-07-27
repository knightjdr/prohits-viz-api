import mockFS from 'mock-fs';

import archive from './archive.js';
import downloadFolder from './download-folder.js';
import logger from '../../../helpers/logging/logger.js';

jest.mock('../../../config/config', () => ({
  workDir: 'tmp/',
}));
jest.mock('./archive.js');
jest.mock('../../../helpers/logging/logger.js');

const mockedFileSystem = {
  tmp: {
    taskID: {
      interactive: {
        'interactive-file.json': '',
      },
    },
  },
};

mockFS(mockedFileSystem);

const res = {
  end: jest.fn(),
  status: jest.fn(),
};

afterAll(() => {
  mockFS.restore();
});

describe('Download folder', () => {
  describe('successfully', () => {
    it('should archive folder', async () => {
      archive.mockClear();
      const req = {
        params: {
          folder: 'taskID',
        },
      };
      await downloadFolder(req, res);
      expect(archive).toHaveBeenCalledWith('tmp/taskID', res);
    });
  });

  describe('unsuccessfully', () => {
    beforeAll(async () => {
      logger.error.mockClear();
      res.end.mockClear();
      res.status.mockClear();
      archive.mockImplementation(() => {
        throw new Error('cannot archive folder');
      });
      const req = {
        params: {
          folder: 'taskID',
        },
      };
      await downloadFolder(req, res);
    });

    it('should log error', () => {
      expect(logger.error).toHaveBeenCalledWith('download folder - Error: cannot archive folder');
    });

    it('should set status', () => {
      expect(res.status).toHaveBeenCalledWith(500);
    });

    it('should end response', () => {
      expect(res.end).toHaveBeenCalled();
    });
  });
});
