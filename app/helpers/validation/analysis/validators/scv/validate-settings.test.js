import validateSettings from './validate-settings.js';

describe('Validate specificity settings', () => {
  it('should validate acceptable settings', () => {
    const settings = {
      control: 'ctrlCounts',
      ctrlSub: true,
      normalization: 'readout',
      normalizationReadout: 'readoutA',
      readoutLengthNorm: true,
      readoutLength: 'ReadoutLength',
    };

    const expected = {
      errors: {},
      values: {
        ...settings,
      },
    };
    expect(validateSettings(settings)).toEqual(expected);
  });

  it('should invalidate unacceptable settings', () => {
    const settings = {
      control: '',
      ctrlSub: true,
      normalization: 'readout',
      normalizationReadout: '',
      readoutLengthNorm: true,
      readoutLength: '',
    };

    const expected = {
      errors: {
        control: 'missing column name',
        normalizationReadout: 'missing readout name',
        readoutLength: 'missing column name',
      },
      values: {
        ...settings,
      },
    };
    expect(validateSettings(settings)).toEqual(expected);
  });
});
