const writefile = require('../../files/write-file');

jest.mock('../../files/write-file');

// Mock date
const DATE_TO_USE = new Date();
const origDate = Date;
global.Date = jest.fn(() => DATE_TO_USE);
global.Date.toISOString = origDate.toISOString;

const createStatus = require('./create-status');

const body = {
  analysisType: 'dotplot',
};

afterEach(() => {
  global.Date = origDate;
});

describe('Create status file', () => {
  describe('successfully', () => {
    beforeAll(async (done) => {
      writefile.mockResolvedValueOnce();
      createStatus('workDir', body)
        .then(() => {
          done();
        });
    });

    it('should call write file', () => {
      const expectedStatus = JSON.stringify({
        analysis: 'dotplot',
        date: new Date().toISOString(),
        status: 'running',
      }, null, 2);
      expect(writefile).toHaveBeenCalledWith('workDir/status.json', expectedStatus);
    });
  });

  it('should through error when writing status file throws error', async (done) => {
    const expectedError = new Error('Could not create status file for task workDir');
    writefile.mockRejectedValueOnce();
    createStatus('workDir', body)
      .catch((err) => {
        expect(err).toEqual(expectedError);
        done();
      });
  });
});
