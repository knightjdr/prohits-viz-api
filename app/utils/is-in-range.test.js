import isInRange from './is-in-range';

describe('Is number in range', () => {
  it('should return true for a number in range', () => {
    expect(isInRange(0.5, 0, 1)).toBeTruthy();
  });

  it('should return true for a value in default range', () => {
    expect(isInRange(0.5)).toBeTruthy();
  });

  it('should return false for a number below range', () => {
    expect(isInRange(-0.5, 0, 1)).toBeFalsy();
  });

  it('should return false for a number above range', () => {
    expect(isInRange(1.5, 0, 1)).toBeFalsy();
  });

  it('should return false for a value that is not a number', () => {
    expect(isInRange('a', 0, 1)).toBeFalsy();
  });
});
