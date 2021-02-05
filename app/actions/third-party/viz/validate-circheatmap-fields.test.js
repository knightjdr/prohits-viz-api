import validateCircHeatmapFields from './validate-circheatmap-fields.js';

describe('Validate scatter fields', () => {
  it('should throw an error when there is no plots property', () => {
    const data = {};

    const expected = new Error('The file must include an array of "plots"');
    expect(() => validateCircHeatmapFields(data)).toThrow(expected);
  });

  it('should throw an error the plots value is not an array', () => {
    const data = {
      plots: {},
    };

    const expected = new Error('The file must include an array of "plots"');
    expect(() => validateCircHeatmapFields(data)).toThrow(expected);
  });

  it('should throw an error when entries have no name property', () => {
    const data = {
      plots: [
        { readouts: [] },
      ],
    };

    const expected = new Error(
      'Each plot should have a "name" and an array of "readouts"',
    );
    expect(() => validateCircHeatmapFields(data)).toThrow(expected);
  });

  it('should throw an error when entries have no readouts property', () => {
    const data = {
      plots: [
        { name: 'plot' },
      ],
    };

    const expected = new Error(
      'Each plot should have a "name" and an array of "readouts"',
    );
    expect(() => validateCircHeatmapFields(data)).toThrow(expected);
  });

  it('should throw an error when readouts is not an array', () => {
    const data = {
      plots: [
        { name: 'plot', readouts: {} },
      ],
    };

    const expected = new Error(
      'Plot "readouts" should be an array with each point having a label and segments',
    );
    expect(() => validateCircHeatmapFields(data)).toThrow(expected);
  });

  it('should throw an error when readouts do not have a label', () => {
    const data = {
      plots: [
        {
          name: 'plot',
          readouts: [{ segments: {} }],
        },
      ],
    };

    const expected = new Error(
      'Plot "readouts" should be an array with each point having a label and segments',
    );
    expect(() => validateCircHeatmapFields(data)).toThrow(expected);
  });

  it('should throw an error when points do not have a segments value', () => {
    const data = {
      plots: [
        {
          name: 'plot',
          readouts: [{ label: 'point' }],
        },
      ],
    };

    const expected = new Error(
      'Plot "readouts" should be an array with each point having a label and segments',
    );
    expect(() => validateCircHeatmapFields(data)).toThrow(expected);
  });

  it('should not throw an error for valid data', () => {
    const data = {
      plots: [
        {
          name: 'plot',
          readouts: [{ label: 'point', segments: {} }],
        },
      ],
    };

    expect(() => validateCircHeatmapFields(data)).not.toThrow();
  });
});
