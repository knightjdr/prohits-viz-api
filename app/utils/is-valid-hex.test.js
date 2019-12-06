import isValidHex from './is-valid-hex';

describe('Valid hex color', () => {
  it('should return true for valid 6 digit hex colors', () => {
    expect(isValidHex('#000000')).toBeTruthy();
    expect(isValidHex('#ff0000')).toBeTruthy();
    expect(isValidHex('#f44336')).toBeTruthy();
    expect(isValidHex('#ffffff')).toBeTruthy();
  });

  it('should return true for valid 3 digit hex colors', () => {
    expect(isValidHex('#000')).toBeTruthy();
    expect(isValidHex('#f00')).toBeTruthy();
    expect(isValidHex('#fff')).toBeTruthy();
  });

  it('should return false for invalid hex colors', () => {
    expect(isValidHex('000000')).toBeFalsy();
    expect(isValidHex('asdfsadfas')).toBeFalsy();
    expect(isValidHex('#f4')).toBeFalsy();
    expect(isValidHex('#fffffff')).toBeFalsy();
  });
});
