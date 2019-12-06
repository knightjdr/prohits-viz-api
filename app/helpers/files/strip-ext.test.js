import stripExt from './strip-ext';

describe('Strip file extensions', () => {
  it('should strip file extensions', () => {
    const expectedArr = ['file1', 'file2', 'file3', 'file4'];
    const files = ['file1.txt', 'tmp/file2.txt', 'file3.json', 'file4'];
    const arr = stripExt(files, []);
    expect(arr).toEqual(expectedArr);
  });
});
