import fs from 'fs';
import mockFS from 'mock-fs';
import getTimestamp from '../../utils/get-timestamp.js';

import logClientError from './index.js';

jest.mock('../../config/config.js', () => ({
  logDir: 'logs/',
}));
jest.mock('../../utils/get-timestamp.js');

const mockedFileSystem = {
  logs: {},
};
mockFS(mockedFileSystem);

const res = {
  end: jest.fn(),
  status: jest.fn(),
};

afterAll(() => {
  mockFS.restore();
});

describe('Log clientside error', () => {
  describe('log error to file', () => {
    beforeAll(async () => {
      const req = {
        body: {
          error: 'Error: component error',
          info: {
            message: 'error message',
          },
        },
      };

      res.end.mockClear();
      getTimestamp.mockReturnValue('2021-01-21, 1:05:06 p.m.');

      await logClientError(req, res);
    });

    it('should log error to file', async (done) => {
      const expected = '2021-01-21, 1:05:06 p.m., Error: component error\n'
        + '{\n  "message": "error message"\n}\n\n';
      fs.readFile('logs/client.log', 'utf8', (err, data) => {
        expect(data).toBe(expected);
        done();
      });
    });

    it('should end response', () => {
      expect(res.end).toHaveBeenCalled();
    });
  });

  describe('throws error', () => {
    beforeAll(async () => {
      const req = {
        body: {
          error: 'component error',
          info: {
            message: 'error message',
          },
        },
      };

      res.end.mockClear();
      res.status.mockClear();

      getTimestamp.mockImplementation(() => {
        throw new Error();
      });

      await logClientError(req, res);
    });

    it('should set response status', () => {
      expect(res.status).toHaveBeenCalledWith(500);
    });

    it('should end response', () => {
      expect(res.end).toHaveBeenCalled();
    });
  });
});
