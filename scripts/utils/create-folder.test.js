import mockFS from 'mock-fs';
import fs from 'fs/promises';

import createFolder from './create-folder.js';

const mockedFileSystem = {
  'test-folder1': {},
};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('Create folder', () => {
  it('should create a folder when it does not exist', async () => {
    await createFolder('./test-folder2');
    return expect(fs.stat('./test-folder2')).resolves.toBeTruthy();
  });

  it('should resolve gracefully when a folder already exists', () => (
    expect(createFolder('./test-folder1')).resolves.toBeUndefined()
  ));

  describe('subdirectory when parent does not exist', () => {
    beforeAll(async (done) => {
      await createFolder('./test-folder3/sub-directory');
      done();
    });

    it('should create parent folder', async () => (
      expect(fs.stat('./test-folder3')).resolves.toBeTruthy()
    ));

    it('should create subdirectory', async () => (
      expect(fs.stat('./test-folder3/sub-directory')).resolves.toBeTruthy()
    ));
  });
});
