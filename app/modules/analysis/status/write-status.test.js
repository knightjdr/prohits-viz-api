const readfile = require('../../files/read-file');
const writefile = require('../../files/write-file');

jest.mock('../../files/read-file');
jest.mock('../../files/write-file');

const writeStatus = require('./write-status');

const json = '{"status": "running"}';

describe('Write to status file', () => {
  describe('when status file exists', () => {
    const files = ['log'];
    const status = 'complete';

    beforeAll(async (done) => {
      readfile.mockResolvedValueOnce(json);
      writeStatus('workDir', status, files)
        .then(() => {
          done();
        });
    });

    it('should call read file', () => {
      expect(readfile).toHaveBeenCalledWith('workDir/status.json');
    });

    it('should call write file', () => {
      const expectedStatus = JSON.stringify({
        status,
        files,
      }, null, 2);
      expect(writefile).toHaveBeenCalledWith('workDir/status.json', expectedStatus);
    });
  });

  it('should through error when reading status file throws error', async (done) => {
    const expectedError = new Error('Could not update status file');
    readfile.mockRejectedValueOnce();
    writeStatus('workDir', 'complete', [])
      .catch((err) => {
        expect(err).toEqual(expectedError);
        done();
      });
  });
});
