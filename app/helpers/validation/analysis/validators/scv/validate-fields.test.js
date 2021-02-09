import validateSCV from './validate-fields.js';

describe('Validate scv analysis fields', () => {
  it('should validate acceptable fields', () => {
    const form = {
      abundanceCap: '50',
      abundanceFilterColumn: '',
      conditionIDType: 'symbol',
      conditionMapColumn: '',
      known: 'interaction',
      minAbundance: '0',
      primaryFilter: '0.01',
      proteinTissues: [],
      readoutIDType: 'entrez',
      readoutMapColumn: '',
      rnaTissues: [],
      specificity: 'true',
      verticalHeatmap: 'false',
    };

    const expected = {
      abundanceCap: 50,
      abundanceFilterColumn: '',
      conditionIDType: 'symbol',
      conditionMapColumn: '',
      known: 'interaction',
      minAbundance: 0,
      primaryFilter: 0.01,
      proteinTissues: '[]',
      readoutIDType: 'entrez',
      readoutMapColumn: '',
      rnaTissues: '[]',
      specificity: true,
      verticalHeatmap: false,
    };

    Object.entries(form).forEach(([key, value]) => {
      expect(validateSCV(key, value)).toEqual({ value: expected[key] });
    });
  });

  it('should invalidate unacceptable fields', () => {
    const form = {
      abundanceCap: 'a',
      abundanceFilterColumn: 1,
      conditionIDType: 'gi',
      conditionMapColumn: 0,
      known: 'someMetric',
      minAbundance: 'a',
      primaryFilter: 'a',
      proteinTissues: 'tissue',
      readoutIDType: 'gi',
      readoutMapColumn: 1,
      rnaTissues: 'tissue',
      specificity: 'yes',
      verticalHeatmap: 'no',
    };

    const expected = {
      abundanceCap: 'should be a number',
      abundanceFilterColumn: 'should be a string',
      conditionIDType: 'invalid ID type: gi',
      conditionMapColumn: 'should be a string',
      known: 'invalid metric: someMetric',
      minAbundance: 'should be a number',
      primaryFilter: 'should be a number',
      proteinTissues: 'should be an array',
      readoutIDType: 'invalid ID type: gi',
      readoutMapColumn: 'should be a string',
      rnaTissues: 'should be an array',
      specificity: 'should be a boolean',
      verticalHeatmap: 'should be a boolean',
    };

    Object.entries(form).forEach(([key, value]) => {
      expect(validateSCV(key, value)).toEqual({ error: expected[key] });
    });
  });

  it('should return empty object for unknown field', () => {
    expect(validateSCV('unknown', '1')).toEqual({});
  });
});
