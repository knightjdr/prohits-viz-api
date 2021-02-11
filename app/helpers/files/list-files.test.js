import mockFS from 'mock-fs';

import listFiles from './list-files.js';

// Must mock file system after requires are complete.
mockFS({
  tmp: {
    'file1.txt': '',
    'file2.txt': '',
    'file3.json': '',
  },
});

afterAll(() => {
  mockFS.restore();
});

describe('List all files in a directory', () => {
  it('should return all files', async () => {
    const expectedFiles = ['file1.txt', 'file2.txt', 'file3.json'];
    const files = await listFiles('tmp');
    expect(files.sort()).toEqual(expectedFiles.sort());
  });

  it('should return txt files', async () => {
    const expectedFiles = ['file1.txt', 'file2.txt'];
    const files = await listFiles('tmp', '.txt');
    expect(files.sort()).toEqual(expectedFiles.sort());
  });

  it('should return error', async () => {
    const expectedErr = new Error('Error listing missingDir folder');
    await expect(listFiles('missingDir')).rejects.toThrowError(expectedErr);
  });
});
