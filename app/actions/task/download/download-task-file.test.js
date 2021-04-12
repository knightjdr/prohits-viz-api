import mockFS from 'mock-fs';

import downloadTaskFile from './download-task-file.js';
import readStream from '../../../helpers/download/read-stream.js';

jest.mock('../../../config/config', () => ({
  archiveDir: 'archive/',
  workDir: 'tmp/',
}));
jest.mock('../../../helpers/download/read-stream.js');

const mockedFileSystem = {
  archive: {
    'archiveID.json': '',
  },
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

describe('Download task file', () => {
  describe('for archive folder', () => {
    describe('successfully', () => {
      beforeAll(async () => {
        readStream.mockClear();
        res.end.mockClear();
        const req = {
          params: { filename: 'archiveID', folder: 'archive' },
        };
        await downloadTaskFile(req, res);
      });

      it('should stream file to response', async () => {
        const expectedFilePath = 'archive/archiveID.json';
        expect(readStream).toHaveBeenCalledWith(expectedFilePath, res);
      });
    });

    describe('unsuccessfully', () => {
      // Error is thrown because the file doesn't exist.
      beforeAll(async () => {
        res.end.mockClear();
        const req = {
          params: { filename: 'missing', folder: 'archive' },
        };
        await downloadTaskFile(req, res);
      });

      it('should set status', () => {
        expect(res.status).toHaveBeenCalledWith(404);
      });
      it('should end response', () => {
        expect(res.end).toHaveBeenCalled();
      });
    });
  });

  describe('for task folder', () => {
    describe('successfully', () => {
      beforeAll(async () => {
        readStream.mockClear();
        res.end.mockClear();
        const req = {
          params: { filename: 'interactive-file', folder: 'taskID' },
        };
        await downloadTaskFile(req, res);
      });

      it('should stream file to response', async () => {
        const expectedFilePath = 'tmp/taskID/interactive/interactive-file.json';
        expect(readStream).toHaveBeenCalledWith(expectedFilePath, res);
      });
    });

    describe('unsuccessfully', () => {
      // Error is thrown because the file doesn't exist.
      beforeAll(async () => {
        res.end.mockClear();
        const req = {
          params: { filename: 'missing', folder: 'taskID' },
        };
        await downloadTaskFile(req, res);
      });

      it('should set status', () => {
        expect(res.status).toHaveBeenCalledWith(404);
      });
      it('should end response', () => {
        expect(res.end).toHaveBeenCalled();
      });
    });
  });
});
