const mockFS = require('mock-fs');
const fs = require('fs');

const config = require('../../../../config');
const validate = require('./validate');
const workDir = require('../../helpers/work-dir');

jest.mock('../../helpers/work-dir');
jest.mock('./validate');

const viz = require('./viz');

console.log();
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
      viz(req, res)
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

  describe('with validation error', () => {
    beforeAll(async (done) => {
      res.end.mockClear();
      res.status.mockClear();
      validate.mockReturnValue({
        json: {
          parameters: { imageType: 'dotplot' },
        },
      });
      workDir.mockResolvedValue('tmp/test1');
      viz(req, res)
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
      workDir.mockRejectedValue();
      viz(req, res)
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
