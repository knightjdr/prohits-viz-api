import fs from 'fs/promises';
import mockFS from 'mock-fs';

import deleteDirs from './delete-dir.js';

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

    it('should delete first directory', async () => (
      expect(fs.stat('tmp1/dir1')).rejects.toBeTruthy()
    ));

    it('should delete second directory', async () => (
      expect(fs.stat('tmp1/dir2')).rejects.toBeTruthy()
    ));

    it('should not delete third directory', async () => (
      expect(fs.stat('tmp1/dir3')).resolves.toBeTruthy()
    ));
  });
});
