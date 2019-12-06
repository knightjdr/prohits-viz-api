import fs from 'fs';
import mockFS from 'mock-fs';

import writeDownloadFile from './write-download-file';

mockFS({
  tmp: { workDir: {} },
});

afterAll(() => {
  mockFS.restore();
});

describe('Write download instructions file', () => {
  describe('when successful', () => {
    beforeAll(async (done) => {
      writeDownloadFile('tmp/workDir', 'file', 'txt')
        .then(() => {
          done();
        });
    });

    it('should create file', () => {
      expect(fs.existsSync('tmp/workDir/download.txt')).toBeTruthy();
    });

    it('should write instructions to file', () => {
      expect(fs.readFileSync('tmp/workDir/download.txt', 'utf8')).toBe('txt/file.txt');
    });
  });
});
