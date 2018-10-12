const mockFS = require('mock-fs');

const readFile = require('./read-file');

// Must mock file system after requires are complete.
mockFS({
  'file1.txt': 'file txt',
});

afterAll(() => {
  mockFS.restore();
});

describe('Read file', () => {
  it('should read a file', async (done) => {
    const expectedContent = 'file txt';
    readFile('file1.txt')
      .then((data) => {
        expect(data).toBe(expectedContent);
        done();
      });
  });

  it('should return an error when file can not be read', async (done) => {
    const expectedError = new Error('Could not read file: missingFile.txt');
    readFile('missingFile.txt')
      .catch((err) => {
        expect(err).toEqual(expectedError);
        done();
      });
  });
});
