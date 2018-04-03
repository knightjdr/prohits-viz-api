const Sort = require('./sort');

test('sorting characters', () => {
  expect(Sort.character('a', 'b')).toBe(-1);
  expect(Sort.character('b', 'a')).toBe(1);
  expect(Sort.character('a', 'a')).toBe(0);
  expect(Sort.character('a', null)).toBe(-1);
  expect(Sort.character(null, 'a')).toBe(1);
  expect(Sort.character(null, null)).toBe(0);
  expect(Sort.character(1, 'a')).toBe(-1);
  expect(Sort.character('a', 1)).toBe(1);
  expect(Sort.character(1, 2)).toBe(-1);
  expect(Sort.character(2, 12)).toBe(1);
});

test('sorting numbers', () => {
  expect(Sort.numeric(1, 2)).toBe(-1);
  expect(Sort.numeric(2, 1)).toBe(1);
  expect(Sort.numeric(1, 1)).toBe(0);
  expect(Sort.numeric(1, null)).toBe(-1);
  expect(Sort.numeric(null, 1)).toBe(1);
  expect(Sort.numeric(null, null)).toBe(0);
  expect(Sort.numeric(1, 'a')).toBe(-1);
  expect(Sort.numeric('a', 1)).toBe(1);
  expect(Sort.numeric('a', 'b')).toBe(0);
});
