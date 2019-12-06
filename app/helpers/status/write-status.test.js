import readfile from '../files/read-file';
import writefile from '../files/write-file';

import writeStatus from './write-status';

jest.mock('../files/read-file');
jest.mock('../files/write-file');

const json = '{"primaryFile": "dotplot", "status": "running"}';

describe('Write to status file', () => {
  describe('when status file exists', () => {
    const files = ['log'];
    const status = 'complete';

    beforeAll(async () => {
      readfile.mockResolvedValueOnce(json);
      await writeStatus('workDir', status, files);
    });

    it('should call read file', () => {
      expect(readfile).toHaveBeenCalledWith('workDir/status.json');
    });

    it('should call write file', () => {
      const expectedStatus = JSON.stringify({
        primaryFile: 'dotplot',
        status,
        files,
      }, null, 2);
      expect(writefile).toHaveBeenCalledWith('workDir/status.json', expectedStatus);
    });
  });

  describe('when status file but primaryFile arg is defined', () => {
    const files = ['log'];
    const status = 'complete';

    beforeAll(async () => {
      readfile.mockResolvedValueOnce(json);
      await writeStatus('workDir', status, files, 'error');
    });

    it('should call read file', () => {
      expect(readfile).toHaveBeenCalledWith('workDir/status.json');
    });

    it('should call write file', () => {
      const expectedStatus = JSON.stringify({
        primaryFile: 'error',
        status,
        files,
      }, null, 2);
      expect(writefile).toHaveBeenCalledWith('workDir/status.json', expectedStatus);
    });
  });

  it('should throw error when reading status file throws error', async () => {
    const expectedError = new Error('Could not update status file');
    readfile.mockRejectedValueOnce();
    await expect(writeStatus('workDir', 'complete', [])).rejects.toThrowError(expectedError);
  });
});
