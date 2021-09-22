import validateTextBiogridNetwork from './text-biogrid-validate.js';

const validFields = {
  evidenceList: [],
  fdr: 0.05,
  idType: 'symbol',
  includeEvidence: false,
  includePrimaryInteractions: true,
  includeSecondaryInteractions: false,
  includeSaintInteractions: true,
  interSpeciesExcluded: false,
  isSaint: true,
  max: 10000,
  throughputTag: 'all',
};

describe('Validate text_biogrid_network utility fields', () => {
  it('should handle valid fields', () => {
    const fields = validFields;
    const expected = {
      errors: {},
      fields: validFields,
    };
    expect(validateTextBiogridNetwork(fields)).toEqual(expected);
  });

  describe('evidenceList', () => {
    it('should filter out invalid evidence fields', () => {
      const fields = {
        ...validFields,
        evidenceList: ['affinity capture-ms', 'fret', 'other'],
      };
      const expected = {
        errors: {},
        fields: {
          ...validFields,
          evidenceList: ['affinity capture-ms', 'fret'],
        },
      };
      expect(validateTextBiogridNetwork(fields)).toEqual(expected);
    });

    it('should validate JSON evidence list', () => {
      const fields = {
        ...validFields,
        evidenceList: '["affinity capture-ms", "fret", "other"]',
      };
      const expected = {
        errors: {},
        fields: {
          ...validFields,
          evidenceList: ['affinity capture-ms', 'fret'],
        },
      };
      expect(validateTextBiogridNetwork(fields)).toEqual(expected);
    });
  });

  describe('fdr', () => {
    it('should handle fdr error when not a number', () => {
      const fields = {
        ...validFields,
        fdr: 'one',
      };
      const expected = {
        errors: { fdr: 'FDR is not within the bounds of 0 and 1' },
        fields: {
          ...validFields,
          fdr: NaN,
        },
      };
      expect(validateTextBiogridNetwork(fields)).toEqual(expected);
    });

    it('should handle fdr error when less than 0', () => {
      const fields = {
        ...validFields,
        fdr: -0.01,
      };
      const expected = {
        errors: { fdr: 'FDR is not within the bounds of 0 and 1' },
        fields: {
          ...validFields,
          fdr: -0.01,
        },
      };
      expect(validateTextBiogridNetwork(fields)).toEqual(expected);
    });

    it('should handle fdr error when greater than 1', () => {
      const fields = {
        ...validFields,
        fdr: 1.01,
      };
      const expected = {
        errors: { fdr: 'FDR is not within the bounds of 0 and 1' },
        fields: {
          ...validFields,
          fdr: 1.01,
        },
      };
      expect(validateTextBiogridNetwork(fields)).toEqual(expected);
    });
  });

  it('should handle idType error for invalid option', () => {
    const fields = {
      ...validFields,
      idType: 'gi',
    };
    const expected = {
      errors: { idType: 'Invalid idType option' },
      fields: {
        ...validFields,
        idType: 'gi',
      },
    };
    expect(validateTextBiogridNetwork(fields)).toEqual(expected);
  });

  describe('max', () => {
    it('should handle max error when not a number', () => {
      const fields = {
        ...validFields,
        max: 'one',
      };
      const expected = {
        errors: { max: 'Max is not within the bounds of 0 and 10000' },
        fields: {
          ...validFields,
          max: NaN,
        },
      };
      expect(validateTextBiogridNetwork(fields)).toEqual(expected);
    });

    it('should handle max error when less than 0', () => {
      const fields = {
        ...validFields,
        max: -0.01,
      };
      const expected = {
        errors: { max: 'Max is not within the bounds of 0 and 10000' },
        fields: {
          ...validFields,
          max: -0.01,
        },
      };
      expect(validateTextBiogridNetwork(fields)).toEqual(expected);
    });

    it('should handle max error when greater than 10000', () => {
      const fields = {
        ...validFields,
        max: 10001,
      };
      const expected = {
        errors: { max: 'Max is not within the bounds of 0 and 10000' },
        fields: {
          ...validFields,
          max: 10001,
        },
      };
      expect(validateTextBiogridNetwork(fields)).toEqual(expected);
    });
  });

  it('should handle throughputTag error for invalid option', () => {
    const fields = {
      ...validFields,
      throughputTag: 'medium',
    };
    const expected = {
      errors: { throughputTag: 'Invalid throughput option' },
      fields: {
        ...validFields,
        throughputTag: 'medium',
      },
    };
    expect(validateTextBiogridNetwork(fields)).toEqual(expected);
  });
});
