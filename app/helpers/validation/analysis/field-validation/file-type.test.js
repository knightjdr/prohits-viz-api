import validateFileType from './file-type.js';

describe('Validate file type', () => {
  it('should validate acceptable type', () => {
    const expected = [true, 'saint'];

    expect(validateFileType('saint')).toEqual(expected);
  });

  it('should invalidate unknown type', () => {
    const expected = [false, null];

    expect(validateFileType('unknown')).toEqual(expected);
  });
});
