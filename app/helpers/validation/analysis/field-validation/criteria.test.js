import criteria from './criteria.js';

describe('Validate criteria', () => {
  describe('array', () => {
    it('should validate an array and return stringified form', () => {
      const value = ['a'];
      const expected = [true, '["a"]'];

      expect(criteria.isArray(value)).toEqual(expected);
    });

    it('should validate a stringified array and return actual array', () => {
      const value = '["a"]';
      const expected = [true, ['a']];

      expect(criteria.isArray(value)).toEqual(expected);
    });

    it('should invalidate other values', () => {
      const expected = [false, null];

      expect(criteria.isBoolean('a')).toEqual(expected);
      expect(criteria.isBoolean({})).toEqual(expected);
    });
  });

  describe('booleans', () => {
    it('should validate truthy values', () => {
      const expected = [true, true];

      expect(criteria.isBoolean(true)).toEqual(expected);
      expect(criteria.isBoolean('true')).toEqual(expected);
    });

    it('should validate falsy values', () => {
      const expected = [true, false];

      expect(criteria.isBoolean(false)).toEqual(expected);
      expect(criteria.isBoolean('false')).toEqual(expected);
    });

    it('should invalidate other values', () => {
      const expected = [false, null];

      expect(criteria.isBoolean('a')).toEqual(expected);
      expect(criteria.isBoolean(1)).toEqual(expected);
    });
  });

  describe('numbers', () => {
    it('should validate typeof number', () => {
      const expected = [true, 1];

      expect(criteria.isNumber(1)).toEqual(expected);
    });

    it('should validate string that converts to number', () => {
      const expected = [true, 1];

      expect(criteria.isNumber('1')).toEqual(expected);
    });

    it('should invalidate other values', () => {
      const expected = [false, null];

      expect(criteria.isNumber('a')).toEqual(expected);
    });
  });

  describe('string', () => {
    it('should validate string', () => {
      const expected = [true, 'a'];

      expect(criteria.isString('a')).toEqual(expected);
    });

    it('should validate empty string', () => {
      const expected = [true, ''];

      expect(criteria.isString('')).toEqual(expected);
    });

    it('should invalidate other values', () => {
      const expected = [false, null];

      expect(criteria.isString(1)).toEqual(expected);
    });
  });

  describe('required string', () => {
    it('should validate string', () => {
      const expected = [true, 'a'];

      expect(criteria.requiredString('a')).toEqual(expected);
    });

    it('should invalidate empty string', () => {
      const expected = [false, null];

      expect(criteria.requiredString('')).toEqual(expected);
    });

    it('should invalidate other values', () => {
      const expected = [false, null];

      expect(criteria.requiredString(1)).toEqual(expected);
    });
  });
});
