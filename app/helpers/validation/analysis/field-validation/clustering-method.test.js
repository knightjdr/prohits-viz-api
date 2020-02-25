import validateClusteringMethod from './clustering-method.js';

describe('Validate clustering method', () => {
  it('should validate acceptable method', () => {
    const expected = [true, 'average'];

    expect(validateClusteringMethod('average')).toEqual(expected);
  });

  it('should invalidate unknown method', () => {
    const expected = [false, null];

    expect(validateClusteringMethod('unknown')).toEqual(expected);
  });
});
