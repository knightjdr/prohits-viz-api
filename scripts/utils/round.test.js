import Round from './round.js';

describe('Round', () => {
  test('rounds to specified decimal', () => {
    expect(Round(2.56341, 1)).toBe(2.6);
    expect(Round(2.56341, 2)).toBe(2.56);
    expect(Round(2.56341, 3)).toBe(2.563);
  });

  test('rounds to whole number when their is no precision arg', () => {
    expect(Round(2.56341)).toBe(3);
  });
});
