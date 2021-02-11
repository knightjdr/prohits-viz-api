import fs from 'fs/promises';
import mockFS from 'mock-fs';

import moveFiles from './move-files.js';

jest.mock('../../config/config', () => ({
  samplefile: 'sample-files/analysis-file.txt',
}));

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
      await moveFiles(files, 'tmp/workDir/files', 'true');
    });

    it('should copy sample file to working directory', async () => (
      expect(fs.stat('tmp/workDir/files/samplefile.txt')).resolves.toBeTruthy()
    ));

    it('should not move sample file from original directory', async () => (
      expect(fs.stat('sample-files/analysis-file.txt')).resolves.toBeTruthy()
    ));

    it('should have sample file with correct content', async () => {
      const expectedContent = 'sample file';
      const data = await fs.readFile('tmp/workDir/files/samplefile.txt', 'utf8');
      expect(data).toBe(expectedContent);
    });
  });

  describe('when sample file is not requested but file name matches sample file', () => {
    beforeAll(async () => {
      const files = [
        { originalname: 'samplefile.txt', path: 'tmp/uploads/sample-file.txt' },
      ];
      await moveFiles(files, 'tmp/workDir/files');
    });

    it('should put user file in working directory', async () => (
      expect(fs.stat('tmp/workDir/files/samplefile.txt')).resolves.toBeTruthy()
    ));

    it('should move user file 1 from uploads directory', async () => (
      expect(fs.stat('tmp/uploads/sample-file.txt')).rejects.toBeTruthy()
    ));

    it('should have sample file with sample content', async () => {
      const expectedContent = 'user file';
      const data = await fs.readFile('tmp/workDir/files/samplefile.txt', 'utf8');
      expect(data).toBe(expectedContent);
    });
  });

  describe('when user files are uploaded', () => {
    describe('successfully', () => {
      beforeAll(async () => {
        const files = [
          { originalname: 'userfile1.txt', path: 'tmp/uploads/uploaded-file1.txt' },
          { originalname: 'userfile2.txt', path: 'tmp/uploads/uploaded-file2.txt' },
        ];
        await moveFiles(files, 'tmp/workDir/files');
      });

      it('should put user file 1 in working directory', async () => (
        expect(fs.stat('tmp/workDir/files/userfile1.txt')).resolves.toBeTruthy()
      ));

      it('should move user file 1 from uploads directory', async () => (
        expect(fs.stat('tmp/uploads/uploaded-file1.txt')).rejects.toBeTruthy()
      ));

      it('should put user file 2 in working directory', async () => (
        expect(fs.stat('tmp/workDir/files/userfile2.txt')).resolves.toBeTruthy()
      ));

      it('should move user file 2 from uploads directory', async () => (
        expect(fs.stat('tmp/uploads/uploaded-file2.txt')).rejects.toBeTruthy()
      ));
    });

    it('should reject when user file not found', async () => {
      const expectedError = new Error('Error moving file userfile3.txt to task directory');
      const files = [
        { originalname: 'userfile3.txt', path: 'tmp/uploads/uploaded-file3.txt' },
      ];
      await expect(moveFiles(files, 'tmp/workDir/files')).rejects.toThrowError(expectedError);
    });
  });
});
