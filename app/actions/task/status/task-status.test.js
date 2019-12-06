import mockFS from 'mock-fs';

import taskStatus from './task-status';

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
    let status;

    beforeAll(async (done) => {
      taskStatus([])
        .then((resolvedStatus) => {
          status = resolvedStatus;
          done();
        });
    });

    it('should resolve with an empty list and status', () => {
      const expected = { list: [], status: [] };
      expect(status).toEqual(expected);
    });
  });

  describe('task IDs are requested', () => {
    let status;

    beforeAll(async (done) => {
      taskStatus(['test1', 'test2', 'test3'])
        .then((resolvedStatus) => {
          status = resolvedStatus;
          done();
        });
    });

    it('should resolve with a list of tasks', () => {
      const expected = ['test1', 'test2', 'test3'].sort();
      expect(status.list.sort()).toEqual(expected);
    });

    it('should resolve with a list of task status', () => {
      const expected = [
        {
          date: 'today',
          status: 'running',
          id: 'test1',
        },
        {
          date: 'yesterday',
          status: 'complete',
          id: 'test2',
        },
        {
          date: '-',
          id: 'test3',
          status: 'error',
        },
      ];
      const sorted = status.status.sort((a, b) => a.id.localeCompare(b.id));
      expect(sorted).toEqual(expected);
    });
  });
});
