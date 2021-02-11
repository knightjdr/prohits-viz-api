import fs from 'fs/promises';
import mockFS from 'mock-fs';

import writeStatus from './write-status.js';

mockFS({
  workDir: {
    'status.json': '{"primaryFile": "dotplot", "status": "running"}',
  },
});

afterAll(() => {
  mockFS.restore();
});

describe('Write to status file', () => {
  describe('status file exists', () => {
    describe('without primaryFile arg', () => {
      const files = ['dotplot', 'log'];
      const status = 'complete';
      let statusDetails;

      beforeAll(async () => {
        statusDetails = await writeStatus('workDir', status, files);
      });

      it('should write file', async () => {
        const expected = JSON.stringify({
          primaryFile: 'dotplot',
          status,
          files,
        }, null, 2);
        return expect(fs.readFile('workDir/status.json', 'utf8')).resolves.toEqual(expected);
      });

      it('should return status object', () => {
        const expected = {
          primaryFile: 'dotplot',
          status,
          files,
        };
        expect(statusDetails).toEqual(expected);
      });
    });

    describe('with primaryFile arg', () => {
      const files = ['error', 'log'];
      const status = 'complete';

      beforeAll(async () => {
        await writeStatus('workDir', status, files, 'error');
      });

      it('should write file', async () => {
        const expected = JSON.stringify({
          primaryFile: 'error',
          status,
          files,
        }, null, 2);
        return expect(fs.readFile('workDir/status.json', 'utf8')).resolves.toEqual(expected);
      });
    });

    describe('error file exists', () => {
      const files = ['error', 'log'];
      const status = 'complete';

      beforeAll(async () => {
        await writeStatus('workDir', status, files);
      });

      it('should write file', async () => {
        const expected = JSON.stringify({
          primaryFile: 'error',
          status,
          files,
        }, null, 2);
        return expect(fs.readFile('workDir/status.json', 'utf8')).resolves.toEqual(expected);
      });
    });
  });

  it('should throw error when reading status file throws error', async () => {
    const expectedError = new Error('Could not update status file');
    await expect(writeStatus('missingDir', 'complete', [])).rejects.toThrowError(expectedError);
  });
});
