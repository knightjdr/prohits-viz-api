import validateScoreType from './score-type';

jest.mock('../default-values', () => ({
  scoreTypes: ['lte', 'gte'],
}));

describe('Validate score type', () => {
  it('should return default when null', () => {
    expect(validateScoreType(null, 'lte')).toBe('lte');
  });

  it('should return default when score type is not available', () => {
    expect(validateScoreType('aaa', 'lte')).toBe('lte');
  });

  it('should return score type if it is available', () => {
    expect(validateScoreType('gte', 'lte')).toBe('gte');
  });
});
