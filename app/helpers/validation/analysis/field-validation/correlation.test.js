import validateCorrelation from './correlation.js';

describe('Validate correlation', () => {
  it('should validate acceptable algorithm', () => {
    const expected = [true, 'kendall'];

    expect(validateCorrelation('kendall')).toEqual(expected);
  });

  it('should invalidate unknown algorithm', () => {
    const expected = [false, null];

    expect(validateCorrelation('unknown')).toEqual(expected);
  });
});
