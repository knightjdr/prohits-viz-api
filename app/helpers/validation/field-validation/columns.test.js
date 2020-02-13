import { validateColumnOrder, validateColumns } from './columns';

describe('Validate column DB', () => {
  const err = new Error('Invalid column DB array');

  it('should return error when falsy', () => {
    const data = undefined;
    expect(() => { validateColumns(data); }).toThrowError(err);
  });

  it('should return error when not an array', () => {
    const data = {};
    expect(() => { validateColumns(data); }).toThrowError(err);
  });

  it('should return error when array is empty', () => {
    const data = [];
    expect(() => { validateColumns(data); }).toThrowError(err);
  });

  it('should return error when array elements are not all strings or numbers', () => {
    const data = ['a', 'b', 2, {}];
    expect(() => { validateColumns(data); }).toThrowError(err);
  });

  it('should array when valid', () => {
    const data = ['a', 'b', 2, 'd'];
    expect(validateColumns(data)).toEqual(data);
  });
});

describe('Validate column order', () => {
  const err = new Error('Invalid column order array');

  it('should return error when falsy', () => {
    const data = undefined;
    expect(() => { validateColumnOrder(data); }).toThrowError(err);
  });

  it('should return error when not an array', () => {
    const data = {};
    expect(() => { validateColumnOrder(data); }).toThrowError(err);
  });

  it('should return error when array is empty', () => {
    const data = [];
    expect(() => { validateColumnOrder(data); }).toThrowError(err);
  });

  it('should return error when array elements are not all numbers', () => {
    const data = ['a', 'b', 2];
    expect(() => { validateColumnOrder(data); }).toThrowError(err);
  });

  it('should array when valid', () => {
    const data = [1, 2, 3];
    expect(validateColumnOrder(data)).toEqual(data);
  });
});
