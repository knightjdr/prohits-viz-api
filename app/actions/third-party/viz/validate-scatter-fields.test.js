import validateScatterFields from './validate-scatter-fields.js';

describe('Validate scatter fields', () => {
  it('should throw an error when there is no plots property', () => {
    const data = {};

    const expected = new Error('The file must include an array of "plots"');
    expect(() => validateScatterFields(data)).toThrow(expected);
  });

  it('should throw an error the plots value is not an array', () => {
    const data = {
      plots: {},
    };

    const expected = new Error('The file must include an array of "plots"');
    expect(() => validateScatterFields(data)).toThrow(expected);
  });

  it('should throw an error when entries have no labels property', () => {
    const data = {
      plots: [
        { name: 'plot', points: [] },
      ],
    };

    const expected = new Error(
      'Each plot should have a "name", "labels" for the x and y axis and an array of "points"',
    );
    expect(() => validateScatterFields(data)).toThrow(expected);
  });

  it('should throw an error when entries have no name property', () => {
    const data = {
      plots: [
        { labels: {}, points: [] },
      ],
    };

    const expected = new Error(
      'Each plot should have a "name", "labels" for the x and y axis and an array of "points"',
    );
    expect(() => validateScatterFields(data)).toThrow(expected);
  });

  it('should throw an error when entries have no points property', () => {
    const data = {
      plots: [
        { labels: {}, name: 'plot' },
      ],
    };

    const expected = new Error(
      'Each plot should have a "name", "labels" for the x and y axis and an array of "points"',
    );
    expect(() => validateScatterFields(data)).toThrow(expected);
  });

  it('should throw an error when points is not an array', () => {
    const data = {
      plots: [
        { labels: {}, name: 'plot', points: {} },
      ],
    };

    const expected = new Error(
      'Plot "points" should be an array with each point having a label, x and y value',
    );
    expect(() => validateScatterFields(data)).toThrow(expected);
  });

  it('should throw an error when points do not have a label', () => {
    const data = {
      plots: [
        {
          labels: {},
          name: 'plot',
          points: [{ x: 0, y: 0 }],
        },
      ],
    };

    const expected = new Error(
      'Plot "points" should be an array with each point having a label, x and y value',
    );
    expect(() => validateScatterFields(data)).toThrow(expected);
  });

  it('should throw an error when points do not have a x value', () => {
    const data = {
      plots: [
        {
          labels: {},
          name: 'plot',
          points: [{ label: 'point', y: 0 }],
        },
      ],
    };

    const expected = new Error(
      'Plot "points" should be an array with each point having a label, x and y value',
    );
    expect(() => validateScatterFields(data)).toThrow(expected);
  });

  it('should throw an error when points do not have a y value', () => {
    const data = {
      plots: [
        {
          labels: {},
          name: 'plot',
          points: [{ label: 'point', x: 0 }],
        },
      ],
    };

    const expected = new Error(
      'Plot "points" should be an array with each point having a label, x and y value',
    );
    expect(() => validateScatterFields(data)).toThrow(expected);
  });

  it('should not throw an error for valid data', () => {
    const data = {
      plots: [
        {
          labels: {},
          name: 'plot',
          points: [{ label: 'point', x: 0, y: 0 }],
        },
      ],
    };

    expect(() => validateScatterFields(data)).not.toThrow();
  });
});
