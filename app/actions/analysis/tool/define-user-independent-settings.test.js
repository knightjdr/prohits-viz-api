import fs from 'fs/promises';
import mockFS from 'mock-fs';

import defineUserIndependentSettings from './define-user-independent-settings.js';

jest.mock('../../../config/config.js', () => ({
  dataDir: 'files/',
}));

const mockedFileSystem = {
  files: {
    'gene-db.json': '',
    'interactions.json': '',
    'protein-expression.json': '',
    'rna-expression.json': '',
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

describe('Define user-independent analysis settings', () => {
  describe('scv tool', () => {
    describe('no files required', () => {
      let settings;

      afterAll(async () => {
        await fs.unlink('tmp/test/helper-files/gene-db.json');
      });

      beforeAll(async () => {
        const formSettings = {
          known: '',
          proteinTissues: [],
          rnaTissues: [],
          type: 'scv',
        };
        const workDir = 'tmp/test';
        settings = await defineUserIndependentSettings(formSettings, workDir);
      });

      it('should return object with path to files', () => {
        const expected = {
          conditionMapFile: '',
          geneFile: 'helper-files/gene-db.json',
          knownFile: '',
          proteinExpressionFile: '',
          readoutMapFile: '',
          rnaExpressionFile: '',
        };
        expect(settings).toEqual(expected);
      });
    });

    describe('files required', () => {
      let settings;

      afterAll(async () => {
        await fs.unlink('tmp/test/helper-files/gene-db.json');
        await fs.unlink('tmp/test/helper-files/interactions.json');
        await fs.unlink('tmp/test/helper-files/protein-expression.json');
        await fs.unlink('tmp/test/helper-files/rna-expression.json');
      });

      beforeAll(async () => {
        const formSettings = {
          conditionMapFile: [{}],
          known: 'interaction',
          proteinTissues: ['HEK-293'],
          readoutMapFile: [{}],
          rnaTissues: ['HEK 293'],
          type: 'scv',
        };
        const workDir = 'tmp/test';
        settings = await defineUserIndependentSettings(formSettings, workDir);
      });

      it('should return object with path to files', () => {
        const expected = {
          conditionMapFile: 'helper-files/condition-map.txt',
          geneFile: 'helper-files/gene-db.json',
          knownFile: 'helper-files/interactions.json',
          proteinExpressionFile: 'helper-files/protein-expression.json',
          readoutMapFile: 'helper-files/readout-map.txt',
          rnaExpressionFile: 'helper-files/rna-expression.json',
        };
        expect(settings).toEqual(expected);
      });

      it('should create symlink to gene file', async () => (
        expect(fs.lstat('tmp/test/helper-files/gene-db.json')).resolves.toBeTruthy()
      ));

      it('should create symlink to interaction file', async () => (
        expect(fs.lstat('tmp/test/helper-files/interactions.json')).resolves.toBeTruthy()
      ));

      it('should create symlink to protein expression file', async () => (
        expect(fs.lstat('tmp/test/helper-files/protein-expression.json')).resolves.toBeTruthy()
      ));

      it('should create symlink to rna expression file', async () => (
        expect(fs.lstat('tmp/test/helper-files/rna-expression.json')).resolves.toBeTruthy()
      ));
    });

    describe('custom knownness file', () => {
      let settings;

      afterAll(async () => {
        await fs.unlink('tmp/test/helper-files/gene-db.json');
      });

      beforeAll(async () => {
        const formSettings = {
          conditionMapFile: [],
          known: 'custom',
          knownFile: [{}],
          proteinTissues: [],
          readoutMapFile: [],
          rnaTissues: [],
          type: 'scv',
        };
        const workDir = 'tmp/test';
        settings = await defineUserIndependentSettings(formSettings, workDir);
      });

      it('should return object with path to files', () => {
        const expected = {
          conditionMapFile: '',
          geneFile: 'helper-files/gene-db.json',
          knownFile: 'helper-files/knownness.txt',
          proteinExpressionFile: '',
          readoutMapFile: '',
          rnaExpressionFile: '',
        };
        expect(settings).toEqual(expected);
      });
    });
  });

  it('should return empty object for tools with no settings to add', () => {
    const tests = ['condition-condition', 'correlation', 'dotplot', 'specificity'];
    const workDir = 'tmp/test';

    const expected = {};
    tests.forEach(async (test) => {
      expect(defineUserIndependentSettings({ type: test }, workDir)).resolves.toEqual(expected);
    });
  });
});
