import fs from 'fs/promises';
import mockFS from 'mock-fs';

import cleanup from './cleanup.js';
import getWorkDir from '../../../helpers/files/create-work-dir.js';
import runUtilityAnalysis from './utility.js';
import spawnTask from './spawn.js';
import validate from './validation/validate.js';

jest.mock('./cleanup.js');
cleanup.mockResolvedValue();
jest.mock('../../../helpers/files/create-work-dir');
jest.mock('./spawn');
jest.mock('./validation/validate.js');

const mockedFileSystem = {
  tmp: {
    uploads: {
      'temp.txt': '',
      'temp-error.txt': '',
    },
    taskID: {},
    taskError: {},
  },
};
mockFS(mockedFileSystem);

// Mock date
const DATE_TO_USE = new Date();
const origDate = Date;
global.Date = jest.fn(() => DATE_TO_USE);
global.Date.now = origDate.now;
global.Date.toISOString = origDate.toISOString;

const res = {
  end: jest.fn(),
  locals: {
    socket: {
      emit: jest.fn(),
    },
  },
  send: jest.fn(),
  status: jest.fn(),
};

afterAll(() => {
  global.Date = origDate;
  mockFS.restore();
});

describe('Run utility analysis', () => {
  describe('validation fails', () => {
    beforeAll(async () => {
      const req = {
        body: {},
        files: {
          file: [],
        },
        params: { tool: 'saint_stats' },
      };

      res.send.mockClear();
      res.status.mockClear();
      validate.mockClear();

      validate.mockReturnValue({ errors: { field: 'error message' } });

      await runUtilityAnalysis(req, res);
    });

    it('should set response status', () => {
      expect(res.status).toHaveBeenCalledWith(422);
    });

    it('should send response', () => {
      expect(res.send).toHaveBeenCalledWith({ errors: { field: 'error message' } });
    });
  });

  describe('successful run', () => {
    const req = {
      body: { fdr: '0.01', utility: 'saint_stats' },
      files: {
        file: [
          {
            originalname: 'file1.txt',
            path: 'tmp/uploads/temp.txt',
          },
        ],
      },
      params: { tool: 'saint_stats' },
    };

    beforeAll(async () => {
      cleanup.mockClear();
      res.locals.socket.emit.mockClear();
      res.send.mockClear();
      spawnTask.mockClear();
      validate.mockClear();

      getWorkDir.mockResolvedValue('tmp/taskID');
      validate.mockReturnValue({
        errors: {},
        fields: { fdr: '0.01', utility: 'saint_stats' },
      });

      await runUtilityAnalysis(req, res);
    });

    it('should validate form', () => {
      expect(validate).toHaveBeenCalledWith(req.body, req.files.file);
    });

    it('should send response', () => {
      expect(res.send).toHaveBeenCalledWith({ id: 'taskID', tool: 'saint_stats' });
    });

    it('should create subdirectory for files', async () => (
      expect(fs.stat('tmp/taskID/files/')).resolves.toBeTruthy()
    ));

    it('should create status file', async () => (
      expect(fs.stat('tmp/taskID/status.json')).resolves.toBeTruthy()
    ));

    it('should move upload file', async () => (
      expect(fs.stat('tmp/uploads/temp.txt')).rejects.toBeTruthy()
    ));

    it('should place upload file in files directory', async () => (
      expect(fs.stat('tmp/taskID/files/file1.txt')).resolves.toBeTruthy()
    ));

    it('should spawn task', () => {
      const command = 'docker run -v $(pwd):/files/ pvutilitiespython /app/saint_stats.py -f 0.01 -s files/file1.txt';
      expect(spawnTask).toHaveBeenCalledWith(command, 'tmp/taskID');
    });

    it('should update status file to indicate completion', async () => {
      const expected = {
        date: new Date().toISOString(),
        primaryFile: 'saint_stats',
        status: 'complete',
        tool: 'saint_stats',
      };
      const file = await fs.readFile('tmp/taskID/status.json', 'utf8');
      expect(JSON.parse(file)).toEqual(expected);
    });

    it('should delete file directory', () => {
      expect(cleanup).toHaveBeenCalledWith('tmp/taskID', 'saint_stats');
    });

    it('socket should emit action with status', () => {
      const expected = {
        id: 'taskID',
        status: {
          date: new Date().toISOString(),
          primaryFile: 'saint_stats',
          status: 'complete',
          tool: 'saint_stats',
        },
        type: 'UPDATE_TASK_STATUS',
      };
      expect(res.locals.socket.emit).toHaveBeenCalledWith('action', expected);
    });
  });

  describe('spawn task exits with error', () => {
    beforeAll(async () => {
      res.locals.socket.emit.mockClear();
      spawnTask.mockClear();

      res.end.mockClear();
      res.status.mockClear();

      const req = {
        body: { fdr: '0.01', utility: 'saint_stats' },
        files: {
          file: [
            {
              originalname: 'file1.txt',
              path: 'tmp/uploads/temp-error.txt',
            },
          ],
        },
        params: { tool: 'saint_stats' },
      };

      getWorkDir.mockResolvedValue('tmp/taskError');
      validate.mockReturnValue({
        errors: {},
        fields: { fdr: '0.01', utility: 'saint_stats' },
      });
      spawnTask.mockResolvedValue('Error: test error');

      await runUtilityAnalysis(req, res);
    });

    it('should update status file to indicate error', async () => {
      const expected = {
        date: new Date().toISOString(),
        primaryFile: 'saint_stats',
        status: 'error',
        tool: 'saint_stats',
      };
      const file = await fs.readFile('tmp/taskError/status.json', 'utf8');
      expect(JSON.parse(file)).toEqual(expected);
    });

    it('socket should emit action with status', () => {
      const expected = {
        id: 'taskError',
        status: {
          date: new Date().toISOString(),
          primaryFile: 'saint_stats',
          status: 'error',
          tool: 'saint_stats',
        },
        type: 'UPDATE_TASK_STATUS',
      };
      expect(res.locals.socket.emit).toHaveBeenCalledWith('action', expected);
    });
  });

  describe('throws error', () => {
    beforeAll(async () => {
      const req = {
        body: { fdr: '0.01', utility: 'saint_stats' },
        files: {
          file: [
            {
              originalname: 'file1.txt',
              path: 'tmp/uploads/temp.txt',
            },
          ],
        },
        params: { tool: 'saint_stats' },
      };

      res.end.mockClear();
      res.status.mockClear();

      getWorkDir.mockRejectedValue();
      validate.mockReturnValue({});

      await runUtilityAnalysis(req, res);
    });

    it('should set response status', () => {
      expect(res.status).toHaveBeenCalledWith(500);
    });

    it('should end response', () => {
      expect(res.end).toHaveBeenCalled();
    });
  });
});
