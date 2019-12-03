const isJson = require('./is-json');

describe('IsJson', () => {
  it('should return json for valid json string', () => {
    const jsonString = '{"a": "b", "c": "d"}';

    const expected = {
      a: 'b',
      c: 'd',
    };
    expect(isJson(jsonString)).toEqual(expected);
  });

  it('should return false for non-exception-throwing cases with JSON.parse ', () => {
    const tests = [false, 1234, null];
    tests.forEach((test) => {
      expect(isJson(test)).toBeFalsy();
    });
  });

  it('should reutrn false for invalid json string', () => {
    const jsonString = '{"a": "b", "c": "d"';
    expect(isJson(jsonString)).toBeFalsy();
  });

  it('should not parse json object', () => {
    const json = {
      a: 'b',
      c: 'd',
    };
    expect(isJson(json, false)).toEqual(json);
  });
});
