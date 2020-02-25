import validateNormalization, { validateNormalizationSetting } from './normalization.js';

describe('Validate normalization algorithm', () => {
  it('should validate acceptable algorithm', () => {
    const expected = [true, 'total'];

    expect(validateNormalization('total')).toEqual(expected);
  });

  it('should validate missing algorithm', () => {
    const expected = [true, ''];

    expect(validateNormalization('')).toEqual(expected);
  });

  it('should invalidate unknown algorithm', () => {
    const expected = [false, null];

    expect(validateNormalization('unknown')).toEqual(expected);
  });
});

describe('Validate normalization settings', () => {
  it('should validate acceptable settings', () => {
    const errors = {};
    const settings = { normalization: 'readout', normalizationReadout: 'readoutA' };

    const expected = [
      { normalization: 'readout', normalizationReadout: 'readoutA' },
      {},
    ];

    expect(validateNormalizationSetting(settings, errors)).toEqual(expected);
  });

  it('should return error when subtraction requested without column name', () => {
    const errors = {};
    const settings = { normalization: 'readout', normalizationReadout: '' };

    const expected = [
      { normalization: 'readout', normalizationReadout: '' },
      { normalizationReadout: 'missing column name' },
    ];

    expect(validateNormalizationSetting(settings, errors)).toEqual(expected);
  });
});

