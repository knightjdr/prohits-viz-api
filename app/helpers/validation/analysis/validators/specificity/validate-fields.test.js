import validateSpecificity from './validate-fields.js';

describe('Validate scv analysis fields', () => {
  it('should validate acceptable fields', () => {
    const form = {
      minAbundance: '0',
      primaryFilter: '0.01',
      specificityMetric: 'fe',
    };

    const expected = {
      minAbundance: 0,
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
      primaryFilter: 'a',
      specificityMetric: 'metric',
    };

    const expected = {
      minAbundance: 'should be a number',
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
