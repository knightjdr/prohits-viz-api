const mockFS = require('mock-fs');
const fs = require('fs');
const nanoid = require('nanoid');

jest.mock('../../../config', () => ({
  workDir: 'tmp/',
}));
jest.mock('nanoid');
nanoid.mockReturnValue('id');

const workDir = require('./work-dir');

afterAll(() => {
  mockFS.restore();
});


describe('Working directory generation', () => {
  describe('when succesfully generated', () => {
    let workingDir;

    beforeAll(async (done) => {
      mockFS({
        tmp: {},
      });
      workDir()
        .then((dir) => {
          workingDir = dir;
          done();
        });
    });

    it('should resolve with directory name', () => {
      expect(workingDir).toBe('tmp/id');
    });

    it('should make directory', () => {
      expect(fs.statSync('tmp/id')).toBeTruthy();
    });
  });

  describe('when unsuccesfully generated', () => {
    let error;

    beforeAll(async (done) => {
      mockFS({});
      workDir()
        .catch((err) => {
          error = err;
          done();
        });
    });

    it('should reject with error', () => {
      expect(error.toString()).toBe('Error: Could not make working directory');
    });
  });
});
