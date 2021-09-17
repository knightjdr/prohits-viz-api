import { parseArray } from './parse-form.js';

describe('Parse objects from a form', () => {
  describe('parse array', () => {
    it('should parse an array', () => {
      const arr = ['a', 'b', 'c'];
      const expected = ['a', 'b', 'c'];
      expect(parseArray(arr)).toEqual(expected);
    });

    it('should parse a stringified array', () => {
      const value = JSON.stringify(['a', 'b', 'c']);
      const expected = ['a', 'b', 'c'];
      expect(parseArray(value)).toEqual(expected);
    });

    it('should return an empty array for an object', () => {
      const value = JSON.stringify({ a: true });
      const expected = [];
      expect(parseArray(value)).toEqual(expected);
    });

    it('should return an empty array for a non-convertible value', () => {
      const value = 'a';
      const expected = [];
      expect(parseArray(value)).toEqual(expected);
    });
  });
});
