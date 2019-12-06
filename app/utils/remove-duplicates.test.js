import removeDuplicates from './remove-duplicates';

describe('Remove array duplicates', () => {
  it('should return an array of unique items', () => {
    const tests = [
      {
        test: [],
        expect: [],
      },
      {
        test: [1, 1, 2, 'a', 'b', 'a'],
        expect: [1, 2, 'a', 'b'],
      },
      {
        test: [2, 1, 3],
        expect: [2, 1, 3],
      },
    ];
    tests.forEach((test) => {
      expect(removeDuplicates(test.test)).toEqual(test.expect);
    });
  });
});
