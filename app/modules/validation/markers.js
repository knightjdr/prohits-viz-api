const validColor = require('./valid-color');

const defaults = {
  color: '#000000',
};

/* A markers array should be of the form:

markers = [
  { height: 10, width, 10, x: 5, y: 12 },
];

I only test the first item for performance reasons,
assuming others will conform to the format used for it.
*/
const markers = (data) => {
  if (
    data &&
    typeof data === 'object' &&
    Object.prototype.hasOwnProperty.call(data, 'list') &&
    Array.isArray(data.list) &&
    data.list[0] &&
    typeof data.list[0] === 'object' &&
    Object.prototype.hasOwnProperty.call(data.list[0], 'height') &&
    Number.isInteger(data.list[0].height) &&
    Object.prototype.hasOwnProperty.call(data.list[0], 'width') &&
    Number.isInteger(data.list[0].width) &&
    Object.prototype.hasOwnProperty.call(data.list[0], 'x') &&
    Number.isInteger(data.list[0].x) &&
    Object.prototype.hasOwnProperty.call(data.list[0], 'y') &&
    Number.isInteger(data.list[0].y)
  ) {
    return {
      color: validColor(data.color, defaults.color),
      list: data.list,
    };
  }
  return null;
};

module.exports = markers;
