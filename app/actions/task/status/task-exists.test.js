import mockFS from 'mock-fs';

import taskExists from './task-exists';

jest.mock('../../../config/config', () => ({
  workDir: 'tmp/',
}));

const mockedFileSystem = {
  tmp: {
    test1: {},
  },
};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('Task exists', () => {
  let tasks;

  beforeAll(async (done) => {
    taskExists(['test1', 'test2'])
      .then((resolvedTasks) => {
        tasks = resolvedTasks;
        done();
      });
  });

  it('should resolve with task folders that exist', () => {
    const expected = ['test1'];
    expect(tasks).toEqual(expected);
  });
});
