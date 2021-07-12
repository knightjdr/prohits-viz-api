/* eslint-disable max-len */
import validateCircHeatmapFields from './validate-circheatmap-fields.js';

describe('Validate scatter fields', () => {
  it('should throw an error when there is no circles property', () => {
    const data = {};

    const expected = new Error('The file must include a "circles" object with the "order" field');
    expect(() => validateCircHeatmapFields(data)).toThrow(expected);
  });

  it('should throw an error when the circles order property is missing', () => {
    const data = {
      circles: {},
    };

    const expected = new Error('The file must include a "circles" object with the "order" field');
    expect(() => validateCircHeatmapFields(data)).toThrow(expected);
  });

  it('should throw an error when the circles order value is not an array', () => {
    const data = {
      circles: {
        order: {},
      },
    };

    const expected = new Error('The "order" should be an array with each point having a color, max, min and attribute name');
    expect(() => validateCircHeatmapFields(data)).toThrow(expected);
  });

  it('should throw an error when the circles order elements are missing the color property', () => {
    const data = {
      circles: {
        order: [
          {},
        ],
      },
    };

    const expected = new Error('The "order" should be an array with each point having a color, max, min and attribute name');
    expect(() => validateCircHeatmapFields(data)).toThrow(expected);
  });

  it('should throw an error when the circles order elements are missing the max property', () => {
    const data = {
      circles: {
        order: [
          { color: '#ff0000' },
        ],
      },
    };

    const expected = new Error('The "order" should be an array with each point having a color, max, min and attribute name');
    expect(() => validateCircHeatmapFields(data)).toThrow(expected);
  });

  it('should throw an error when the circles order elements are missing the min property', () => {
    const data = {
      circles: {
        order: [
          { color: '#ff0000', max: 50 },
        ],
      },
    };

    const expected = new Error('The "order" should be an array with each point having a color, max, min and attribute name');
    expect(() => validateCircHeatmapFields(data)).toThrow(expected);
  });

  it('should throw an error when the circles order elements are missing the attribute property', () => {
    const data = {
      circles: {
        order: [
          { color: '#ff0000', max: 50, min: 0 },
        ],
      },
    };

    const expected = new Error('The "order" should be an array with each point having a color, max, min and attribute name');
    expect(() => validateCircHeatmapFields(data)).toThrow(expected);
  });

  it('should throw an error when there is no plots property', () => {
    const data = {
      circles: {
        order: [
          {
            color: '#ff0000',
            max: 50,
            min: 0,
            attribute: 'metric',
          },
        ],
      },
    };

    const expected = new Error('The file must include an array of "plots"');
    expect(() => validateCircHeatmapFields(data)).toThrow(expected);
  });

  it('should throw an error the plots value is not an array', () => {
    const data = {
      circles: {
        order: [
          {
            color: '#ff0000',
            max: 50,
            min: 0,
            attribute: 'metric',
          },
        ],
      },
      plots: {},
    };

    const expected = new Error('The file must include an array of "plots"');
    expect(() => validateCircHeatmapFields(data)).toThrow(expected);
  });

  it('should throw an error when entries have no name property', () => {
    const data = {
      circles: {
        order: [
          {
            color: '#ff0000',
            max: 50,
            min: 0,
            attribute: 'metric',
          },
        ],
      },
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
      circles: {
        order: [
          {
            color: '#ff0000',
            max: 50,
            min: 0,
            attribute: 'metric',
          },
        ],
      },
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
      circles: {
        order: [
          {
            color: '#ff0000',
            max: 50,
            min: 0,
            attribute: 'metric',
          },
        ],
      },
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
      circles: {
        order: [
          {
            color: '#ff0000',
            max: 50,
            min: 0,
            attribute: 'metric',
          },
        ],
      },
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
      circles: {
        order: [
          {
            color: '#ff0000',
            max: 50,
            min: 0,
            attribute: 'metric',
          },
        ],
      },
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
      circles: {
        order: [
          {
            color: '#ff0000',
            max: 50,
            min: 0,
            attribute: 'metric',
          },
        ],
      },
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
