import fs from 'fs/promises';
import mockFS from 'mock-fs';

import remove from './remove.js';

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

  it('should remove supplied files', async () => {
    files.forEach((file) => {
      expect(fs.stat(file)).rejects.toBeTruthy();
    });
  });

  it('should not remove other files in folder', async () => (
    expect(fs.stat('tmp/file2.txt')).resolves.toBeTruthy()
  ));
});
