import isValidColor from './is-valid-color.js';
import isValidHex from '../../../../utils/is-valid-hex.js';

jest.mock('../../../../utils/is-valid-hex');

describe('Valid image color', () => {
  it('should return default when color is not valid', () => {
    isValidHex.mockReturnValue(false);
    expect(isValidColor(1, '#000000')).toBe('#000000');
  });

  it('should return color when valid', () => {
    isValidHex.mockReturnValue(true);
    expect(isValidColor('#fff', '#000000')).toBe('#fff');
  });
});
