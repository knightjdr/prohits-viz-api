import validateHeatmapFields from './validate-heatmap-fields.js';

describe('Validate heat map fields', () => {
  it('should throw an error when there is no column database', async () => {
    const data = {};

    const expected = new Error('The file must include a "columnDB" array');
    await expect(validateHeatmapFields(data)).rejects.toThrow(expected);
  });

  it('should throw an error the column database is not an array', async () => {
    const data = {
      columnDB: {},
    };

    const expected = new Error('The file must include a "columnDB" array');
    await expect(validateHeatmapFields(data)).rejects.toThrow(expected);
  });

  it('should throw an error when there is no row database', async () => {
    const data = {
      columnDB: [],
    };

    const expected = new Error('The file must include a "rowDB" array');
    await expect(validateHeatmapFields(data)).rejects.toThrow(expected);
  });

  it('should throw an error the row database is not an array', async () => {
    const data = {
      columnDB: [],
      rowDB: {},
    };

    const expected = new Error('The file must include a "rowDB" array');
    await expect(validateHeatmapFields(data)).rejects.toThrow(expected);
  });

  it('should throw an error when there are no row entries', async () => {
    const data = {
      columnDB: [],
      rowDB: [],
    };

    const expected = new Error('Each "rowDB" entry should have a "data" and "name" property');
    await expect(validateHeatmapFields(data)).rejects.toThrow(expected);
  });

  it('should throw an error when entries have no data property', async () => {
    const data = {
      columnDB: [],
      rowDB: [
        { name: 'test' },
      ],
    };

    const expected = new Error('Each "rowDB" entry should have a "data" and "name" property');
    await expect(validateHeatmapFields(data)).rejects.toThrow(expected);
  });

  it('should throw an error when entries have no name property', async () => {
    const data = {
      columnDB: [],
      rowDB: [
        { data: [] },
      ],
    };

    const expected = new Error('Each "rowDB" entry should have a "data" and "name" property');
    await expect(validateHeatmapFields(data)).rejects.toThrow(expected);
  });

  it('should throw an error when the row data is not an array', async () => {
    const data = {
      columnDB: [],
      rowDB: [
        { data: {}, name: 'test' },
      ],
    };

    const expected = new Error('The row data should be an array with at least a "value" property');
    await expect(validateHeatmapFields(data)).rejects.toThrow(expected);
  });

  it('should throw an error when the row data does not have a "value" property', async () => {
    const data = {
      columnDB: [],
      rowDB: [
        { data: [{}], name: 'test' },
      ],
    };

    const expected = new Error('The row data should be an array with at least a "value" property');
    await expect(validateHeatmapFields(data)).rejects.toThrow(expected);
  });

  it('should not throw an error for valid data', async () => {
    const data = {
      columnDB: [],
      rowDB: [
        { data: [{ value: 1 }], name: 'test' },
      ],
    };

    await expect(validateHeatmapFields(data)).resolves.toEqual(data);
  });

  describe('Simple request format', () => {
    it('should validate request and return newly formatted', async () => {
      const request = {
        dataFormat: 'format1',
        parameters: {
          imageType: 'heatmap',
          condition: 'bait',
          readout: 'prey',
          abundance: 'abundance',
        },
        data: [
          { bait: 'baitA', prey: 'preyA', abundance: 1 },
          { bait: 'baitA', prey: 'preyB', abundance: 2 },
          { bait: 'baitB', prey: 'preyA', abundance: 3 },
          { bait: 'baitB', prey: 'preyC', abundance: 4 },
        ],
      };

      const expected = {
        columnDB: ['baitA', 'baitB'],
        rowDB: [
          {
            name: 'preyA',
            data: [{ value: 1 }, { value: 3 }],
          },
          {
            name: 'preyB',
            data: [{ value: 2 }, { value: 0 }],
          },
          {
            name: 'preyC',
            data: [{ value: 0 }, { value: 4 }],
          },
        ],
      };

      const actual = await validateHeatmapFields(request);
      expect(actual).toEqual(expected);
    });
  });
});
