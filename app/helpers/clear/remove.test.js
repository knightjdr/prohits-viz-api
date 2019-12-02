const rimraf = require('rimraf');

jest.mock('rimraf');

const remove = require('./remove');

describe('Remove files', () => {
  beforeAll(() => {
    const files = ['file1.txt', 'tmp/file2.txt'];
    remove(files);
  });

  it('should remove first file in array', () => {
    expect(rimraf).toHaveBeenCalledWith('file1.txt', expect.anything());
  });

  it('should remove second file in array', () => {
    expect(rimraf).toHaveBeenCalledWith('tmp/file2.txt', expect.anything());
  });
});
