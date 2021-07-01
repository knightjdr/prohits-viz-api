import fs from 'fs/promises';
import mockFS from 'mock-fs';
import { nanoid } from 'nanoid';

import createWorkDir from './create-work-dir.js';

jest.mock('../../config/config', () => ({
  workDir: 'tmp/',
}));
jest.mock('nanoid');
nanoid.mockReturnValue('id');

afterAll(() => {
  mockFS.restore();
});

describe('Working directory generation', () => {
  describe('when successfully generated', () => {
    let workingDir;

    beforeAll(async () => {
      mockFS({
        tmp: {},
      });
      workingDir = await createWorkDir();
    });

    it('should resolve with directory name', () => {
      expect(workingDir).toBe('tmp/id');
    });

    it('should make directory', async () => (
      expect(fs.stat('tmp/id')).resolves.toBeTruthy()
    ));
  });

  describe('when unsuccessfully generated', () => {
    let error;

    beforeAll(async () => {
      mockFS({});
      try {
        await createWorkDir();
      } catch (err) {
        error = err;
      }
    });

    it('should reject with error', () => {
      expect(error.toString()).toBe('Error: Could not make working directory');
    });
  });
});
