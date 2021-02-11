import fs from 'fs/promises';
import mockFS from 'mock-fs';

import clearFolders from './clear-folders.js';

const expiredFile = 86400000;
jest.mock('../../config/config', () => ({
  ignore: [/^tmp\/test/, /^tmp\/uploads$/],
  expiredFile: 86400000,
  upload: 'tmp/uploads/',
  workDir: 'tmp/',
}));

const mockedFileSystem = {
  tmp: {
    test1: {},
    'file1.txt': mockFS.file({
      content: '',
      mtime: new Date(new Date().valueOf() - (expiredFile / 2)),
    }),
    'file2.txt': mockFS.file({
      content: '',
      mtime: new Date(new Date().valueOf() - expiredFile - 1),
    }),
    folder1: mockFS.directory({
      items: {},
      mode: '0755',
      mtime: new Date(new Date().valueOf() - (expiredFile / 2)),
    }),
    folder2: mockFS.directory({
      items: {},
      mode: '0755',
      mtime: new Date(new Date().valueOf() - expiredFile - 1),
    }),
    uploads: {
      'file3.txt': mockFS.file({
        content: '',
        mtime: new Date(new Date().valueOf() - (expiredFile / 2)),
      }),
      'file4.txt': mockFS.file({
        content: '',
        mtime: new Date(new Date().valueOf() - expiredFile - 1),
      }),
    },
  },
};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('Clear folders', () => {
  beforeAll(async () => {
    await clearFolders();
  });

  it('should clear expired files/folders in tmp folder', async () => {
    const expectedFiles = ['file1.txt', 'folder1', 'test1', 'uploads'];
    const files = await fs.readdir('tmp');
    expect(files).toEqual(expectedFiles);
  });

  it('should clear expired files in uploads folder', async () => {
    const expectedFiles = ['file3.txt'];
    const files = await fs.readdir('tmp/uploads');
    expect(files).toEqual(expectedFiles);
  });
});
