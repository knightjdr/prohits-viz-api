import constructJson from './construct-json.js';

describe('Construct JSON for pvsync', () => {
  it('should convert object to required format', () => {
    const data = {
      annotations: {
        fontSize: 14,
        list: {
          id1: {
            text: 'a',
            position: { x: 0.1, y: 0.2 },
          },
        },
      },
      columnDB: ['a', 'b', 'c'],
      columnOrder: [0, 1, 2],
      imageType: 'dotplot',
      markers: {
        list: {
          id1: {
            height: 10,
            width: 15,
            x: 0.5,
            y: 0.2,
          },
        },
      },
      rowDB: [{ data: [{ ratio: 0.5, score: 0.01, value: 1 }], name: 'a' }],
      rowOrder: [0],
      abundanceCap: 50,
      edgeColor: 'red',
      fillColor: 'blue',
      minAbundance: 0,
      primaryFilter: 0.01,
      scoreType: 'lte',
      secondaryFilter: 0.05,
    };

    const expected = {
      annotations: data.annotations,
      columnDB: data.columnDB,
      columnOrder: data.columnOrder,
      imageType: data.imageType,
      markers: data.markers,
      rowDB: data.rowDB,
      rowOrder: data.rowOrder,
      settings: {
        abundanceCap: data.abundanceCap,
        edgeColor: data.edgeColor,
        fillColor: data.fillColor,
        minAbundance: data.minAbundance,
        primaryFilter: data.primaryFilter,
        scoreType: data.scoreType,
        secondaryFilter: data.secondaryFilter,
      },
    };

    expect(constructJson(data)).toEqual(expected);
  });
});
