import fs from 'fs';
import mockFS from 'mock-fs';

import removeFile from './remove-file';

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
  beforeAll(async () => {
    await removeFile('tmp/file1.txt');
  });

  it('should remove supplied file', () => {
    expect(fs.existsSync('tmp/file1.txt')).toBeFalsy();
  });

  it('should not remove other files in folder', () => {
    expect(fs.existsSync('tmp/file2.txt')).toBeTruthy();
  });
});
