import validateScoreType from './score-type.js';

describe('Validate scoretype definition', () => {
  it('should validate acceptable value', () => {
    const expected = [true, 'lte'];

    expect(validateScoreType('lte')).toEqual(expected);
  });

  it('should invalidate unknown value', () => {
    const expected = [false, null];

    expect(validateScoreType('unknown')).toEqual(expected);
  });
});
