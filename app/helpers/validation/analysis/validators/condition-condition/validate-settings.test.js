import validateSettings from './validate-settings.js';

describe('Validate condition-condition settings', () => {
  it('should validate acceptable settings', () => {
    const settings = {
      control: 'ctrlCounts',
      ctrlSub: true,
      normalization: 'readout',
      normalizationReadout: 'readoutA',
      readoutLengthNorm: true,
      readoutLength: 'ReadoutLength',
      primaryFilter: 0.01,
      scoreType: 'lte',
      secondaryFilter: 0.05,
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
      primaryFilter: 0.06,
      scoreType: 'lte',
      secondaryFilter: 0.05,
    };

    const expected = {
      errors: {
        control: 'missing column name',
        normalizationReadout: 'missing readout name',
        readoutLength: 'missing column name',
        secondaryFilter: 'should be greater than or equal to primary filter',
      },
      values: {
        ...settings,
      },
    };
    expect(validateSettings(settings)).toEqual(expected);
  });
});
