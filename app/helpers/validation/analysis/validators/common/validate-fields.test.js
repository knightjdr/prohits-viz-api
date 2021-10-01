import validateCommon, { validateAbundance } from './validate-fields.js';

describe('Validate common analysis fields', () => {
  it('should validate acceptable fields', () => {
    const form = {
      abundance: 'AvgSpec',
      condition: 'Bait',
      control: 'ctrlCounts',
      ctrlSub: 'true',
      fileType: 'saint',
      logBase: '10',
      mockConditionAbundance: 'false',
      normalization: 'total',
      normalizationReadout: '',
      readout: 'PreyGene',
      readoutLength: '',
      readoutLengthNorm: 'false',
      sampleFile: 'true',
      score: 'BFDR',
      scoreType: 'lte',
      png: 'false',
    };

    const expected = {
      abundance: 'AvgSpec',
      condition: 'Bait',
      control: 'ctrlCounts',
      ctrlSub: true,
      fileType: 'saint',
      logBase: '10',
      mockConditionAbundance: false,
      normalization: 'total',
      normalizationReadout: '',
      readout: 'PreyGene',
      readoutLength: '',
      readoutLengthNorm: false,
      sampleFile: true,
      score: 'BFDR',
      scoreType: 'lte',
      png: false,
    };

    Object.entries(form).forEach(([key, value]) => {
      expect(validateCommon(key, value)).toEqual({ value: expected[key] });
    });
  });

  it('should invalidate unacceptable fields', () => {
    const form = {
      abundance: '',
      condition: '',
      control: 3,
      ctrlSub: 'yes',
      fileType: 'unknown',
      logBase: '3',
      mockConditionAbundance: 'no',
      normalization: 'all',
      normalizationReadout: 3,
      readout: '',
      readoutLength: 3,
      readoutLengthNorm: 'no',
      sampleFile: 'yes',
      score: '',
      scoreType: 'mte',
      png: 'no',
    };

    const expected = {
      abundance: 'missing column name',
      condition: 'missing column name',
      control: 'missing column name',
      ctrlSub: 'should be a boolean',
      fileType: 'invalid file type',
      logBase: 'invalid base: 3',
      mockConditionAbundance: 'should be a boolean',
      normalization: 'invalid value',
      normalizationReadout: 'should be a string',
      readout: 'missing column name',
      readoutLength: 'missing column name',
      readoutLengthNorm: 'should be a boolean',
      sampleFile: 'should be a boolean',
      score: 'missing column name',
      scoreType: 'invalid value',
      png: 'should be a boolean',
    };

    Object.entries(form).forEach(([key, value]) => {
      expect(validateCommon(key, value)).toEqual({ error: expected[key] });
    });
  });

  it('should return null for unknown field', () => {
    expect(validateCommon('unknown', '1')).toBeNull();
  });

  describe('abundance', () => {
    it('should validate string value', () => {
      const value = 'abundance';
      const expected = [true, 'abundance'];
      expect(validateAbundance(value)).toEqual(expected);
    });

    it('should validate an array', () => {
      const value = ['abundance'];
      const expected = [true, ['abundance']];
      expect(validateAbundance(value)).toEqual(expected);
    });

    it('should invalidate an object', () => {
      const value = { abundance: true };
      const expected = [false, null];
      expect(validateAbundance(value)).toEqual(expected);
    });
  });
});
