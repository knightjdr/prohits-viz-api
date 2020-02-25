import validateReadoutLength from './readout-length.js';

describe('Validate readoutlength settings', () => {
  it('should validate acceptable settings', () => {
    const errors = {};
    const settings = { readoutLengthNorm: true, readoutLength: 'PreyLength' };

    const expected = [
      { readoutLengthNorm: true, readoutLength: 'PreyLength' },
      {},
    ];

    expect(validateReadoutLength(settings, errors)).toEqual(expected);
  });

  it('should unset readoutlength columm name when normalization not requested', () => {
    const errors = {};
    const settings = { readoutLengthNorm: false, readoutLength: 'PreyLength' };

    const expected = [
      { readoutLengthNorm: false, readoutLength: '' },
      {},
    ];

    expect(validateReadoutLength(settings, errors)).toEqual(expected);
  });

  it('should return error when normalization requested without column name', () => {
    const errors = {};
    const settings = { readoutLengthNorm: true, readoutLength: '' };

    const expected = [
      { readoutLengthNorm: true, readoutLength: '' },
      { readoutLength: 'missing column name' },
    ];

    expect(validateReadoutLength(settings, errors)).toEqual(expected);
  });
});
