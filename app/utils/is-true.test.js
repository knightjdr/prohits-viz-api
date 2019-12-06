import isTrue from './is-true';

describe('isTrue', () => {
  it('should return true for "true"', () => {
    expect(isTrue('true')).toBeTruthy();
  });

  it('should return true for true', () => {
    expect(isTrue(true)).toBeTruthy();
  });

  it('should return false for "false"', () => {
    expect(isTrue('false')).toBeFalsy();
  });

  it('should return false for false', () => {
    expect(isTrue(false)).toBeFalsy();
  });
});
