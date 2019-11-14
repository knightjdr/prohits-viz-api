const isObject = require('./is-object');

describe('Is the variable an Object', () => {
  it('should return true for valid objects', () => {
    const testValues = [{}];
    testValues.forEach((value) => {
      expect(isObject(value)).toBeTruthy();
    });
  });

  it('should return false for invalid objects', () => {
    const testValues = [null, 1, 'a', [], () => {}];
    testValues.forEach((value) => {
      expect(isObject(value)).toBeFalsy();
    });
  });
});
