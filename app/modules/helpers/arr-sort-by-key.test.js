const ArrSortByKey = require('./arr-sort-by-key');

const testArrays = {
  mixed: [
    { a: 'd', b: 3 },
    { a: 1, b: 2 },
  ],
  numbersOnly: [
    { a: 3, b: 3 },
    { a: 1, b: 2 },
    { a: 12, b: 2 },
    { b: 3 },
  ],
  stringsOnly: [
    { a: 'd', b: 3 },
    { a: 'a', b: 2 },
    { b: 3 },
  ],
};
const sortedArrays = {
  mixedAsNumbers: {
    asc: [
      { a: 1, b: 2 },
      { a: 'd', b: 3 },
    ],
    des: [
      { a: 'd', b: 3 },
      { a: 1, b: 2 },
    ],
  },
  mixedAsStrings: {
    asc: [
      { a: 1, b: 2 },
      { a: 'd', b: 3 },
    ],
    des: [
      { a: 'd', b: 3 },
      { a: 1, b: 2 },
    ],
  },
  numbersAsCharacters: {
    asc: [
      { a: 1, b: 2 },
      { a: 12, b: 2 },
      { a: 3, b: 3 },
      { b: 3 },
    ],
  },
  numbersOnly: {
    asc: [
      { a: 1, b: 2 },
      { a: 3, b: 3 },
      { a: 12, b: 2 },
      { b: 3 },
    ],
    des: [
      { b: 3 },
      { a: 12, b: 2 },
      { a: 3, b: 3 },
      { a: 1, b: 2 },
    ],
  },
  stringsOnly: {
    asc: [
      { a: 'a', b: 2 },
      { a: 'd', b: 3 },
      { b: 3 },
    ],
    des: [
      { b: 3 },
      { a: 'd', b: 3 },
      { a: 'a', b: 2 },
    ],
  },
};

test('sort array of object by key', () => {
  // return original value when not array
  expect(ArrSortByKey()).toBeUndefined();
  expect(ArrSortByKey('')).toBe('');
  expect(ArrSortByKey(1)).toBe(1);
  expect(ArrSortByKey({ a: 1 })).toEqual({ a: 1 });
  // return original value when key is missing
  expect(ArrSortByKey(testArrays.stringsOnly)).toEqual(testArrays.stringsOnly);
  // return sorted array where key is character
  expect(ArrSortByKey(testArrays.stringsOnly, 'a')).toEqual(sortedArrays.stringsOnly.asc);
  expect(ArrSortByKey(testArrays.stringsOnly, 'a', 'asc')).toEqual(sortedArrays.stringsOnly.asc);
  expect(ArrSortByKey(testArrays.stringsOnly, 'a', 'des')).toEqual(sortedArrays.stringsOnly.des);
  // string sorted as numbers should just return original
  expect(ArrSortByKey(testArrays.stringsOnly, 'a', 'asc', 'numeric')).toEqual(testArrays.stringsOnly);
  // return sorted array where key is numeric
  expect(ArrSortByKey(testArrays.numbersOnly, 'a', 'asc', 'numeric')).toEqual(sortedArrays.numbersOnly.asc);
  expect(ArrSortByKey(testArrays.numbersOnly, 'a', 'des', 'numeric')).toEqual(sortedArrays.numbersOnly.des);
  // numeric sorted as strings should return sorted numerically
  expect(ArrSortByKey(testArrays.numbersOnly, 'a', 'asc', 'string')).toEqual(sortedArrays.numbersAsCharacters.asc);
  // sorting keys with mixed characters and numbers
  expect(ArrSortByKey(testArrays.mixed, 'a', 'asc')).toEqual(sortedArrays.mixedAsStrings.asc);
  expect(ArrSortByKey(testArrays.mixed, 'a', 'des')).toEqual(sortedArrays.mixedAsStrings.des);
  expect(ArrSortByKey(testArrays.mixed, 'a', 'asc', 'numeric')).toEqual(sortedArrays.mixedAsNumbers.asc);
  expect(ArrSortByKey(testArrays.mixed, 'a', 'des', 'numeric')).toEqual(sortedArrays.mixedAsNumbers.des);
});
