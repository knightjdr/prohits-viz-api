import validColor from './valid-color';
import validHex from '../../utils/valid-hex';

jest.mock('../../utils/valid-hex');

describe('Valid image color', () => {
  it('should return default when color is not valid', () => {
    validHex.mockReturnValue(false);
    expect(validColor(1, '#000000')).toBe('#000000');
  });

  it('should return color when valid', () => {
    validHex.mockReturnValue(true);
    expect(validColor('#fff', '#000000')).toBe('#fff');
  });
});
