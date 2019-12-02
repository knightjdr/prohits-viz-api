const mockFS = require('mock-fs');

const expiredFile = 86400000;
jest.mock('../../config/config', () => ({
  expiredFile: 86400000,
}));

const oldFiles = require('./old-files');

const mockedFileSystem = {
  tmp: {
    'file1.txt': mockFS.file({
      content: '',
      mtime: new Date(),
    }),
    'file2.txt': mockFS.file({
      content: '',
      mtime: new Date(new Date().valueOf() - expiredFile - 1),
    }),
    'file3.txt': mockFS.file({
      content: '',
      mtime: new Date(new Date().valueOf() - (expiredFile / 2)),
    }),
  },
};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('List old files', () => {
  let old;

  beforeAll(async (done) => {
    const files = ['tmp/file1.txt', 'tmp/file2.txt', 'tmp/file3.txt'];
    oldFiles(files)
      .then((result) => {
        old = result;
        done();
      });
  });

  it('should return a list of expired files', () => {
    const expectedFiles = ['tmp/file2.txt'];
    expect(old).toEqual(expectedFiles);
  });
});
