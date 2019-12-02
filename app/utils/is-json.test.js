const isJson = require('./is-json');

describe('IsJson', () => {
  it('should return json for valid json', () => {
    const json = {
      a: 'b',
      c: 'd',
    };
    const jsonString = '{"a": "b", "c": "d"}';
    expect(isJson(jsonString)).toEqual(json);
  });

  it('should return false for non-exception-throwing cases with JSON.parse ', () => {
    expect(isJson(false)).toBeFalsy();
    expect(isJson(1234)).toBeFalsy();
    expect(isJson(null)).toBeFalsy();
  });

  it('should reutrn false for invalid json string', () => {
    const jsonString = '{"a": "b", "c": "d"';
    expect(isJson(jsonString)).toBeFalsy();
  });

  it('should not parse json', () => {
    const json = {
      a: 'b',
      c: 'd',
    };
    expect(isJson(json, false)).toEqual(json);
  });
});
