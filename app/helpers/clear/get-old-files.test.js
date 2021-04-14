import mockFS from 'mock-fs';

import getOldFiles from './get-old-files.js';

const lifeSpan = 86400000;

const freshDate = new Date(new Date().valueOf() - (lifeSpan / 2));
const oldDate = new Date(new Date().valueOf() - lifeSpan - 1);

const mockedFileSystem = {
  tmp: mockFS.directory({
    mtime: oldDate,
    items: {
      'file1.txt': mockFS.file({
        content: '',
        mtime: new Date(),
      }),
      'file2.txt': mockFS.file({
        content: '',
        mtime: oldDate,
      }),
      'file3.txt': mockFS.file({
        content: '',
        mtime: freshDate,
      }),
      dir1: mockFS.directory({
        mtime: oldDate,
        items: {},
      }),
      dir2: mockFS.directory({
        mtime: freshDate,
        items: {},
      }),
    },
  }),
};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('List old files', () => {
  let oldFiles;

  beforeAll(async () => {
    const files = ['tmp/file1.txt', 'tmp/file2.txt', 'tmp/file3.txt', 'tmp/dir1', 'tmp/dir2'];
    oldFiles = await getOldFiles(files, lifeSpan);
  });

  it('should return a list of expired files', () => {
    const expectedFiles = ['tmp/file2.txt', 'tmp/dir1'];
    expect(oldFiles).toEqual(expectedFiles);
  });
});
