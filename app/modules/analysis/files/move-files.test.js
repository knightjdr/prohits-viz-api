const mockFS = require('mock-fs');
const fs = require('fs');

jest.mock('../../../../config', () => ({
  samplefile: 'sample-files/analysis-file.txt',
}));

const moveFiles = require('./move-files');

// Must mock file system after requires are complete.
mockFS({
  'sample-files': {
    'analysis-file.txt': 'sample file',
  },
  tmp: {
    uploads: {
      'sample-file.txt': 'user file',
      'uploaded-file1.txt': 'upload file1',
      'uploaded-file2.txt': 'upload file2',
    },
    workDir: {
      files: {},
    },
  },
});

afterAll(() => {
  mockFS.restore();
});

describe('Move files for analysis', () => {
  describe('when sample file is requested', () => {
    beforeAll(async (done) => {
      const files = [
        { originalname: 'samplefile.txt', path: '' },
      ];
      moveFiles(files, 'tmp/workDir', true)
        .then(() => {
          done();
        });
    });

    it('should copy sample file to working directory', async (done) => {
      fs.stat('tmp/workDir/files/samplefile.txt', (err) => {
        expect(err).toBeNull();
        done();
      });
    });

    it('should not move sample file from original directory', async (done) => {
      fs.stat('sample-files/analysis-file.txt', (err) => {
        expect(err).toBeNull();
        done();
      });
    });

    it('should have sample file with correct content', async (done) => {
      const expectedContent = 'sample file';
      fs.readFile('tmp/workDir/files/samplefile.txt', 'utf8', (err, data) => {
        expect(data).toBe(expectedContent);
        done();
      });
    });
  });

  describe('when sample file is not requested but file name matches sample file', () => {
    beforeAll(async (done) => {
      const files = [
        { originalname: 'samplefile.txt', path: 'tmp/uploads/sample-file.txt' },
      ];
      moveFiles(files, 'tmp/workDir')
        .then(() => {
          done();
        });
    });

    it('should put user file in working directory', async (done) => {
      fs.stat('tmp/workDir/files/samplefile.txt', (err) => {
        expect(err).toBeNull();
        done();
      });
    });

    it('should move user file 1 from uploads directory', async (done) => {
      fs.stat('tmp/uploads/sample-file.txt', (err) => {
        expect(err).not.toBeNull();
        done();
      });
    });

    it('should have sample file with sample content', async (done) => {
      const expectedContent = 'user file';
      fs.readFile('tmp/workDir/files/samplefile.txt', 'utf8', (err, data) => {
        expect(data).toBe(expectedContent);
        done();
      });
    });
  });

  describe('when user files are uploaded', () => {
    describe('successfully', () => {
      beforeAll(async (done) => {
        const files = [
          { originalname: 'userfile1.txt', path: 'tmp/uploads/uploaded-file1.txt' },
          { originalname: 'userfile2.txt', path: 'tmp/uploads/uploaded-file2.txt' },
        ];
        moveFiles(files, 'tmp/workDir')
          .then(() => {
            done();
          });
      });

      it('should put user file 1 in working directory', async (done) => {
        fs.stat('tmp/workDir/files/userfile1.txt', (err) => {
          expect(err).toBeNull();
          done();
        });
      });

      it('should move user file 1 from uploads directory', async (done) => {
        fs.stat('tmp/uploads/uploaded-file1.txt', (err) => {
          expect(err).not.toBeNull();
          done();
        });
      });

      it('should put user file 2 in working directory', async (done) => {
        fs.stat('tmp/workDir/files/userfile2.txt', (err) => {
          expect(err).toBeNull();
          done();
        });
      });

      it('should move user file 2 from uploads directory', async (done) => {
        fs.stat('tmp/uploads/uploaded-file2.txt', (err) => {
          expect(err).not.toBeNull();
          done();
        });
      });
    });

    it('should reject when user file not found', async (done) => {
      const expectedError = new Error('Error moving file userfile3.txt to task directory');
      const files = [
        { originalname: 'userfile3.txt', path: 'tmp/uploads/uploaded-file3.txt' },
      ];
      moveFiles(files, 'tmp/workDir')
        .catch((err) => {
          expect(err).toEqual(expectedError);
          done();
        });
    });
  });
});
