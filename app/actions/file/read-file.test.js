import mockFS from 'mock-fs';

import readFile from './read-file';

// Must mock file system after requires are complete.
mockFS({
  'file.txt': 'file content',
});

afterAll(() => {
  mockFS.restore();
});

describe('Reading file', () => {
  it('should resolve with file contents', () => (
    expect(readFile('file.txt', 'utf8')).resolves.toBe('file content')
  ));

  it('should reject when file cannot be read', () => {
    const err = new Error('Could not read missing.txt');
    return expect(readFile('missing.txt', 'utf8')).rejects.toThrowError(err);
  });
});
