import mockFS from 'mock-fs';
import stream from 'stream';

import extToMimeType from './ext-to-mime-type.js';
import readStream, { removeFileOnCompletion } from './read-stream.js';
import removeFile from '../files/remove-file.js';

jest.mock('../../config/config.js', () => ({ workDir: 'tmp/' }));
jest.mock('./ext-to-mime-type');
extToMimeType.mockReturnValue('svg');
jest.mock('../files/remove-file.js');

mockFS({
  tmp: {
    aaaaaa: {
      'file.svg': 'file content',
    },
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

describe('Remove file', () => {
  it('should remove file', async () => {
    removeFile.mockClear();
    const file = 'tmp/aaaaaaa/svg/file.svg';
    const shouldRemoveFile = true;
    await removeFileOnCompletion(file, shouldRemoveFile);
    expect(removeFile).toHaveBeenCalledWith('tmp/aaaaaaa');
  });

  it('should not remove file', async () => {
    removeFile.mockClear();
    const file = 'tmp/aaaaaaa/svg/file.svg';
    const shouldRemoveFile = false;
    await removeFileOnCompletion(file, shouldRemoveFile);
    expect(removeFile).not.toHaveBeenCalled();
  });
});

describe('Streaming a file to response', () => {
  describe('when successful', () => {
    describe('and not deleting working directory', () => {
      beforeAll(async () => {
        removeFile.mockClear();
        res.end.mockClear();
        res.setHeader.mockClear();
        await readStream('tmp/aaaaaa/file.svg', res);
      });

      it('should set content-type to mime type', () => {
        expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'svg');
      });

      it('should end response', () => {
        expect(res.end).toHaveBeenCalled();
      });

      it('should not delete working directory', () => {
        expect(removeFile).not.toHaveBeenCalled();
      });
    });

    describe('and deleting working directory', () => {
      beforeAll(async () => {
        removeFile.mockClear();
        res.end.mockClear();
        res.setHeader.mockClear();
        await readStream('tmp/aaaaaa/file.svg', res, true);
      });

      it('should delete working directory', () => {
        expect(removeFile).toHaveBeenCalledWith('tmp/aaaaaa');
      });
    });
  });

  describe('when unsuccessful', () => {
    let error;

    beforeAll(async () => {
      res.end.mockClear();
      res.setHeader.mockClear();
      try {
        await readStream('tmp/aaaaaa/missing.svg', res);
      } catch (err) {
        error = err;
      }
    });

    it('should set content-type to mime type', () => {
      expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'svg');
    });

    it('should not end response', () => {
      expect(res.end).not.toHaveBeenCalled();
    });

    it('should return error', () => {
      expect(error.toString()).toBe('Error: Could not read: tmp/aaaaaa/missing.svg');
    });
  });
});
