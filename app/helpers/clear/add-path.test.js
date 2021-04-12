import addPath from './add-path.js';

describe('Add path', () => {
  it('should add path to file names and merge into an array', () => {
    const files = ['file1.txt', 'file2.txt'];
    const parentDir = 'tmp/';

    const expected = [
      'tmp/file1.txt',
      'tmp/file2.txt',
    ];
    expect(addPath(parentDir, files)).toEqual(expected);
  });
});
