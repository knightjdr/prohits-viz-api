import fs from 'fs/promises';
import mockFS from 'mock-fs';

import writeDataFile from './write-data-file.js';

mockFS({
  tmp: { workDir: {} },
});

afterAll(() => {
  mockFS.restore();
});

describe('Write data to file', () => {
  describe('when successful', () => {
    beforeAll(async () => {
      await writeDataFile('tmp/workDir', { data: 'test' });
    });

    it('should create file', async () => (
      expect(fs.stat('tmp/workDir/data.json')).resolves.toBeTruthy()
    ));

    it('should write instructions to file', async () => {
      const expected = '{"data":"test"}';
      return expect(fs.readFile('tmp/workDir/data.json', 'utf8')).resolves.toBe(expected);
    });
  });
});
