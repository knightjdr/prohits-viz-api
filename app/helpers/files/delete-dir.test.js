const mockFS = require('mock-fs');
const fs = require('fs');

const deleteDirs = require('./delete-dir');

// Must mock file system after requires are complete.
mockFS({
  tmp1: {
    dir1: {},
    dir2: {},
    dir3: {},
  },
  tmp2: {
    dir3: {},
  },
});

afterAll(() => {
  mockFS.restore();
});

describe('Delete group of directories', () => {
  describe('successfully', () => {
    beforeAll(async () => {
      const list = ['dir1', 'dir2'];
      await deleteDirs('tmp1', list);
    });

    it('should delete first directory', async (done) => {
      fs.stat('tmp1/dir1', (err) => {
        expect(err).not.toBeNull();
        done();
      });
    });

    it('should delete second directory', async (done) => {
      fs.stat('tmp1/dir2', (err) => {
        expect(err).not.toBeNull();
        done();
      });
    });

    it('should not delete third directory', async (done) => {
      fs.stat('tmp1/dir3', (err) => {
        expect(err).toBeNull();
        done();
      });
    });
  });
});
