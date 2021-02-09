import parseIfJSON from './parse-if-json';

describe('Parse if JSON', () => {
  it('should return json when valid', () => {
    const json = {
      a: 'b',
      c: 'd',
    };
    const jsonString = JSON.stringify(json);
    expect(parseIfJSON(jsonString)).toEqual(json);
  });

  it('should return false for non-exception-throwing cases with JSON.parse ', () => {
    const tests = [
      false,
      1234,
      null,
    ];
    tests.forEach((test) => {
      expect(parseIfJSON(test)).toBeFalsy();
    });
  });

  it('should return false for invalid json string', () => {
    const jsonString = '{"a": "b", "c": "d"';
    expect(parseIfJSON(jsonString)).toBeFalsy();
  });
});
