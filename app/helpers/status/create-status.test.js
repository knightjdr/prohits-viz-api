import createStatus from './create-status.js';
import writefile from '../files/write-file.js';

jest.mock('../files/write-file');

// Mock date
const DATE_TO_USE = new Date();
const origDate = Date;
global.Date = jest.fn(() => DATE_TO_USE);
global.Date.toISOString = origDate.toISOString;

afterEach(() => {
  global.Date = origDate;
});

describe('Create status file', () => {
  describe('successfully', () => {
    beforeAll(async () => {
      writefile.mockResolvedValueOnce();
      await createStatus('workDir', 'dotplot');
    });

    it('should call write file', () => {
      const expectedStatus = JSON.stringify({
        date: new Date().toISOString(),
        primaryFile: 'dotplot',
        status: 'running',
        tool: 'dotplot',
      }, null, 2);
      expect(writefile).toHaveBeenCalledWith('workDir/status.json', expectedStatus);
    });
  });

  describe('successfully with primaryFile different from analysisType', () => {
    beforeAll(async () => {
      writefile.mockResolvedValueOnce();
      await createStatus('workDir', 'dotplot', 'otherFile');
    });

    it('should call write file', () => {
      const expectedStatus = JSON.stringify({
        date: new Date().toISOString(),
        primaryFile: 'otherFile',
        status: 'running',
        tool: 'dotplot',
      }, null, 2);
      expect(writefile).toHaveBeenCalledWith('workDir/status.json', expectedStatus);
    });
  });

  it('should throw error when writing status file throws error', async () => {
    const expectedError = new Error('Could not create status file for task workDir');
    writefile.mockRejectedValueOnce();
    await expect(createStatus('workDir', 'dotplot')).rejects.toThrowError(expectedError);
  });
});
