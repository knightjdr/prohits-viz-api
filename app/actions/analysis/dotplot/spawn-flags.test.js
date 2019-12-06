import flags from './spawn-flags';

const obj = {
  flag1: 'a',
  flag2: 1,
  flag3: 'true',
  flag4: '',
};

describe('Child process flags', () => {
  let result;

  beforeAll(() => {
    result = flags(obj);
  });

  it('should convert object to array of flags', () => {
    const expectedArr = [
      '-flag1',
      'a',
      '-flag2',
      1,
      '-flag3',
    ];
    expect(result).toEqual(expectedArr);
  });

  it('should not include the value for true boolean props', () => {
    const index = result.indexOf('-flag3');
    expect(result[index + 1]).not.toBe('true');
  });

  it('should not include null value flags', () => {
    expect(result.includes('-flag')).toBeFalsy();
  });
});
