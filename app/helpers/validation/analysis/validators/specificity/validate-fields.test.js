import validateSpecificity from './validate-fields.js';

describe('Validate dotplot analysis fields', () => {
  it('should validate acceptable fields', () => {
    const form = {
      minAbundance: '0',
      minConditions: '1',
      primaryFilter: '0.01',
      specificityMetric: 'fe',
    };

    const expected = {
      minAbundance: 0,
      minConditions: 1,
      primaryFilter: 0.01,
      specificityMetric: 'fe',
    };

    Object.entries(form).forEach(([key, value]) => {
      expect(validateSpecificity(key, value)).toEqual({ value: expected[key] });
    });
  });

  it('should invalidate unacceptable fields', () => {
    const form = {
      minAbundance: 'a',
      minConditions: '0',
      primaryFilter: 'a',
      specificityMetric: 'metric',
    };

    const expected = {
      minAbundance: 'should be a number',
      minConditions: 'should be a number > 0',
      primaryFilter: 'should be a number',
      specificityMetric: 'invalid metric: metric',
    };

    Object.entries(form).forEach(([key, value]) => {
      expect(validateSpecificity(key, value)).toEqual({ error: expected[key] });
    });
  });

  it('should return empty object for unknown field', () => {
    expect(validateSpecificity('unknown', '1')).toEqual({});
  });
});
