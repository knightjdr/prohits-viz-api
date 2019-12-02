const fs = require('fs');
const mockFS = require('mock-fs');

const writeDataFile = require('./write-data-file');

mockFS({
  tmp: { workDir: {} },
});

afterAll(() => {
  mockFS.restore();
});

describe('Write data to file', () => {
  describe('when successful', () => {
    beforeAll(async (done) => {
      writeDataFile('tmp/workDir', { data: 'test' })
        .then(() => {
          done();
        });
    });

    it('should create file', () => {
      expect(fs.existsSync('tmp/workDir/data.json')).toBeTruthy();
    });

    it('should write instructions to file', () => {
      expect(fs.readFileSync('tmp/workDir/data.json', 'utf8')).toBe('{"data":"test"}');
    });
  });

  it('should reject when unsuccessful', () => {
    const err = new Error('Could not write data to file');
    return expect(writeDataFile('tmp/missingDir', {})).rejects.toThrowError(err);
  });
});
