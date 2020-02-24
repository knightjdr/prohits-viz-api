import isNumber from '../../../../utils/is-number.js';

/* A row array should be of the form:

dotplots:

rows = [
  {
    data: [{ ratio: 1, score: 0, value: 50 }],
    name: 'name',
  },
];

heatmaps:

rows = [
  {
    data: [{ value: 50 }],
    name: 'name',
  },
];

I only test the first row and data items for performance reasons,
assuming other will conform to the formats used.
*/
export const validateRows = (imageType, rowData) => {
  if (
    rowData?.[0]?.name
    && isNumber(rowData?.[0]?.data?.[0]?.value)
    && (
      imageType === 'heatmap'
      || (
        isNumber(rowData?.[0]?.data?.[0].ratio)
        && isNumber(rowData?.[0]?.data?.[0].score)
      )
    )
  ) {
    return rowData;
  }

  throw new Error('Invalid row DB array');
};

export const validateRowOrder = (data) => {
  if (
    Array.isArray(data)
    && data.length > 0
    && data.every(datum => typeof datum === 'number')
  ) {
    return data;
  }

  throw new Error('Invalid row order array');
};
