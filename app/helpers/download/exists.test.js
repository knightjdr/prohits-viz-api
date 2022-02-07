import mockFS from 'mock-fs';

import exists from './exists.js';

// Must mock file system after requires are complete.
mockFS({
  'file.txt': 'file content',
});

afterAll(() => {
  mockFS.restore();
});

describe('Download file existence check', () => {
  it('should resolve when file exists', () => (
    expect(exists('file.txt')).resolves.toBeDefined()
  ));

  it('should throw an error when the file does not exist', async () => {
    expect.assertions(1);
    const expected = "Error: ENOENT, no such file or directory 'missing.txt'";
    try {
      await exists('missing.txt');
    } catch (e) {
      expect(e.toString()).toEqual(expected);
    }
  });
});
