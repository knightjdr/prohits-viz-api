import mockFS from 'mock-fs';

import taskStatus from './task-status.js';

jest.mock('../../../config/config', () => ({
  workDir: 'tmp/',
}));

const mockedFileSystem = {
  tmp: {
    test1: {
      'status.json': '{"date": "today", "status": "running"}',
    },
    test2: {
      'status.json': '{"date": "yesterday", "status": "complete"}',
    },
  },
};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('Task status', () => {
  describe('no task IDs are requested', () => {
    it('should resolve with an empty object', async () => {
      const status = await taskStatus([]);
      const expected = {};
      expect(status).toEqual(expected);
    });
  });

  describe('task IDs are requested', () => {
    it('should resolve with updated status for tasks that exist', async () => {
      const status = await taskStatus(['test1', 'test2', 'test3']);
      const expected = {
        test1: {
          date: 'today',
          status: 'running',
        },
        test2: {
          date: 'yesterday',
          status: 'complete',
        },
      };
      expect(status).toEqual(expected);
    });
  });
});
