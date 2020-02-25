import validateCommon from './validate-fields.js';

describe('Validate common analysis fields', () => {
  it('should validate acceptable fields', () => {
    const form = {
      abundance: 'AvgSpec',
      condition: 'Bait',
      control: 'ctrlCounts',
      ctrlSub: 'true',
      logBase: '10',
      minConditions: '1',
      mockConditionAbundance: 'false',
      normalization: 'total',
      normalizationReadout: '',
      parsimoniousReadoutFiltering: 'false',
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
      logBase: '10',
      minConditions: 1,
      mockConditionAbundance: false,
      normalization: 'total',
      normalizationReadout: '',
      parsimoniousReadoutFiltering: false,
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

  it('should invalidate acceptable fields', () => {
    const form = {
      abundance: '',
      condition: '',
      control: 3,
      ctrlSub: 'yes',
      logBase: '3',
      minConditions: '0',
      mockConditionAbundance: 'no',
      normalization: 'all',
      normalizationReadout: 3,
      parsimoniousReadoutFiltering: 'no',
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
      logBase: 'invalid base: 3',
      minConditions: 'should be a number > 0',
      mockConditionAbundance: 'should be a boolean',
      normalization: 'invalid value',
      normalizationReadout: 'invalid value',
      parsimoniousReadoutFiltering: 'should be a boolean',
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
});
