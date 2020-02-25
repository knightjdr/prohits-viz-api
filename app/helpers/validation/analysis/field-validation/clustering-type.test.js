import validateClusteringType, { validateConditionClustering, validateReadoutClustering } from './clustering-type.js';

describe('Validate clustering type', () => {
  it('should validate acceptable type', () => {
    const expected = [true, 'hierarchical'];

    expect(validateClusteringType('hierarchical')).toEqual(expected);
  });

  it('should invalidate unknown type', () => {
    const expected = [false, null];

    expect(validateClusteringType('unknown')).toEqual(expected);
  });
});

describe('Validate condition clustering type', () => {
  it('should validate acceptable type', () => {
    const expected = [true, 'conditions'];

    expect(validateConditionClustering('conditions')).toEqual(expected);
  });

  it('should validate empty string', () => {
    const expected = [true, ''];

    expect(validateConditionClustering('')).toEqual(expected);
  });

  it('should invalidate unknown type', () => {
    const expected = [false, null];

    expect(validateConditionClustering('unknown')).toEqual(expected);
  });
});

describe('Validate readout clustering type', () => {
  it('should validate acceptable type', () => {
    const expected = [true, 'readouts'];

    expect(validateReadoutClustering('readouts')).toEqual(expected);
  });

  it('should validate empty string', () => {
    const expected = [true, ''];

    expect(validateConditionClustering('')).toEqual(expected);
  });

  it('should invalidate unknown type', () => {
    const expected = [false, null];

    expect(validateReadoutClustering('unknown')).toEqual(expected);
  });
});
