import validateSaintDomainEnrich from './saint-domain-enrich-validate.js';

describe('Validate saint_fea utility fields', () => {
  it('should handle valid fields', () => {
    const fields = {
      background: 'all',
      fdr: 0.01,
      idType: 'refseqp',
      topPreys: 0,
    };
    const expected = {
      errors: {},
      fields: {
        background: 'all',
        fdr: 0.01,
        idType: 'refseqp',
        topPreys: 0,
      },
    };
    expect(validateSaintDomainEnrich(fields)).toEqual(expected);
  });

  it('should handle background error for invalid option', () => {
    const fields = {
      background: 'custom',
      fdr: 0.01,
      idType: 'refseqp',
      topPreys: 0,
    };
    const expected = {
      errors: { background: 'The background option should be either "all" or "file"' },
      fields: {
        background: 'custom',
        fdr: 0.01,
        idType: 'refseqp',
        topPreys: 0,
      },
    };
    expect(validateSaintDomainEnrich(fields)).toEqual(expected);
  });

  describe('fdr', () => {
    it('should handle fdr error when not a number', () => {
      const fields = {
        background: 'all',
        fdr: 'one',
        idType: 'refseqp',
        topPreys: 0,
      };
      const expected = {
        errors: { fdr: 'FDR is not within the bounds of 0 and 1' },
        fields: {
          background: 'all',
          fdr: NaN,
          idType: 'refseqp',
          topPreys: 0,
        },
      };
      expect(validateSaintDomainEnrich(fields)).toEqual(expected);
    });

    it('should handle fdr error when less than 0', () => {
      const fields = {
        background: 'all',
        fdr: -0.01,
        idType: 'refseqp',
        topPreys: 0,
      };
      const expected = {
        errors: { fdr: 'FDR is not within the bounds of 0 and 1' },
        fields: {
          background: 'all',
          fdr: -0.01,
          idType: 'refseqp',
          topPreys: 0,
        },
      };
      expect(validateSaintDomainEnrich(fields)).toEqual(expected);
    });

    it('should handle fdr error when greater than 1', () => {
      const fields = {
        background: 'all',
        fdr: 1.01,
        idType: 'refseqp',
        topPreys: 0,
      };
      const expected = {
        errors: { fdr: 'FDR is not within the bounds of 0 and 1' },
        fields: {
          background: 'all',
          fdr: 1.01,
          idType: 'refseqp',
          topPreys: 0,
        },
      };
      expect(validateSaintDomainEnrich(fields)).toEqual(expected);
    });
  });

  it('should handle idType error for invalid option', () => {
    const fields = {
      background: 'all',
      fdr: 0.01,
      idType: 'gi',
      topPreys: 0,
    };
    const expected = {
      errors: { idType: 'Invalid idType option' },
      fields: {
        background: 'all',
        fdr: 0.01,
        idType: 'gi',
        topPreys: 0,
      },
    };
    expect(validateSaintDomainEnrich(fields)).toEqual(expected);
  });

  it('should handle topPreys error when not a number', () => {
    const fields = {
      background: 'all',
      fdr: 0.01,
      idType: 'refseqp',
      topPreys: 'all',
    };
    const expected = {
      errors: { topPreys: 'Should be a non-negative number' },
      fields: {
        background: 'all',
        fdr: 0.01,
        idType: 'refseqp',
        topPreys: NaN,
      },
    };
    expect(validateSaintDomainEnrich(fields)).toEqual(expected);
  });
});
