import validateMinCondition from './min-conditions.js';

describe('Validate minimum condition', () => {
  it('should validate acceptable number', () => {
    const expected = [true, 1];

    expect(validateMinCondition(1)).toEqual(expected);
  });

  it('should validate number convertable to string', () => {
    const expected = [true, 1];

    expect(validateMinCondition('1')).toEqual(expected);
  });

  it('should invalidate non numeric value', () => {
    const expected = [false, null];

    expect(validateMinCondition(NaN)).toEqual(expected);
  });

  it('should invalidate value less than 1', () => {
    const expected = [false, null];

    expect(validateMinCondition(0)).toEqual(expected);
  });
});
