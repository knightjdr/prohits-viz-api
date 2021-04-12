/* eslint-disable max-len */
import mockFS from 'mock-fs';

import filterOutFoldersToIgnore from './filter-files.js';

const mockedFileSystem = {
  tmp: {
    'white-list.json': JSON.stringify([
      'def',
    ]),
  },
};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('Name of the group', () => {
  it('should return all files that do not match an ignore folder', async () => {
    const directoryInfo = {
      dir: 'tmp/',
      ignoreFolders: ['uploads/'],
    };
    const unfilteredFliesToRemove = [
      'tmp/abc',
      'tmp/def',
      'tmp/ghi',
      'tmp/uploads/',
      'tmp/uploads/def',
      'tmp/white-list.json',
    ];
    const expectedFilesToRemove = [
      'tmp/abc',
      'tmp/def',
      'tmp/ghi',
      'tmp/white-list.json',
    ];
    await expect(filterOutFoldersToIgnore(unfilteredFliesToRemove, directoryInfo)).resolves.toEqual(expectedFilesToRemove);
  });

  it('should return all files that do not match an ignore folder or are in whitelist', async () => {
    const directoryInfo = {
      dir: 'tmp/',
      ignoreFolders: ['uploads/'],
      whiteList: 'white-list.json',
    };
    const unfilteredFliesToRemove = [
      'tmp/abc',
      'tmp/def',
      'tmp/ghi',
      'tmp/uploads/',
      'tmp/uploads/def',
      'tmp/white-list.json',
    ];
    const expectedFilesToRemove = [
      'tmp/abc',
      'tmp/ghi',
    ];
    await expect(filterOutFoldersToIgnore(unfilteredFliesToRemove, directoryInfo)).resolves.toEqual(expectedFilesToRemove);
  });
});
