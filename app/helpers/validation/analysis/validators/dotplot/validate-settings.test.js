import validateSettings from './validate-settings.js';

describe('Validate correlation settings', () => {
  it('should validate acceptable settings', () => {
    const settings = {
      abundanceCap: 50,
      clustering: 'none',
      conditionClustering: 'none',
      conditionList: 'conditionA, conditionB',
      control: 'ctrlCounts',
      ctrlSub: true,
      minAbundance: 0,
      normalization: 'readout',
      normalizationReadout: 'readoutA',
      readoutClustering: 'none',
      readoutLengthNorm: true,
      readoutLength: 'ReadoutLength',
      readoutList: 'readoutA   readoutB',
      primaryFilter: 0.01,
      scoreType: 'lte',
      secondaryFilter: 0.05,
    };

    const expected = {
      errors: {},
      values: {
        ...settings,
        conditionList: ['conditionA', 'conditionB'],
        readoutList: ['readoutA', 'readoutB'],
      },
    };
    expect(validateSettings(settings)).toEqual(expected);
  });

  it('should invalidate unacceptable settings', () => {
    const settings = {
      abundanceCap: 50,
      clustering: 'none',
      conditionClustering: 'none',
      conditionList: '',
      control: '',
      ctrlSub: true,
      minAbundance: 51,
      normalization: 'readout',
      normalizationReadout: '',
      readoutClustering: 'none',
      readoutLengthNorm: true,
      readoutLength: '',
      readoutList: '',
      primaryFilter: 0.06,
      scoreType: 'lte',
      secondaryFilter: 0.05,
    };

    const expected = {
      errors: {
        abundanceCap: 'should be greater than minimum abundance',
        conditionList: 'missing conditions for ordering',
        control: 'missing column name',
        normalizationReadout: 'missing readout name',
        readoutLength: 'missing column name',
        readoutList: 'missing readouts for ordering',
        secondaryFilter: 'should be greater than or equal to primary filter',
      },
      values: {
        ...settings,
        conditionList: [],
        readoutList: [],
      },
    };
    expect(validateSettings(settings)).toEqual(expected);
  });
});
