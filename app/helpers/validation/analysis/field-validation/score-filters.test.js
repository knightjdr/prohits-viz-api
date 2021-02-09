import validateScoreFilters from './score-filters.js';

describe('Validate score settings', () => {
  describe('gte', () => {
    it('should validate acceptable settings', () => {
      const errors = {};
      const settings = { primaryFilter: 0.05, scoreType: 'gte', secondaryFilter: 0 };

      const expected = [
        { primaryFilter: 0.05, scoreType: 'gte', secondaryFilter: 0 },
        {},
      ];

      expect(validateScoreFilters(settings, errors)).toEqual(expected);
    });

    it('should return error when secondary filter is less than primary', () => {
      const errors = {};
      const settings = { primaryFilter: 0.01, scoreType: 'gte', secondaryFilter: 0.02 };

      const expected = [
        { primaryFilter: 0.01, scoreType: 'gte', secondaryFilter: 0.02 },
        { secondaryFilter: 'should be less than or equal to primary filter' },
      ];

      expect(validateScoreFilters(settings, errors)).toEqual(expected);
    });
  });

  describe('lte', () => {
    it('should validate acceptable settings', () => {
      const errors = {};
      const settings = { primaryFilter: 0.01, scoreType: 'lte', secondaryFilter: 0.05 };

      const expected = [
        { primaryFilter: 0.01, scoreType: 'lte', secondaryFilter: 0.05 },
        {},
      ];

      expect(validateScoreFilters(settings, errors)).toEqual(expected);
    });

    it('should return error when secondary filter is less than primary', () => {
      const errors = {};
      const settings = { primaryFilter: 0.01, scoreType: 'lte', secondaryFilter: 0 };

      const expected = [
        { primaryFilter: 0.01, scoreType: 'lte', secondaryFilter: 0 },
        { secondaryFilter: 'should be greater than or equal to primary filter' },
      ];

      expect(validateScoreFilters(settings, errors)).toEqual(expected);
    });
  });
});
