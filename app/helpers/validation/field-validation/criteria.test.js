import criteria from './criteria';

describe('Validate criteria', () => {
  describe('for booleans', () => {
    it('should validate and return boolean', () => {
      expect(criteria.isBoolean(true, false)).toBeTruthy();
      expect(criteria.isBoolean(false, true)).toBeFalsy();
    });

    it('should return default arg when value is not a boolean', () => {
      expect(criteria.isBoolean(undefined, false)).toBeFalsy();
    });
  });

  describe('for numbers', () => {
    it('should validate and return number', () => {
      expect(criteria.isNumber(Number.MIN_SAFE_INTEGER, 1000)).toBe(Number.MIN_SAFE_INTEGER);
      expect(criteria.isNumber(0, 1000)).toBe(0);
      expect(criteria.isNumber(10, 1000)).toBe(10);
      expect(criteria.isNumber(Number.MAX_SAFE_INTEGER, 1000)).toBe(Number.MAX_SAFE_INTEGER);
    });

    it('should return default arg when value is not a number', () => {
      expect(criteria.isNumber(undefined, 1000)).toBe(1000);
    });
  });

  describe('for strings', () => {
    it('should validate and return string', () => {
      expect(criteria.isString('a', 'b')).toBe('a');
      expect(criteria.isString('aaaaaaaaaaaaa', 'b')).toBe('aaaaaaaaaaaaa');
    });

    it('should return default arg when value is not a string', () => {
      expect(criteria.isString(undefined, 'b')).toBe('b');
    });
  });
});
