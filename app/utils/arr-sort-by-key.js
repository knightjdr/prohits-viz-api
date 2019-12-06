import deepCopy from './deep-copy.js';
import customSort from './sort.js';

const validateArguments = (arr, key) => (
  Array.isArray(arr) &&
  typeof arr[0] === 'object' &&
  key
);

// Sorts an array of objects by a key.
// dir = 'asc' yields sort order A, B, C or 1, 2, 3.
// dir = 'des' yields sort order C, B, A or 3, 2, 1.
// type = 'string' for character sorting, type = 'numeric' for numeric sorting.
const arrSortByKey = (arr, key, dir = 'asc', type = 'string') => {
  if (!validateArguments(arr, key)) {
    return arr;
  }

  const multiplier = dir === 'des' ? -1 : 1;
  const sortArray = deepCopy(arr);
  const sortFunc = type === 'numeric' ? customSort.numeric : customSort.character;
  sortArray.sort((a, b) => (
    multiplier * sortFunc(a[key], b[key])
  ));
  return sortArray;
};

export default arrSortByKey;
