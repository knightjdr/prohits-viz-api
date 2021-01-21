import mockFS from 'mock-fs';
import fs from 'fs';

import writeFile from './write-file.js';

// Must mock file system after requires are complete.
mockFS({});

afterAll(() => {
  mockFS.restore();
});

describe('Write file', () => {
  describe('successfully', () => {
    beforeAll(async (done) => {
      writeFile('file1.txt', 'file 1 content')
        .then(() => {
          done();
        });
    });

    it('should write contents to file', async (done) => {
      const expectedContent = 'file 1 content';
      fs.readFile('file1.txt', 'utf8', (err, data) => {
        expect(data).toBe(expectedContent);
        done();
      });
    });
  });

  describe('unsuccessfully write to directory that does not exist', () => {
    let error;

    beforeAll(async (done) => {
      writeFile('missing/file2.txt', 'file 2 content')
        .catch((err) => {
          error = err;
          done();
        });
    });

    it('should return an error when it can not write to a file', () => {
      const expectedError = new Error('Could not write to file: missing/file2.txt');
      expect(error).toEqual(expectedError);
    });

    it('should not create file', async (done) => {
      fs.readFile('missing/file2.txt', (err) => {
        expect(err).not.toBeNull();
        done();
      });
    });
  });
});
