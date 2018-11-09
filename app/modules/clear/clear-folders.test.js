const mockFS = require('mock-fs');
const fs = require('fs');

const expiredFile = 86400000;
jest.mock('../../../config', () => ({
  ignore: [/^tmp\/test/, /^tmp\/uploads$/],
  expiredFile: 86400000,
  upload: 'tmp/uploads/',
  workDir: 'tmp/',
}));

const clearFolders = require('./clear-folders');

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

const sleep = ms => (
  new Promise(resolve => setTimeout(resolve, ms))
);

afterAll(() => {
  mockFS.restore();
});

describe('Clear folders', () => {
  beforeAll(async (done) => {
    clearFolders();
    await sleep(500);
    done();
  });

  it('should clear expired files/folders in tmp folder', async (done) => {
    const expectedFiles = ['file1.txt', 'folder1', 'test1', 'uploads'];
    fs.readdir('tmp', (err, files) => {
      expect(files).toEqual(expectedFiles);
      done();
    });
  });

  it('should clear expired files in uploads folder', async (done) => {
    const expectedFiles = ['file3.txt'];
    fs.readdir('tmp/uploads', (err, files) => {
      expect(files).toEqual(expectedFiles);
      done();
    });
  });
});