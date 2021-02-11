import fs from 'fs/promises';
import mockFS from 'mock-fs';

import createDirs from './create-dirs.js';

mockFS({
  tmp: { workDir: {} },
});

afterAll(() => {
  mockFS.restore();
});

describe('Create directories', () => {
  describe('when successful', () => {
    beforeAll(async () => {
      await createDirs('tmp/workDir', ['dir1', 'dir2']);
    });

    it('should create first directory', async () => (
      expect(fs.stat('tmp/workDir/dir1')).resolves.toBeTruthy()
    ));

    it('should create second directory', async () => (
      expect(fs.stat('tmp/workDir/dir2')).resolves.toBeTruthy()
    ));
  });

  it('should reject when unsuccesful at creating directories', async () => {
    await expect(createDirs('tmp/missingDir', ['dir1', 'dir2'])).rejects.toThrow();
  });
});
