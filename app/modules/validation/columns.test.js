const columns = require('./columns');

const err = new Error('Invalid column array');

describe('Validate columns object', () => {
  it('should return error when falsy', () => {
    const data = undefined;
    expect(columns(data)).toEqual(err);
  });

  it('should return error when not an array', () => {
    const data = {};
    expect(columns(data)).toEqual(err);
  });

  it('should return error when array is empty', () => {
    const data = [];
    expect(columns(data)).toEqual(err);
  });

  it('should return error when array elements are not all strings', () => {
    const data = ['a', 'b', 2, 'd'];
    expect(columns(data)).toEqual(err);
  });

  it('should array when valid', () => {
    const data = ['a', 'b', 'c', 'd'];
    expect(columns(data)).toEqual(data);
  });
});
