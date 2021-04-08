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
    it('should validate heatmap request and return newly formatted data', async () => {
      const request = {
        dataFormat: 'format1',
        parameters: {
          imageType: 'heatmap',
          abundance: 'abundance',
          condition: 'bait',
          readout: 'prey',
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

    it('should validate dotplot request and return newly formatted data', async () => {
      const request = {
        dataFormat: 'format1',
        parameters: {
          imageType: 'dotplot',
          abundance: 'abundance',
          condition: 'condition',
          ratio: 'ratio',
          readout: 'readout',
          score: 'score',
          scoreType: 'lte',
        },
        data: [
          {
            condition: 'baitA', readout: 'preyA', abundance: 17, score: 0.05, ratio: 0.68,
          },
          {
            condition: 'baitA', readout: 'preyB', abundance: 13, score: 0.01, ratio: 1,
          },
          {
            condition: 'baitB', readout: 'preyA', abundance: 25, score: 0.01, ratio: 1,
          },
          {
            condition: 'baitB', readout: 'preyC', abundance: 73, score: 0.01, ratio: 1,
          },
        ],
      };

      const expected = {
        columnDB: ['baitA', 'baitB'],
        settings: {
          imageType: 'dotplot',
        },
        rowDB: [
          {
            name: 'preyA',
            data: [
              { value: 17, score: 0.05, ratio: 0.68 },
              { value: 25, score: 0.01, ratio: 1 },
            ],
          },
          {
            name: 'preyB',
            data: [
              { value: 13, score: 0.01, ratio: 1 },
              { value: 0, score: 0.05, ratio: 0 },
            ],
          },
          {
            name: 'preyC',
            data: [
              { value: 0, score: 0.05, ratio: 0 },
              { value: 73, score: 0.01, ratio: 1 },
            ],
          },
        ],
      };

      const actual = await validateHeatmapFields(request);
      expect(actual).toEqual(expected);
    });
  });
});
