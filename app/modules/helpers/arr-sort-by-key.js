const DeepCopy = require('./deep-copy');
const Sort = require('./sort');

// sorts an array of objects by an object key
// dir = 'asc' yields sort order A, B, C or 1, 2, 3
// dir = 'des' yields sort order C, B, A or 3, 2, 1
// type = 'string' for character sorting, type = 'numeric' for numeric sorting
const ArrSortByKey = (arr, key, dir = 'asc', type = 'string') => {
  // make sure input variable is an array of objects, and that a key is defined
  // if not, simply return whatever arr is
  if (
    !Array.isArray(arr) ||
    typeof arr[0] !== 'object' ||
    !key
  ) {
    return arr;
  }
  const multiplier = dir === 'des' ? -1 : 1;
  const sortArray = DeepCopy(arr);
  const sortFunc = type === 'numeric' ? Sort.numeric : Sort.character;
  sortArray.sort((a, b) => (
    multiplier * sortFunc(a[key], b[key])
  ));
  return sortArray;
};
module.exports = ArrSortByKey;
