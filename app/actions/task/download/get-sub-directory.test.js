import getSubDirectory from './get-sub-directory.js';

describe('Get sub directory for file download', () => {
  it('should return info for error file', () => {
    const filename = 'error';
    const expected = {
      file: 'error.txt',
      subDirectory: '',
    };
    expect(getSubDirectory(filename)).toEqual(expected);
  });

  it('should return info for log file', () => {
    const filename = 'log';
    const expected = {
      file: 'log.txt',
      subDirectory: '',
    };
    expect(getSubDirectory(filename)).toEqual(expected);
  });

  it('should return info for interactive files', () => {
    const filename = 'file';
    const expected = {
      file: 'file.json',
      subDirectory: '/interactive',
    };
    expect(getSubDirectory(filename)).toEqual(expected);
  });
});
