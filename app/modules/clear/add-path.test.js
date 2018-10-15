const addPath = require('./add-path');

describe('Add path', () => {
  it('should add path to file names and merge into an array', () => {
    const workFiles = ['file1.txt', 'file2.txt'];
    const uploadFiles = ['file3.txt', 'file4.txt'];
    const expectedWorkFiles = [
      'tmp/file1.txt',
      'tmp/file2.txt',
      'tmp/uploads/file3.txt',
      'tmp/uploads/file4.txt',
    ];
    expect(addPath('tmp/', 'tmp/uploads/', workFiles, uploadFiles)).toEqual(expectedWorkFiles)
  });
});
