const mockFS = require('mock-fs');
const fs = require('fs');

jest.mock('../../config/config', () => ({
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
    beforeAll(async () => {
      const files = [
        { originalname: 'samplefile.txt', path: '' },
      ];
      await moveFiles(files, 'tmp/workDir', 'true');
    });

    it('should copy sample file to working directory', () => {
      expect(fs.existsSync('tmp/workDir/files/samplefile.txt')).toBeTruthy();
    });

    it('should not move sample file from original directory', () => {
      expect(fs.existsSync('sample-files/analysis-file.txt')).toBeTruthy();
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
    beforeAll(async () => {
      const files = [
        { originalname: 'samplefile.txt', path: 'tmp/uploads/sample-file.txt' },
      ];
      await moveFiles(files, 'tmp/workDir');
    });

    it('should put user file in working directory', async () => {
      expect(fs.existsSync('tmp/workDir/files/samplefile.txt')).toBeTruthy();
    });

    it('should move user file 1 from uploads directory', async () => {
      expect(fs.existsSync('tmp/uploads/sample-file.txt')).toBeFalsy();
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
      beforeAll(async () => {
        const files = [
          { originalname: 'userfile1.txt', path: 'tmp/uploads/uploaded-file1.txt' },
          { originalname: 'userfile2.txt', path: 'tmp/uploads/uploaded-file2.txt' },
        ];
        await moveFiles(files, 'tmp/workDir');
      });

      it('should put user file 1 in working directory', async () => {
        expect(fs.existsSync('tmp/workDir/files/userfile1.txt')).toBeTruthy();
      });

      it('should move user file 1 from uploads directory', async () => {
        expect(fs.existsSync('tmp/uploads/uploaded-file1.txt')).toBeFalsy();
      });

      it('should put user file 2 in working directory', async () => {
        expect(fs.existsSync('tmp/workDir/files/userfile2.txt')).toBeTruthy();
      });

      it('should move user file 2 from uploads directory', async () => {
        expect(fs.existsSync('tmp/uploads/uploaded-file2.txt')).toBeFalsy();
      });
    });

    it('should reject when user file not found', async () => {
      const expectedError = new Error('Error moving file userfile3.txt to task directory');
      const files = [
        { originalname: 'userfile3.txt', path: 'tmp/uploads/uploaded-file3.txt' },
      ];
      await expect(moveFiles(files, 'tmp/workDir')).rejects.toThrowError(expectedError);
    });
  });
});
