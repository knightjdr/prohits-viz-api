const mockFS = require('mock-fs');
const fs = require('fs');

const createFolder = require('./create-folder');

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
    expect(fs.existsSync('./test-folder2')).toBeTruthy();
  });

  it('should resolve gracefully when a folder already exists', () => (
    expect(createFolder('./test-folder1')).resolves.toBeUndefined()
  ));

  describe('subdirectory when parent does not exist', () => {
    beforeAll(async (done) => {
      await createFolder('./test-folder3/sub-directory');
      done();
    });

    it('should create parent folder', () => {
      expect(fs.existsSync('./test-folder3')).toBeTruthy();
    });

    it('should create subdirectory', () => {
      expect(fs.existsSync('./test-folder3/sub-directory')).toBeTruthy();
    });
  });
});
