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
      ignoreFolders: ['samplefile/', 'test/', 'uploads/'],
      lifespan: lifespanTMPFile,
    },
    {
      dir: 'tmp/uploads/',
      ignoreFolders: [],
      lifespan: lifespanUploadFile,
    },
  ],
}));

const mockedFileSystem = {
  archive: {
    'file1.json': mockFS.file({
      content: '',
      mtime: new Date(new Date().valueOf() - (lifespanArchiveFile / 2)),
    }),
    'file2.json': mockFS.file({
      content: '',
      mtime: new Date(new Date().valueOf() - lifespanArchiveFile - 1),
    }),
    'file3.json': mockFS.file({
      content: '',
      mtime: new Date(new Date().valueOf() - lifespanArchiveFile - 1),
    }),
    'white-list.json': JSON.stringify([
      'file2.json',
    ]),
  },
  tmp: {
    samplefile: {},
    test: {},
    'file1.txt': mockFS.file({
      content: '',
      mtime: new Date(new Date().valueOf() - (lifespanTMPFile / 2)),
    }),
    'file2.txt': mockFS.file({
      content: '',
      mtime: new Date(new Date().valueOf() - lifespanTMPFile - 1),
    }),
    folder1: mockFS.directory({
      items: {},
      mode: '0755',
      mtime: new Date(new Date().valueOf() - (lifespanTMPFile / 2)),
    }),
    folder2: mockFS.directory({
      items: {},
      mode: '0755',
      mtime: new Date(new Date().valueOf() - lifespanTMPFile - 1),
    }),
    uploads: {
      'file3.txt': mockFS.file({
        content: '',
        mtime: new Date(new Date().valueOf() - (lifespanUploadFile / 2)),
      }),
      'file4.txt': mockFS.file({
        content: '',
        mtime: new Date(new Date().valueOf() - lifespanUploadFile - 1),
      }),
    },
  },
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
    const expectedFiles = ['file1.txt', 'folder1', 'samplefile', 'test', 'uploads'];
    const files = await fs.readdir('tmp');
    expect(files).toEqual(expectedFiles);
  });

  it('should clear expired files in uploads folder', async () => {
    const expectedFiles = ['file3.txt'];
    const files = await fs.readdir('tmp/uploads');
    expect(files).toEqual(expectedFiles);
  });
});
