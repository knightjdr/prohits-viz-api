const mockFS = require('mock-fs');
const fs = require('fs');

const createDirs = require('./create-dir');

// Must mock file system after requires are complete.
mockFS({
  tmp: {},
});

afterAll(() => {
  mockFS.restore();
});

describe('Create group of directories', () => {
  describe('successfully', () => {
    beforeAll(async (done) => {
      const list = ['dir1', 'dir2'];
      createDirs(list, 'tmp')
        .then(() => {
          done();
        });
    });

    it('should create first directory', async (done) => {
      fs.stat('tmp/dir1', (err) => {
        expect(err).toBeNull();
        done();
      });
    });

    it('should create second directory', async (done) => {
      fs.stat('tmp/dir2', (err) => {
        expect(err).toBeNull();
        done();
      });
    });
  });

  describe('unsuccessfully', () => {
    it('should reject when root folder does not exist', async (done) => {
      const expectedError = new Error('Error creating task directories');
      const list = ['dir3', 'missingFolder/dir4'];
      createDirs(list, 'tmp')
        .catch((err) => {
          expect(err).toEqual(expectedError);
          done();
        });
    });
  });
});
