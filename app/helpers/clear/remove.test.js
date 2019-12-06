import fs from 'fs';
import mockFS from 'mock-fs';

import remove from './remove';

const mockedFileSystem = {
  tmp: {
    'file1.txt': mockFS.file({}),
    'file2.txt': mockFS.file({}),
    'file3.txt': mockFS.file({}),
  },
};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('Remove files', () => {
  let files;

  beforeAll(async () => {
    files = ['tmp/file1.txt', 'tmp/file3.txt'];
    await remove(files);
  });

  it('should remove supplied files', () => {
    files.forEach((file) => {
      expect(fs.existsSync(file)).toBeFalsy();
    });
  });

  it('should not remove other files in folder', () => {
    expect(fs.existsSync('tmp/file2.txt')).toBeTruthy();
  });
});
