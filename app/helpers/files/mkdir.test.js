const fs = require('fs');
const mockFS = require('mock-fs');

const mkdir = require('./mkdir');

mockFS({
  tmp: {},
});

afterAll(() => {
  mockFS.restore();
});

describe('Make a directory', () => {
  it('should make a directory', async () => {
    await mkdir('tmp/subdir');
    expect(fs.existsSync('tmp/subdir')).toBeTruthy();
  });

  it('should return error', async () => {
    await expect(mkdir('missingdir/subdir')).rejects.toThrow();
  });
});
