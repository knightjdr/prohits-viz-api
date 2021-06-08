import fs from 'fs/promises';
import mockFS from 'mock-fs';

import cleanup from './cleanup.js';

const mockedFileSystem = {
  files: {
    'versions.txt': '',
  },
  tmp: {
    test: {
      files: {},
      'helper-files': {},
      other: {},
    },
  },
};

afterAll(() => {
  mockFS.restore();
});

describe('Task cleanup', () => {
  describe('Any tool', () => {
    beforeAll(async () => {
      mockFS(mockedFileSystem);
      await cleanup('tmp/test', 'dotplot');
    });

    it('should remove "files" directory', async () => {
      expect(fs.stat('tmp/test/files')).rejects.toBeTruthy();
    });

    it('should remove "helper-files" directory', async () => {
      expect(fs.stat('tmp/test/helper-files')).rejects.toBeTruthy();
    });
  });

  describe('SCV tool', () => {
    beforeAll(async () => {
      mockFS(mockedFileSystem);
      await cleanup('tmp/test', 'scv');
    });

    it('should copy "versions.txt"', async () => {
      expect(fs.stat('tmp/test/other/versions.txt')).resolves.toBeTruthy();
    });

    it('should remove "files" directory', async () => {
      expect(fs.stat('tmp/test/files')).rejects.toBeTruthy();
    });

    it('should remove "helper-files" directory', async () => {
      expect(fs.stat('tmp/test/helper-files')).rejects.toBeTruthy();
    });
  });
});
