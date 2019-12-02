/* A row array should be of the form:

dotplots:

rows = [
  {
    data: [
      { ratio: 1, score: 0, value: 50 },
    ],
    name: 'name',
  },
];

heatmaps:

rows = [
  {
    data: [
      { value: 50 },
    ],
    name: 'name',
  },
];

I only test the first row and data items for performance reasons,
assuming other will conform to the formats used.
*/
const rows = (imageType, rowData) => {
  if (
    rowData &&
    Array.isArray(rowData) &&
    rowData.length > 0 &&
    rowData[0] && // Ensures not null as null is an object.
    typeof rowData[0] === 'object' &&
    Object.prototype.hasOwnProperty.call(rowData[0], 'name') &&
    typeof rowData[0].name === 'string' &&
    Object.prototype.hasOwnProperty.call(rowData[0], 'data') &&
    Array.isArray(rowData[0].data) &&
    rowData[0].data[0] &&
    typeof rowData[0].data[0] === 'object' &&
    Object.prototype.hasOwnProperty.call(rowData[0].data[0], 'value') &&
    (
      imageType === 'heatmap' ||
      (
        Object.prototype.hasOwnProperty.call(rowData[0].data[0], 'ratio') &&
        Object.prototype.hasOwnProperty.call(rowData[0].data[0], 'score')
      )
    )
  ) {
    return rowData;
  }
  return new Error('Invalid row array');
};

module.exports = rows;
