import validateColor from './color.js';

describe('Validate image fill and edge colors', () => {
  it('should return default when null', () => {
    expect(validateColor(null, 'blue')).toBe('blue');
  });

  it('should return default when color is not available', () => {
    expect(validateColor('redBlack', 'blue')).toBe('blue');
  });

  it('should return color if it is available', () => {
    expect(validateColor('greyscale', 'blue')).toBe('greyscale');
  });
});
