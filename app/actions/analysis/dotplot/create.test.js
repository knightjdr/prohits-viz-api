const mockFS = require('mock-fs');
const fs = require('fs');

const deleteDirs = require('../../../helpers/files/delete-dir');
const getWorkDir = require('../../../helpers/files/create-work-dir');
const spawnTask = require('./spawn');
const validateDotplot = require('./validate');

jest.mock('../../../helpers/files/delete-dir');
deleteDirs.mockResolvedValue();
jest.mock('../../../helpers/files/create-work-dir');
jest.mock('./spawn');
spawnTask.mockResolvedValue();
jest.mock('./validate');
validateDotplot.mockReturnValue({
  anaylsisType: 'dotplot',
});

const createDotplot = require('./create');

// Mock date
const DATE_TO_USE = new Date();
const origDate = Date;
global.Date = jest.fn(() => DATE_TO_USE);
global.Date.now = origDate.now;
global.Date.toISOString = origDate.toISOString;

const mockedFileSystem = {
  tmp: {
    uploads: {
      'temp.txt': '',
    },
    workDir: {
      'log.txt': '',
      interactive: {
        'dotplot.json': '',
      },
    },
  },
};
mockFS(mockedFileSystem);

const req = {
  body: {
    sampleFile: 'false',
  },
  files: [
    {
      originalname: 'file1.txt',
      path: 'tmp/uploads/temp.txt',
    },
  ],
};
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

describe('Dotplot analysis', () => {
  describe('successfully resolves', () => {
    beforeAll(async (done) => {
      deleteDirs.mockClear();
      res.locals.socket.emit.mockClear();
      res.send.mockClear();
      validateDotplot.mockClear();
      getWorkDir.mockResolvedValue('tmp/workDir');
      createDotplot(req, res)
        .then(() => {
          done();
        });
    });

    it('should validate form', () => {
      expect(validateDotplot).toHaveBeenCalledWith(req.body, req.files);
    });

    it('should send response', () => {
      expect(res.send).toHaveBeenCalledWith({ id: 'workDir' });
    });

    it('should create status file', async (done) => {
      fs.stat('tmp/workDir/status.json', (err) => {
        expect(err).toBeNull();
        done();
      });
    });

    it('should move test upload file', async (done) => {
      fs.stat('tmp/uploads/temp.txt', (err) => {
        expect(err).not.toBeNull();
        done();
      });
    });

    it('should place upload file in files directory', async (done) => {
      fs.stat('tmp/workDir/files/file1.txt', (err) => {
        expect(err).toBeNull();
        done();
      });
    });

    it('should call delete directories', () => {
      expect(deleteDirs).toHaveBeenCalled();
    });

    it('socket should emit action', () => {
      expect(res.locals.socket.emit).toHaveBeenCalledWith('action', { type: 'SHOULD_UPDATE_TASKS' });
    });

    it('should set status file to complete', async (done) => {
      const expectedContents = {
        date: new Date().toISOString(),
        files: ['log', 'dotplot'],
        status: 'complete',
      };
      fs.readFile('tmp/workDir/status.json', 'utf8', (err, file) => {
        expect(JSON.parse(file)).toEqual(expectedContents);
        done();
      });
    });
  });

  describe('unsuccessfully resolves', () => {
    beforeAll(async (done) => {
      getWorkDir.mockRejectedValue();
      res.end.mockClear();
      res.status.mockClear();
      createDotplot(req, res)
        .then(() => {
          done();
        });
    });

    it('should set response status', () => {
      expect(res.status).toHaveBeenCalledWith(500);
    });

    it('should end response', () => {
      expect(res.end).toHaveBeenCalled();
    });
  });
});
