import validateColumns from './columns';

const err = new Error('Invalid column array');

describe('Validate columns object', () => {
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
