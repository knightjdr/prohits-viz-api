const fs = require('fs');
const mockFS = require('mock-fs');

const writeDownloadFile = require('./write-download-file');

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

  it('should reject when unsuccessful', () => {
    const err = new Error('Could not write download information to file');
    return expect(writeDownloadFile('tmp/missingDir', 'file', 'txt')).rejects.toThrowError(err);
  });
});
