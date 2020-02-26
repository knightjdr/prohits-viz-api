import fs from 'fs';
import mockFS from 'mock-fs';

import runToolAnalysis from './tool.js';
import deleteDirs from '../../../helpers/files/delete-dir.js';
import getWorkDir from '../../../helpers/files/create-work-dir.js';
import spawnTask from './spawn.js';
import validate from '../../../helpers/validation/analysis/validate.js';

jest.mock('../../../helpers/files/delete-dir');
deleteDirs.mockResolvedValue();
jest.mock('../../../helpers/files/create-work-dir');
jest.mock('./spawn');
spawnTask.mockResolvedValue();
jest.mock('../../../helpers/validation/analysis/validate');

const mockedFileSystem = {
  tmp: {
    uploads: {
      'temp.txt': '',
    },
    taskID: {
      'log.txt': '',
      interactive: {
        'dotplot.json': '',
      },
    },
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

describe('Run analysis', () => {
  describe('validation fails', () => {
    beforeAll(async () => {
      const req = {
        body: {},
        files: [],
        params: { tool: 'dotplot' },
      };

      res.send.mockClear();
      res.status.mockClear();
      validate.mockClear();

      validate.mockReturnValue({ errors: { field: 'error message' } });

      await runToolAnalysis(req, res);
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
      body: { sampleFile: 'false' },
      files: [
        {
          originalname: 'file1.txt',
          path: 'tmp/uploads/temp.txt',
        },
      ],
      params: { tool: 'dotplot' },
    };

    beforeAll(async () => {
      deleteDirs.mockClear();
      res.locals.socket.emit.mockClear();
      res.send.mockClear();
      spawnTask.mockClear();
      validate.mockClear();

      getWorkDir.mockResolvedValue('tmp/taskID');
      validate.mockReturnValue({
        errors: {},
        values: { field: 'test' },
      });

      await runToolAnalysis(req, res);
    });

    it('should validate form', () => {
      expect(validate).toHaveBeenCalledWith('dotplot', req.body, req.files);
    });

    it('should send response', () => {
      expect(res.send).toHaveBeenCalledWith({ id: 'taskID' });
    });

    it('should create subdirectory for files', async (done) => {
      fs.stat('tmp/taskID/files/', (err) => {
        expect(err).toBeNull();
        done();
      });
    });

    it('should create status file', async (done) => {
      fs.stat('tmp/taskID/status.json', (err) => {
        expect(err).toBeNull();
        done();
      });
    });

    it('should move upload file', async (done) => {
      fs.stat('tmp/uploads/temp.txt', (err) => {
        expect(err).not.toBeNull();
        done();
      });
    });

    it('should place upload file in files directory', async (done) => {
      fs.stat('tmp/taskID/files/file1.txt', (err) => {
        expect(err).toBeNull();
        done();
      });
    });

    it('should spawn task', () => {
      expect(spawnTask).toHaveBeenCalledWith('tmp/taskID');
    });

    it('should call delete directories', () => {
      expect(deleteDirs).toHaveBeenCalledWith('tmp/taskID', ['files']);
    });

    it('should update status file to indicate completion', async (done) => {
      const expected = {
        analysis: 'dotplot',
        date: new Date().toISOString(),
        files: ['log', 'dotplot'],
        primaryFile: 'dotplot',
        status: 'complete',
      };
      fs.readFile('tmp/taskID/status.json', 'utf8', (err, file) => {
        expect(JSON.parse(file)).toEqual(expected);
        done();
      });
    });

    it('socket should emit action with status', () => {
      const expected = {
        analysis: 'dotplot',
        date: new Date().toISOString(),
        files: ['log', 'dotplot'],
        id: 'taskID',
        primaryFile: 'dotplot',
        status: 'complete',
        type: 'TASK_COMPLETE',
      };
      expect(res.locals.socket.emit).toHaveBeenCalledWith('action', expected);
    });
  });

  describe('throws error', () => {
    beforeAll(async () => {
      const req = {
        body: {},
        files: [],
        params: { tool: 'dotplot' },
      };

      res.end.mockClear();
      res.status.mockClear();

      getWorkDir.mockRejectedValue();
      validate.mockReturnValue({});

      await runToolAnalysis(req, res);
    });

    it('should set response status', () => {
      expect(res.status).toHaveBeenCalledWith(500);
    });

    it('should end response', () => {
      expect(res.end).toHaveBeenCalled();
    });
  });
});

