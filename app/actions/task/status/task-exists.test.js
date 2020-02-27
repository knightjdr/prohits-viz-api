import mockFS from 'mock-fs';

import taskExists from './task-exists.js';

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
  it('should resolve with task folders that exist', async () => {
    const actual = await taskExists(['test1', 'test2']);

    const expected = ['test1'];
    expect(actual).toEqual(expected);
  });
});
