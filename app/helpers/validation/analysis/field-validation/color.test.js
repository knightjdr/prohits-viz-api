import validateColor from './color.js';

describe('Validate color scheme', () => {
  it('should validate acceptable scheme', () => {
    const expected = [true, 'blue'];

    expect(validateColor('blue')).toEqual(expected);
  });

  it('should invalidate unknown scheme', () => {
    const expected = [false, null];

    expect(validateColor('unknown')).toEqual(expected);
  });
});
