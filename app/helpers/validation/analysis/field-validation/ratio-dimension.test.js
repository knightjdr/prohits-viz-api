import validateRatioDimension from './ratio-dimension.js';

describe('Validate ratio-dimension', () => {
  it('should validate acceptable dimension', () => {
    const expected = [true, 'area'];

    expect(validateRatioDimension('area')).toEqual(expected);
  });

  it('should invalidate unknown dimension', () => {
    const expected = [false, null];

    expect(validateRatioDimension('unknown')).toEqual(expected);
  });
});
