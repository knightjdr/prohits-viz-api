import constructJson from './construct-json.js';

describe('Construct JSON for pvsync', () => {
  it('should convert object to required format', () => {
    const data = {
      columnDB: ['a', 'b', 'c'],
      columnOrder: [0, 1, 2],
      imageType: 'dotplot',
      rowDB: [{ data: [{ ratio: 0.5, score: 0.01, value: 1 }], name: 'a' }],
      rowOrder: [0],
      settings: {
        abundanceCap: 50,
        edgeColor: 'red',
        fillColor: 'blue',
        minAbundance: 0,
        primaryFilter: 0.01,
        scoreType: 'lte',
        secondaryFilter: 0.05,
      },
    };

    const expected = {
      columnDB: data.columnDB,
      columnOrder: data.columnOrder,
      imageType: data.imageType,
      rowDB: data.rowDB,
      rowOrder: data.rowOrder,
      settings: {
        abundanceCap: data.abundanceCap,
        edgeColor: data.edgeColor,
        fillColor: data.fillColor,
        minAbundance: data.minAbundance,
        primaryFilter: data.fillColor,
        scoreType: data.fillColor,
        secondaryFilter: data.secondaryFilter,
      },
    };

    expect(constructJson(data)).toEqual(expected);
  });
});
