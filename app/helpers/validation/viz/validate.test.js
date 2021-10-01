import validate from './validate.js';

describe('Dotplot/Heatmap validation interface', () => {
  it('should return valid object', () => {
    const data = {
      abundanceCap: 20,
      abundanceType: 'positive',
      annotations: {
        fontSize: 15,
        list: {
          annotation1: {
            position: { x: 0.1, y: 0.2 },
            text: 'a',
          },
        },
      },
      columnDB: ['a', 'b', 'c'],
      columnOrder: [0, 1, 2],
      edgeColor: 'blue',
      fillColor: 'red',
      invertColor: true,
      markers: {
        color: '#ffffff',
        list: {
          marker1: {
            height: 10,
            width: 15,
            x: 0.5,
            y: 0.2,
          },
        },
      },
      minAbundance: 5,
      primaryFilter: 0.01,
      rowDB: [
        { data: [{ ratio: 0.5, score: 0.01, value: 0.5 }], name: 'a' },
        { data: [{ ratio: 1, score: 0.05, value: 0.8 }], name: 'b' },
      ],
      rowOrder: [0, 1],
      scoreType: 'lte',
      secondaryFilter: 0.05,
      xLabel: 'x',
      yLabel: 'y',
    };

    const expected = {
      ...data,
      abundanceType: 'positive',
      imageType: 'dotplot',
    };
    expect(validate('dotplot', data)).toEqual(expected);
  });
});
