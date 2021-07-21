import fs from 'fs/promises';
import mockFS from 'mock-fs';

import defineUserIndependentSettings from './define-user-independent-settings.js';

jest.mock('../../../config/config.js', () => ({
  dataDir: 'files/',
}));

const mockedFileSystem = {
  files: {
    'domains.json': '',
    'gene-db.json': '',
  },
  tmp: {
    test: {
      'helper-files': {},
    },
  },
};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('Define user-independent utility settings', () => {
  describe('saint_domain_enrich tool', () => {
    let settings;

    afterAll(async () => {
      await fs.rm('tmp/test/helper-files/domains.json');
      await fs.rm('tmp/test/helper-files/gene-db.json');
    });

    beforeAll(async () => {
      const tool = 'saint_domain_enrich';
      const workDir = 'tmp/test';
      settings = await defineUserIndependentSettings(tool, workDir);
    });

    it('should return object with path to files', () => {
      const expected = {
        domainFile: 'helper-files/domains.json',
        geneFile: 'helper-files/gene-db.json',
      };
      expect(settings).toEqual(expected);
    });

    it('should copy domain file', async () => (
      expect(fs.stat('tmp/test/helper-files/domains.json')).resolves.toBeTruthy()
    ));

    it('should copy gene DB file', async () => (
      expect(fs.stat('tmp/test/helper-files/gene-db.json')).resolves.toBeTruthy()
    ));
  });

  it('should return empty object for tools with no settings to add', () => {
    const tests = ['pvconvert', 'saint_fea', 'saint_stats'];
    const workDir = 'tmp/test';

    const expected = {};
    tests.forEach(async (test) => {
      expect(defineUserIndependentSettings(test, workDir)).resolves.toEqual(expected);
    });
  });
});
