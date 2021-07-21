import validateSaintFEA from './saint-fea-validate.js';

describe('Validate saintfea utility fields', () => {
  it('should handle valid fields', () => {
    const fields = { fdr: '0.01', topPreys: '0' };
    const expected = {
      errors: {},
      fields: { fdr: 0.01, topPreys: 0 },
    };
    expect(validateSaintFEA(fields)).toEqual(expected);
  });

  describe('fdr', () => {
    it('should handle fdr error when not a number', () => {
      const fields = { fdr: 'one', topPreys: '0' };
      const expected = {
        errors: { fdr: 'FDR is not within the bounds of 0 and 1' },
        fields: { fdr: NaN, topPreys: 0 },
      };
      expect(validateSaintFEA(fields)).toEqual(expected);
    });

    it('should handle fdr error when less than 0', () => {
      const fields = { fdr: -0.01, topPreys: '0' };
      const expected = {
        errors: { fdr: 'FDR is not within the bounds of 0 and 1' },
        fields: { fdr: -0.01, topPreys: 0 },
      };
      expect(validateSaintFEA(fields)).toEqual(expected);
    });

    it('should handle fdr error when greater than 1', () => {
      const fields = { fdr: 1.01, topPreys: '0' };
      const expected = {
        errors: { fdr: 'FDR is not within the bounds of 0 and 1' },
        fields: { fdr: 1.01, topPreys: 0 },
      };
      expect(validateSaintFEA(fields)).toEqual(expected);
    });
  });

  it('should handle topPreys error when not a number', () => {
    const fields = { fdr: 0.01, topPreys: 'all' };
    const expected = {
      errors: { topPreys: 'Should be a non-negative number' },
      fields: { fdr: 0.01, topPreys: NaN },
    };
    expect(validateSaintFEA(fields)).toEqual(expected);
  });
});
