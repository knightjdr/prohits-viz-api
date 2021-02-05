import validateHeatmapFields from './validate-heatmap-fields.js';

describe('Validate heat map fields', () => {
  it('should throw an error when there is no column database', () => {
    const data = {};

    const expected = new Error('The file must include a "columnDB" array');
    expect(() => validateHeatmapFields(data)).toThrow(expected);
  });

  it('should throw an error the column database is not an array', () => {
    const data = {
      columnDB: {},
    };

    const expected = new Error('The file must include a "columnDB" array');
    expect(() => validateHeatmapFields(data)).toThrow(expected);
  });

  it('should throw an error when there is no row database', () => {
    const data = {
      columnDB: [],
    };

    const expected = new Error('The file must include a "rowDB" array');
    expect(() => validateHeatmapFields(data)).toThrow(expected);
  });

  it('should throw an error the row database is not an array', () => {
    const data = {
      columnDB: [],
      rowDB: {},
    };

    const expected = new Error('The file must include a "rowDB" array');
    expect(() => validateHeatmapFields(data)).toThrow(expected);
  });

  it('should throw an error when there are no row entries', () => {
    const data = {
      columnDB: [],
      rowDB: [],
    };

    const expected = new Error('Each "rowDB" entry should have a "data" and "name" property');
    expect(() => validateHeatmapFields(data)).toThrow(expected);
  });

  it('should throw an error when entries have no data property', () => {
    const data = {
      columnDB: [],
      rowDB: [
        { name: 'test' },
      ],
    };

    const expected = new Error('Each "rowDB" entry should have a "data" and "name" property');
    expect(() => validateHeatmapFields(data)).toThrow(expected);
  });

  it('should throw an error when entries have no name property', () => {
    const data = {
      columnDB: [],
      rowDB: [
        { data: [] },
      ],
    };

    const expected = new Error('Each "rowDB" entry should have a "data" and "name" property');
    expect(() => validateHeatmapFields(data)).toThrow(expected);
  });

  it('should throw an error when the row data is not an array', () => {
    const data = {
      columnDB: [],
      rowDB: [
        { data: {}, name: 'test' },
      ],
    };

    const expected = new Error('The row data should be an array with at least a "value" property');
    expect(() => validateHeatmapFields(data)).toThrow(expected);
  });

  it('should throw an error when the row data does not have a "value" property', () => {
    const data = {
      columnDB: [],
      rowDB: [
        { data: [{}], name: 'test' },
      ],
    };

    const expected = new Error('The row data should be an array with at least a "value" property');
    expect(() => validateHeatmapFields(data)).toThrow(expected);
  });

  it('should not throw an error for valid data', () => {
    const data = {
      columnDB: [],
      rowDB: [
        { data: [{ value: 1 }], name: 'test' },
      ],
    };

    expect(() => validateHeatmapFields(data)).not.toThrow();
  });
});
