import fs from 'fs/promises';
import mockFS from 'mock-fs';

import createStatus from './create-status.js';

// Mock date
const DATE_TO_USE = new Date();
const origDate = Date;
global.Date = jest.fn(() => DATE_TO_USE);
global.Date.toISOString = origDate.toISOString;
global.Date.now = origDate.now;

mockFS({
  workDir: {},
});

afterAll(() => {
  mockFS.restore();
});

afterEach(() => {
  global.Date = origDate;
});

describe('Create status file', () => {
  describe('successfully', () => {
    it('should write status file', async () => {
      const expected = JSON.stringify({
        date: new Date().toISOString(),
        primaryFile: 'dotplot',
        status: 'running',
        tool: 'dotplot',
      }, null, 2);

      await createStatus('workDir', 'dotplot');
      return expect(fs.readFile('workDir/status.json', 'utf8')).resolves.toEqual(expected);
    });
  });

  describe('successfully with primaryFile different from analysisType', () => {
    it('should write status file', async () => {
      const expected = JSON.stringify({
        date: new Date().toISOString(),
        primaryFile: 'otherFile',
        status: 'running',
        tool: 'dotplot',
      }, null, 2);

      await createStatus('workDir', 'dotplot', 'otherFile');
      return expect(fs.readFile('workDir/status.json', 'utf8')).resolves.toEqual(expected);
    });
  });

  it('should throw error, for example when directory does not exit', async () => {
    const expectedError = new Error('Could not create status file for task missingDir');
    return expect(createStatus('missingDir', 'dotplot')).rejects.toThrowError(expectedError);
  });
});
