import fs from 'fs';
import mockFS from 'mock-fs';

import createDirs from './create-dirs';

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

    it('should create first directory', () => {
      expect(fs.statSync('tmp/workDir/dir1')).toBeTruthy();
    });

    it('should create second directory', () => {
      expect(fs.statSync('tmp/workDir/dir2')).toBeTruthy();
    });
  });

  it('should reject when unsuccesful at creating directories', async () => {
    await expect(createDirs('tmp/missingDir', ['dir1', 'dir2'])).rejects.toThrow();
  });
});
