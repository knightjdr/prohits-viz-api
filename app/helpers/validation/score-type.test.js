import scoreType from './score-type';

jest.mock('./parameters', () => ({
  scoreTypes: ['lte', 'gte'],
}));

describe('Validate score type', () => {
  it('should return default when null', () => {
    expect(scoreType(null, 'lte')).toBe('lte');
  });

  it('should return default when score type is not available', () => {
    expect(scoreType('aaa', 'lte')).toBe('lte');
  });

  it('should return score type if it is available', () => {
    expect(scoreType('gte', 'lte')).toBe('gte');
  });
});
