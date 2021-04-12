import mockFS from 'mock-fs';

import getOldFiles from './get-old-files.js';

const lifeSpan = 86400000;

const mockedFileSystem = {
  tmp: {
    'file1.txt': mockFS.file({
      content: '',
      mtime: new Date(),
    }),
    'file2.txt': mockFS.file({
      content: '',
      mtime: new Date(new Date().valueOf() - lifeSpan - 1),
    }),
    'file3.txt': mockFS.file({
      content: '',
      mtime: new Date(new Date().valueOf() - (lifeSpan / 2)),
    }),
  },
};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('List old files', () => {
  let oldFiles;

  beforeAll(async () => {
    const files = ['tmp/file1.txt', 'tmp/file2.txt', 'tmp/file3.txt'];
    oldFiles = await getOldFiles(files, lifeSpan);
  });

  it('should return a list of expired files', () => {
    const expectedFiles = ['tmp/file2.txt'];
    expect(oldFiles).toEqual(expectedFiles);
  });
});
