import mockFS from 'mock-fs';

import readFile from './read-file.js';

// Must mock file system after requires are complete.
mockFS({
  'file1.txt': 'file txt',
});

afterAll(() => {
  mockFS.restore();
});

describe('Read file', () => {
  it('should read a file', async () => {
    const expectedContent = 'file txt';
    const data = await readFile('file1.txt');
    expect(data).toBe(expectedContent);
  });

  it('should return an error when file can not be read', async () => {
    const expectedError = new Error('Could not read file: missingFile.txt');
    return expect(readFile('missingFile.txt')).rejects.toThrowError(expectedError);
  });
});
