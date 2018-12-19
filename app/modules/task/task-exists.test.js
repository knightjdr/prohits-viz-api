const mockFS = require('mock-fs');

const taskExists = require('./task-exists');

jest.mock('../../../config', () => ({
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
