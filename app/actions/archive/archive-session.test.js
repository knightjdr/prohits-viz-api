import fs from 'fs/promises';
import mockFS from 'mock-fs';

import archiveSession from './archive-session.js';
import createArchiveID from './create-id.js';

jest.mock('../../config/config', () => ({
  archiveDir: 'archive/',
}));
jest.mock('./create-id');

const mockedFileSystem = {
  archive: {},
};

mockFS(mockedFileSystem);

const res = {
  end: jest.fn(),
  send: jest.fn(),
  status: jest.fn(),
};

afterAll(() => {
  mockFS.restore();
});

describe('Archive session file', () => {
  describe('successfully', () => {
    beforeAll(async () => {
      res.send.mockClear();
      createArchiveID.mockReturnValue('archiveID');
      const req = {
        body: {
          settings: { fillColor: 'blue' },
          parameters: {
            otherField: 'value',
            taskID: 'abc',
          },
        },
      };
      await archiveSession(req, res);
    });

    it('should return a route for the archived session', () => {
      const expected = {
        route: '/visualization/archive/archiveID',
      };
      expect(res.send).toHaveBeenCalledWith(expected);
    });

    it('should archive a file', async () => {
      const expected = {
        settings: { fillColor: 'blue' },
        parameters: {
          otherField: 'value',
          taskID: 'archive',
        },
      };
      const file = await fs.readFile('archive/archiveID.json', 'utf8');
      expect(JSON.parse(file)).toEqual(expected);
    });
  });

  describe('unsuccessfully', () => {
    // Error is thrown because an error is thrown when creating ID.
    beforeAll(async () => {
      res.end.mockClear();
      res.status.mockClear();
      createArchiveID.mockImplementation(() => {
        throw new Error();
      });
      const req = {
        body: {
          settings: { fillColor: 'blue' },
          parameters: {
            otherField: 'value',
            taskID: 'abc',
          },
        },
      };
      await archiveSession(req, res);
    });

    it('should set status', () => {
      expect(res.status).toHaveBeenCalledWith(500);
    });

    it('should end response', () => {
      expect(res.end).toHaveBeenCalled();
    });
  });
});
