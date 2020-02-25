import validateLogBase from './log-base.js';

describe('Validate logbase', () => {
  it('should validate acceptable base', () => {
    const expected = [true, '2'];

    expect(validateLogBase('2')).toEqual(expected);
  });

  it('should validate missing base', () => {
    const expected = [true, ''];

    expect(validateLogBase('')).toEqual(expected);
  });

  it('should invalidate unknown base', () => {
    const expected = [false, null];

    expect(validateLogBase('unknown')).toEqual(expected);
  });
});
