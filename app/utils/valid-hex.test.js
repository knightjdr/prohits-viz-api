import validHex from './valid-hex';

describe('Valid hex color', () => {
  it('should return true for valid 6 digit hex colors', () => {
    expect(validHex('#000000')).toBeTruthy();
    expect(validHex('#ff0000')).toBeTruthy();
    expect(validHex('#f44336')).toBeTruthy();
    expect(validHex('#ffffff')).toBeTruthy();
  });

  it('should return true for valid 3 digit hex colors', () => {
    expect(validHex('#000')).toBeTruthy();
    expect(validHex('#f00')).toBeTruthy();
    expect(validHex('#fff')).toBeTruthy();
  });

  it('should return false for invalid hex colors', () => {
    expect(validHex('000000')).toBeFalsy();
    expect(validHex('asdfsadfas')).toBeFalsy();
    expect(validHex('#f4')).toBeFalsy();
    expect(validHex('#fffffff')).toBeFalsy();
  });
});
