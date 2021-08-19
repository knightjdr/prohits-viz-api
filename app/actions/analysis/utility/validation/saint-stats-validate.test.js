import validateSaintStats from './saint-stats-validate.js';

describe('Validate saint_stats utility fields', () => {
  it('should handle valid fields', () => {
    const fields = { fdr: '0.01' };
    const expected = {
      errors: {},
      fields: { fdr: 0.01 },
    };
    expect(validateSaintStats(fields)).toEqual(expected);
  });

  it('should handle fdr error when not a number', () => {
    const fields = { fdr: 'one' };
    const expected = {
      errors: { fdr: 'FDR is not within the bounds of 0 and 1' },
      fields: { fdr: NaN },
    };
    expect(validateSaintStats(fields)).toEqual(expected);
  });

  it('should handle fdr error when less than 0', () => {
    const fields = { fdr: -0.01 };
    const expected = {
      errors: { fdr: 'FDR is not within the bounds of 0 and 1' },
      fields: { fdr: -0.01 },
    };
    expect(validateSaintStats(fields)).toEqual(expected);
  });

  it('should handle fdr error when greater than 1', () => {
    const fields = { fdr: 1.01 };
    const expected = {
      errors: { fdr: 'FDR is not within the bounds of 0 and 1' },
      fields: { fdr: 1.01 },
    };
    expect(validateSaintStats(fields)).toEqual(expected);
  });
});
