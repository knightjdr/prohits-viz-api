jest.mock('./parameters', () => ({
  colorSchemes: ['blueBlack', 'greyScale'],
}));

const color = require('./color');

describe('Validate image fill and edge colors', () => {
  it('should return default when null', () => {
    expect(color(null, 'blueBlack')).toBe('blueBlack');
  });

  it('should return default when color is not available', () => {
    expect(color('redBlack', 'blueBlack')).toBe('blueBlack');
  });

  it('should return color if it is available', () => {
    expect(color('greyScale', 'blueBlack')).toBe('greyScale');
  });
});
