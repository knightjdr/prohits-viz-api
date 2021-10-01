import validateAbundanceType from './abundance-type.js';

describe('Validate abundance type', () => {
  it('should return default when null', () => {
    expect(validateAbundanceType(null, 'positive')).toBe('positive');
  });

  it('should return default when input type is not available', () => {
    expect(validateAbundanceType('both', 'positive')).toBe('positive');
  });

  it('should return input type if it is valid', () => {
    expect(validateAbundanceType('negative', 'positive')).toBe('negative');
  });
});
