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
    },
  },
};

afterAll(() => {
  mockFS.restore();
});

describe('Utility cleanup', () => {
  describe('Any utility', () => {
    beforeAll(async () => {
      mockFS(mockedFileSystem);
      await cleanup('tmp/test', 'saint_fea');
    });

    it('should remove "files" directory', async () => {
      expect(fs.stat('tmp/test/files')).rejects.toBeTruthy();
    });

    it('should remove "helper-files" directory', async () => {
      expect(fs.stat('tmp/test/helper-files')).rejects.toBeTruthy();
    });
  });

  describe('Utility with versioning', () => {
    beforeAll(async () => {
      mockFS(mockedFileSystem);
      await cleanup('tmp/test', 'saint_domain_enrich');
    });

    it('should copy "versions.txt"', async () => {
      expect(fs.stat('tmp/test/versions.txt')).resolves.toBeTruthy();
    });

    it('should remove "files" directory', async () => {
      expect(fs.stat('tmp/test/files')).rejects.toBeTruthy();
    });

    it('should remove "helper-files" directory', async () => {
      expect(fs.stat('tmp/test/helper-files')).rejects.toBeTruthy();
    });
  });
});
