import validateCC from './validate-fields.js';

describe('Validate condition-condition analysis fields', () => {
  it('should validate acceptable fields', () => {
    const form = {
      conditionX: 'baitX',
      conditionY: 'baitY',
      minAbundance: '0',
      primaryFilter: '0.01',
      secondaryFilter: '0.05',
    };

    const expected = {
      conditionX: 'baitX',
      conditionY: 'baitY',
      minAbundance: 0,
      primaryFilter: 0.01,
      secondaryFilter: 0.05,
    };

    Object.entries(form).forEach(([key, value]) => {
      expect(validateCC(key, value)).toEqual({ value: expected[key] });
    });
  });

  it('should invalidate unacceptable fields', () => {
    const form = {
      conditionX: 1,
      conditionY: 2,
      minAbundance: 'a',
      primaryFilter: 'a',
      secondaryFilter: 'a',
    };

    const expected = {
      conditionX: 'missing condition name',
      conditionY: 'missing condition name',
      minAbundance: 'should be a number',
      primaryFilter: 'should be a number',
      secondaryFilter: 'should be a number',
    };

    Object.entries(form).forEach(([key, value]) => {
      expect(validateCC(key, value)).toEqual({ error: expected[key] });
    });
  });

  it('should return empty object for unknown field', () => {
    expect(validateCC('unknown', '1')).toEqual({});
  });
});
