/* A markers array should be of the form:

markers = [
  { height: 10, width, 10, x: 5, y: 12 },
];

I only test the first item for performance reasons,
assuming others will conform to the format used for it.
*/
const markers = (data) => {
  if (
    Array.isArray(data) &&
    data[0] &&
    typeof data[0] === 'object' &&
    Object.prototype.hasOwnProperty.call(data[0], 'height') &&
    Number.isInteger(data[0].height) &&
    Object.prototype.hasOwnProperty.call(data[0], 'width') &&
    Number.isInteger(data[0].width) &&
    Object.prototype.hasOwnProperty.call(data[0], 'x') &&
    Number.isInteger(data[0].x) &&
    Object.prototype.hasOwnProperty.call(data[0], 'y') &&
    Number.isInteger(data[0].y)
  ) {
    return data;
  }
  return null;
};

module.exports = markers;
