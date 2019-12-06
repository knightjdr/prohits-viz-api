import * as validate from './validate-type';

describe('Validate array', () => {
  it('should return a valid array', () => {
    expect(validate.validateArray(['a'])).toEqual(['a']);
  });

  it('should return default for an invalid array', () => {
    expect(validate.validateArray({})).toEqual([]);
  });

  it('should return argument default for an invalid array', () => {
    expect(validate.validateArray({}, ['default'])).toEqual(['default']);
  });
});

describe('Validate boolean', () => {
  it('should return a valid boolean', () => {
    expect(validate.validateBoolean(true)).toBeTruthy();
  });

  it('should return default for an invalid boolean', () => {
    expect(validate.validateBoolean('true')).toBeFalsy();
  });

  it('should return argument default for an invalid boolean', () => {
    expect(validate.validateBoolean('true', true)).toBeTruthy();
  });
});

describe('Validate number', () => {
  it('should return a valid number', () => {
    expect(validate.validateNumber(1)).toBe(1);
  });

  it('should return default for an invalid number', () => {
    expect(validate.validateNumber('1')).toBe(0);
  });

  it('should return argument default for an invalid number', () => {
    expect(validate.validateNumber('1', 2)).toBe(2);
  });
});

describe('Validate object', () => {
  it('should return a valid object', () => {
    expect(validate.validateObject({ a: 1 })).toEqual({ a: 1 });
  });

  it('should return default for an invalid object', () => {
    expect(validate.validateObject([])).toEqual({});
  });

  it('should return argument default for an invalid object', () => {
    expect(validate.validateObject([], { test: 'a' })).toEqual({ test: 'a' });
  });
});

describe('Validate string', () => {
  it('should return a valid string', () => {
    expect(validate.validateString('test')).toBe('test');
  });

  it('should return default for an invalid string', () => {
    expect(validate.validateString(1)).toBe('');
  });

  it('should return argument default for an invalid string', () => {
    expect(validate.validateString(1, 'default')).toBe('default');
  });
});
