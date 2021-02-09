import validateAbundanceFilters from './abundance-filters.js';

describe('Validate abundance settings', () => {
  it('should validate acceptable settings', () => {
    const errors = {};
    const settings = { abundanceCap: 50, minAbundance: 0 };

    const expected = [
      { abundanceCap: 50, minAbundance: 0 },
      {},
    ];

    expect(validateAbundanceFilters(settings, errors)).toEqual(expected);
  });

  it('should return error when cap is less than min', () => {
    const errors = {};
    const settings = { abundanceCap: 50, minAbundance: 51 };

    const expected = [
      { abundanceCap: 50, minAbundance: 51 },
      { abundanceCap: 'should be greater than minimum abundance' },
    ];

    expect(validateAbundanceFilters(settings, errors)).toEqual(expected);
  });
});
