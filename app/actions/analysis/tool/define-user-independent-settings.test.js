import fs from 'fs/promises';
import mockFS from 'mock-fs';

import defineUserIndependentSettings from './define-user-independent-settings.js';

jest.mock('../../../config/config.js', () => ({
  dataDir: 'files',
}));

const mockedFileSystem = {
  files: {
    'gene-db.json': '',
  },
  tmp: {
    test: {
      'helper-files': {},
    },
  },
};
mockFS(mockedFileSystem);

describe('Define user-independent analysis settings', () => {
  describe('scv tool', () => {
    let settings;

    beforeAll(async () => {
      const workDir = 'tmp/test';
      settings = await defineUserIndependentSettings('scv', workDir);
    });

    it('should return object with path to gene DB', () => {
      const expected = { geneDB: 'tmp/test/helper-files/gene-db.json' };
      expect(settings).toEqual(expected);
    });

    it('should create symlink file', async () => (
      expect(fs.lstat('tmp/test/helper-files/gene-db.json')).resolves.toBeTruthy()
    ));
  });

  it('should return empty object for tools with no settings to add', () => {
    const tests = ['condition-condition', 'correlation', 'dotplot', 'specificity'];
    const workDir = 'tmp/test';

    const expected = {};
    tests.forEach(async (test) => {
      expect(defineUserIndependentSettings(test, workDir)).resolves.toEqual(expected);
    });
  });
});
