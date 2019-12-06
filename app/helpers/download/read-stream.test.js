import mockFS from 'mock-fs';
import rimraf from 'rimraf';
import stream from 'stream';

import extToMimeType from './ext-to-mime-type';
import readStream from './read-stream';

jest.mock('./ext-to-mime-type');
extToMimeType.mockReturnValue('svg');
jest.mock('rimraf');

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
      beforeAll(async () => {
        res.end.mockClear();
        res.setHeader.mockClear();
        await readStream('tmp', 'file.svg', res);
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
      beforeAll(async () => {
        res.end.mockClear();
        res.setHeader.mockClear();
        await readStream('tmp', 'file.svg', res, true);
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
