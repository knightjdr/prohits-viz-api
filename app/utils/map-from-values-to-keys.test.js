import mapFromValuesToKeys from './map-from-values-to-keys';

describe('Map an objects values to keys', () => {
  it('should map values to keys', () => {
    const obj = {
      a: 'x',
      b: 'y',
      c: 'z',
    };
    const expected = {
      x: 'a',
      y: 'b',
      z: 'c',
    };
    expect(mapFromValuesToKeys(obj)).toEqual(expected);
  });
});
