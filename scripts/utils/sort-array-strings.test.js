import SortArrayStrings from './sort-array-strings.js';

const unsorted = ['b', 'A', 'm', 'G'];
const sorted = ['A', 'b', 'G', 'm'];

describe('SortArrayStrings', () => {
  test('Descending', () => {
    SortArrayStrings(unsorted);
    expect(unsorted).toEqual(sorted);
  });
});
