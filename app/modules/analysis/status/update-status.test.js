const mockFS = require('mock-fs');
const fs = require('fs');

// Mock date
const DATE_TO_USE = new Date();
const origDate = Date;
global.Date = jest.fn(() => DATE_TO_USE);
global.Date.now = origDate.now;
global.Date.toISOString = origDate.toISOString;

const updateStatus = require('./update-status');

const sleep = ms => (
  new Promise(resolve => setTimeout(resolve, ms))
);

// Must mock file system after requires are complete.
const status = {
  analysis: 'dotplot',
  date: new Date().toISOString(),
  status: 'running',
};
mockFS({
  tmp: {
    workDir1: {
      'error.txt': '',
      'log.txt': '',
      interactive: {
        'file1.json': '',
        'file2.json': '',
      },
      'status.json': JSON.stringify(status, null, 2),
    },
    workDir2: {
      'error.txt': '',
      'log.txt': '',
      'status.json': JSON.stringify(status, null, 2),
    },
  },
});

afterAll(() => {
  global.Date = origDate;
  mockFS.restore();
});

describe('Update status file', () => {
  describe('successfully', () => {
    beforeAll(async (done) => {
      updateStatus('tmp/workDir1')
        .then(() => {
          done();
        });
    });

    it('should update status file', async (done) => {
      fs.readFile('tmp/workDir1/status.json', 'utf8', (err, data) => {
        const expectedStatus = {
          analysis: 'dotplot',
          date: new Date().toISOString(),
          status: 'complete',
          files: [
            'error',
            'log',
            'file1',
            'file2',
          ],
        };
        expect(JSON.parse(data)).toEqual(expectedStatus);
        done();
      });
    });
  });

  describe('unsuccessfully', () => {
    beforeAll(async (done) => {
      updateStatus('tmp/workDir2')
        .then(() => {
          done();
        });
    });

    it('should update status file with an error when interactive folder is missing', async (done) => {
      /* Need a brief wait here to allow final writing to status file
      ** in catch statement. */
      await sleep(200);
      fs.readFile('tmp/workDir2/status.json', 'utf8', (err, data) => {
        const expectedStatus = {
          analysis: 'dotplot',
          date: new Date().toISOString(),
          status: 'error',
          files: [
            'error',
            'log',
          ],
        };
        expect(JSON.parse(data)).toEqual(expectedStatus);
        done();
      });
    });
  });
});
