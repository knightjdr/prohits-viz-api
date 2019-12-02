const mockFS = require('mock-fs');
const fs = require('fs');

const validate = require('./validate');
const createWorkDir = require('../../../helpers/files/create-work-dir');

jest.mock('../../../helpers/files/create-work-dir');
jest.mock('./validate');

const handleVizFile = require('./handle-viz-file');

const mockedFileSystem = {
  tmp: {
    test1: {},
  },
};
mockFS(mockedFileSystem);

const req = {
  body: {},
};
const res = {
  end: jest.fn(),
  send: jest.fn(),
  status: jest.fn(),
};

afterAll(() => {
  mockFS.restore();
});

describe('Third party viz', () => {
  describe('with validation error', () => {
    beforeAll(async (done) => {
      res.end.mockClear();
      res.status.mockClear();
      validate.mockReturnValue({
        err: 'Invalid file format',
      });
      handleVizFile(req, res)
        .then(() => {
          done();
        });
    });

    it('should set response status', () => {
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should send response', () => {
      expect(res.send).toHaveBeenCalledWith({ message: 'Invalid file format' });
    });
  });

  describe('with validate data', () => {
    beforeAll(async (done) => {
      res.end.mockClear();
      res.status.mockClear();
      validate.mockReturnValue({
        json: {
          parameters: { imageType: 'dotplot' },
        },
      });
      createWorkDir.mockResolvedValue('tmp/test1');
      handleVizFile(req, res)
        .then(() => {
          done();
        });
    });

    it('should create interactive subfolder', async (done) => {
      fs.stat('tmp/test1/interactive', (err) => {
        expect(err).toBeNull();
        done();
      });
    });

    it('should write request body to file', async (done) => {
      const expectedContents = {
        parameters: { imageType: 'dotplot' },
      };
      fs.readFile('tmp/test1/interactive/dotplot.json', 'utf8', (err, data) => {
        expect(data).toBe(JSON.stringify(expectedContents, null, 2));
        done();
      });
    });

    it('should send response with url', () => {
      expect(res.send).toHaveBeenCalledWith({ url: 'http://localhost:3000/visualization/test1/dotplot' });
    });
  });

  describe('unsuccessful submission', () => {
    beforeAll(async (done) => {
      res.end.mockClear();
      res.status.mockClear();
      validate.mockReturnValue({});
      createWorkDir.mockRejectedValue();
      handleVizFile(req, res)
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
