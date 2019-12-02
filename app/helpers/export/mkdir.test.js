const fs = require('fs');
const mockFS = require('mock-fs');

const mkdir = require('./mkdir');

mockFS({
  tmp: { workDir: {} },
});

afterAll(() => {
  mockFS.restore();
});

describe('Create directories', () => {
  describe('when successful', () => {
    beforeAll(async (done) => {
      mkdir('tmp/workDir', ['dir1', 'dir2'])
        .then(() => {
          done();
        });
    });

    it('should create first directory', () => {
      expect(fs.statSync('tmp/workDir/dir1')).toBeTruthy();
    });

    it('should create second directory', () => {
      expect(fs.statSync('tmp/workDir/dir2')).toBeTruthy();
    });
  });

  it('should reject when no directories specified', () => {
    const err = new Error('No directories specified');
    return expect(mkdir('tmp/workdir', [])).rejects.toThrowError(err);
  });

  it('should reject when unsuccesful at creating directories', () => {
    const err = new Error('Could not make subdirectories');
    return expect(mkdir('tmp/missingDir', ['dir1', 'dir2'])).rejects.toThrowError(err);
  });
});
