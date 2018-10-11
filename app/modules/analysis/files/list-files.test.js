const mockFS = require('mock-fs');
const listFiles = require('./list-files');

// Must mock file system after requires are complete.
mockFS({
  tmp: {
    'file1.txt': '',
    'file2.txt': '',
    'file3.json': '',
  },
});

afterAll(() => {
  mockFS.restore();
});

describe('List all files in a directory', () => {
  it('should return all files', async (done) => {
    const expectedFiles = ['file1.txt', 'file2.txt', 'file3.json'];
    listFiles('tmp')
      .then((files) => {
        expect(files.sort()).toEqual(expectedFiles.sort());
        done();
      });
  });

  it('should return txt files', async (done) => {
    const expectedFiles = ['file1.txt', 'file2.txt'];
    listFiles('tmp', '.txt')
      .then((files) => {
        expect(files.sort()).toEqual(expectedFiles.sort());
        done();
      });
  });

  it('should return error', async (done) => {
    const expectedErr = new Error('Error listing missingDir folder');
    listFiles('missingDir')
      .catch((err) => {
        expect(err).toEqual(expectedErr);
        done();
      });
  });
});
