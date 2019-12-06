import md5 from 'md5';

import deepCopy from './deep-copy';

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
    expect(deepCopy(null)).toBeNull();
    expect(deepCopy('')).toBeNull();
  });

  it('should deep copy an array', () => {
    expect(md5(deepCopy(testValues.arr))).toBe(md5Expected.arr);
  });

  it('should deep copy an object', () => {
    expect(md5(deepCopy(testValues.obj))).toBe(md5Expected.obj);
  });

  it('should deep copy an array of objects', () => {
    expect(md5(deepCopy(testValues.arrObj))).toBe(md5Expected.arrObj);
  });
});
