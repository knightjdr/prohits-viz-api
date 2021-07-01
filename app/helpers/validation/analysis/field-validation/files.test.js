import validateFiles from './files.js';

describe('Validate files', () => {
  it('should validate file array', () => {
    const files = [{}];

    const expected = {};
    expect(validateFiles(files)).toEqual(expected);
  });

  it('should invalidate undefined files', () => {
    const files = undefined;

    const expected = {
      errors: { files: 'Missing file' },
    };
    expect(validateFiles(files)).toEqual(expected);
  });

  it('should invalidate incorrect type', () => {
    const files = {};

    const expected = {
      errors: { files: 'Missing file' },
    };
    expect(validateFiles(files)).toEqual(expected);
  });

  it('should invalidate missing file', () => {
    const files = [];

    const expected = {
      errors: { files: 'Missing file' },
    };
    expect(validateFiles(files)).toEqual(expected);
  });
});
