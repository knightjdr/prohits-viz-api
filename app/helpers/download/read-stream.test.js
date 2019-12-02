const extToMimeType = require('./ext-to-mime-type');
const mockFS = require('mock-fs');
const rimraf = require('rimraf');
const stream = require('stream');

jest.mock('./ext-to-mime-type');
extToMimeType.mockReturnValue('svg');
jest.mock('rimraf');

const readStream = require('./read-stream');

// Must mock file system after requires are complete.
mockFS({
  tmp: {
    'file.svg': 'file content',
  },
});


const res = new stream.Writable();
res._write = (chunk, encoding, done) => {
  done();
};
res.end = jest.fn();
res.setHeader = jest.fn();
res.status = jest.fn();

afterAll(() => {
  mockFS.restore();
});

describe('Streaming a file to response', () => {
  describe('when successful', () => {
    describe('and not deleting working directory', () => {
      beforeAll(async (done) => {
        res.end.mockClear();
        res.setHeader.mockClear();
        readStream('tmp', 'file.svg', res)
          .then(() => {
            done();
          });
      });

      it('should set content-type to mime type', () => {
        expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'svg');
      });

      it('should end response', () => {
        expect(res.end).toHaveBeenCalled();
      });

      it('should not delete working directory', () => {
        expect(rimraf).not.toHaveBeenCalled();
      });
    });

    describe('and deleting working directory', () => {
      beforeAll(async (done) => {
        res.end.mockClear();
        res.setHeader.mockClear();
        readStream('tmp', 'file.svg', res, true)
          .then(() => {
            done();
          });
      });

      it('should delete working directory', () => {
        expect(rimraf).toHaveBeenCalledWith('tmp', expect.anything());
      });
    });
  });

  describe('when unsuccessful', () => {
    let error;

    beforeAll(async (done) => {
      res.end.mockClear();
      res.setHeader.mockClear();
      readStream('tmp', 'missing.svg', res)
        .catch((err) => {
          error = err;
          done();
        });
    });

    it('should set content-type to mime type', () => {
      expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'svg');
    });

    it('should not end response', () => {
      expect(res.end).not.toHaveBeenCalled();
    });

    it('should return error', () => {
      expect(error.toString()).toBe('Error: Could not read: missing.svg');
    });
  });
});
