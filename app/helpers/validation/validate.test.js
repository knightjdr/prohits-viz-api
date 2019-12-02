const validate = require('./validate');

describe('Heatmap validation interface', () => {
  it('should return object with valid data', () => {
    const data = {
      abundanceCap: 20,
      annotations: {
        fontSize: 15,
        list: [
          { text: 'a', x: 0.1, y: 0.2 },
        ],
      },
      columns: ['a', 'b', 'c'],
      edgeColor: 'blueBlack',
      fillColor: 'redBlack',
      invertColor: true,
      markers: {
        color: '#ffffff',
        list: [
          {
            height: 10,
            width: 15,
            x: 5,
            y: 6,
          },
        ],
      },
      minAbundance: 5,
      primaryFilter: 0.01,
      rows: [
        { data: [{ ratio: 0.5, score: 0.01, value: 0.5 }], name: 'a' },
        { data: [{ ratio: 1, score: 0.05, value: 0.8 }], name: 'b' },
      ],
      scoreType: 'lte',
      secondaryFilter: 0.05,
      xLabel: 'x',
      yLabel: 'y',
    };
    const expected = {
      err: undefined,
      data: {
        ...data,
        imageType: 'dotplot',
      },
    };
    expect(validate('dotplot', data)).toEqual(expected);
  });
});
