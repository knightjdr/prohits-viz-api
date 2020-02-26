import mockFS from 'mock-fs';
import fs from 'fs';

import updateStatus from './update-status.js';

// Mock date
const DATE_TO_USE = new Date();
const origDate = Date;
global.Date = jest.fn(() => DATE_TO_USE);
global.Date.now = origDate.now;
global.Date.toISOString = origDate.toISOString;

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
    let statusDetails;

    beforeAll(async () => {
      statusDetails = await updateStatus('tmp/workDir1');
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

    it('should return status object', () => {
      const expected = {
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
      expect(statusDetails).toEqual(expected);
    });
  });

  describe('unsuccessfully', () => {
    let statusDetails;

    beforeAll(async () => {
      statusDetails = await updateStatus('tmp/workDir2');
    });

    it('should update status file with an error when interactive folder is missing', async (done) => {
      fs.readFile('tmp/workDir2/status.json', 'utf8', (err, data) => {
        const expectedStatus = {
          analysis: 'dotplot',
          date: new Date().toISOString(),
          primaryFile: 'error',
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

    it('should return status object', () => {
      const expected = {
        analysis: 'dotplot',
        date: new Date().toISOString(),
        primaryFile: 'error',
        status: 'error',
        files: [
          'error',
          'log',
        ],
      };
      expect(statusDetails).toEqual(expected);
    });
  });
});
