const DeepCopy = require('./deep-copy');
const md5 = require('md5');

const testValues = {
  arr: [1, 'a', null],
  obj: { a: 1, b: 'x' },
  arrObj: [
    { a: 1, b: 'x' },
    { a: 1, b: [1, 'a', null] },
  ],
};
const md5Expected = {
  arr: md5(testValues.arr),
  obj: md5(testValues.obj),
  arrObj: md5(testValues.arrObj),
};

describe('deep copy', () => {
  it('should return null when value is nullish', () => {
    expect(DeepCopy(null)).toBeNull();
    expect(DeepCopy('')).toBeNull();
  });

  it('should deep copy an array', () => {
    expect(md5(DeepCopy(testValues.arr))).toBe(md5Expected.arr);
  });

  it('should deep copy an object', () => {
    expect(md5(DeepCopy(testValues.obj))).toBe(md5Expected.obj);
  });

  it('should deep copy an array of objects', () => {
    expect(md5(DeepCopy(testValues.arrObj))).toBe(md5Expected.arrObj);
  });
});
