import addPath from './add-path';

describe('Add path', () => {
  it('should add path to file names and merge into an array', () => {
    const config = {
      upload: 'tmp/uploads/',
      workDir: 'tmp/',
    };
    const uploadFiles = ['file3.txt', 'file4.txt'];
    const workFiles = ['file1.txt', 'file2.txt'];
    const files = [workFiles, uploadFiles];

    const expected = [
      'tmp/file1.txt',
      'tmp/file2.txt',
      'tmp/uploads/file3.txt',
      'tmp/uploads/file4.txt',
    ];
    expect(addPath(config, files)).toEqual(expected);
  });
});
