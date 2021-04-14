import fs from 'fs/promises';
import mockFS from 'mock-fs';

import clearFolders from './clear-folders.js';

const lifespanArchiveFile = 7889400000;
const lifespanTMPFile = 86400000;
const lifespanUploadFile = 3600000;

jest.mock('../../config/config', () => ({
  temporaryDirectories: [
    {
      dir: 'archive/',
      ignoreFolders: [],
      lifespan: lifespanArchiveFile,
      whiteList: 'white-list.json',
    },
    {
      dir: 'tmp/',
      ignoreFolders: ['samplefile', 'test', 'uploads'],
      lifespan: lifespanTMPFile,
    },
    {
      dir: 'tmp/uploads/',
      ignoreFolders: [],
      lifespan: lifespanUploadFile,
    },
  ],
}));

const freshArchiveDate = new Date(new Date().valueOf() - (lifespanArchiveFile / 2));
const oldArchiveDate = new Date(new Date().valueOf() - lifespanArchiveFile - 1);
const freshTMPDate = new Date(new Date().valueOf() - (lifespanTMPFile / 2));
const oldTMPDate = new Date(new Date().valueOf() - lifespanTMPFile - 1);
const freshUploadDate = new Date(new Date().valueOf() - (lifespanUploadFile / 2));
const oldUploadDate = new Date(new Date().valueOf() - lifespanUploadFile - 1);

const mockedFileSystem = {
  archive: mockFS.directory({
    mtime: oldArchiveDate,
    items: {
      'file1.json': mockFS.file({
        content: '',
        mtime: freshArchiveDate,
      }),
      'file2.json': mockFS.file({
        content: '',
        mtime: oldArchiveDate,
      }),
      'file3.json': mockFS.file({
        content: '',
        mtime: oldArchiveDate,
      }),
      'white-list.json': mockFS.file({
        content: JSON.stringify([
          'file2.json',
        ]),
        mtime: oldArchiveDate,
      }),
    },
  }),
  tmp: mockFS.directory({
    mtime: oldTMPDate,
    items: {
      samplefile: mockFS.directory({
        mtime: oldTMPDate,
        items: {
          interactive: mockFS.directory({
            mtime: oldTMPDate,
            items: {
              'file.json': mockFS.file({
                content: '',
                mtime: oldTMPDate,
              }),
            },
          }),
          'status.json': mockFS.file({
            content: '',
            mtime: oldTMPDate,
          }),
        },
      }),
      test: mockFS.directory({
        mtime: oldTMPDate,
        items: {},
      }),
      'file1.txt': mockFS.file({
        content: '',
        mtime: freshTMPDate,
      }),
      'file2.txt': mockFS.file({
        content: '',
        mtime: oldTMPDate,
      }),
      folder1: mockFS.directory({
        items: {},
        mtime: freshTMPDate,
      }),
      folder2: mockFS.directory({
        items: {},
        mtime: oldTMPDate,
      }),
      uploads: mockFS.directory({
        mtime: oldTMPDate,
        items: {
          'file3.txt': mockFS.file({
            content: '',
            mtime: freshUploadDate,
          }),
          'file4.txt': mockFS.file({
            content: '',
            mtime: oldUploadDate,
          }),
        },
      }),
    },
  }),
};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('Clear folders', () => {
  beforeAll(async () => {
    await clearFolders();
  });

  it('should clear expired files in archive folder', async () => {
    const expectedFiles = ['file1.json', 'file2.json', 'white-list.json'];
    const files = await fs.readdir('archive');
    expect(files).toEqual(expectedFiles);
  });

  it('should clear expired files/folders in tmp folder', async () => {
    const expectedFiles = [
      'file1.txt',
      'folder1',
      'samplefile',
      'test',
      'uploads',
    ];
    const files = await fs.readdir('tmp');
    expect(files).toEqual(expectedFiles);
  });

  it('should not clear files in samplefile folder', async () => {
    const expectedFiles = [
      'interactive',
      'status.json',
    ];
    const files = await fs.readdir('tmp/samplefile');
    expect(files).toEqual(expectedFiles);
  });

  it('should clear expired files in uploads folder', async () => {
    const expectedFiles = ['file3.txt'];
    const files = await fs.readdir('tmp/uploads');
    expect(files).toEqual(expectedFiles);
  });
});
