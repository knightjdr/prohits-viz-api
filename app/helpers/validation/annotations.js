const criteria = require('./criteria');

const defaults = {
  fontSize: 12,
};

/* An annotations object should be of the form:

annotations = {
  fontSize: 12,
  list: [
    { text: 'text, x: 0, y: 0.5 },
  ],
},;

I only test the first item for performance reasons,
assuming others will conform to the format used for it. Also
x and y should be between 0 and 1 (inclusive) but again,
don't test this for performance.
*/
const annotations = (data) => {
  if (
    data &&
    typeof data === 'object' &&
    Object.prototype.hasOwnProperty.call(data, 'list') &&
    Array.isArray(data.list) &&
    data.list[0] &&
    typeof data.list[0] === 'object' &&
    Object.prototype.hasOwnProperty.call(data.list[0], 'text') &&
    Object.prototype.hasOwnProperty.call(data.list[0], 'x') &&
    Object.prototype.hasOwnProperty.call(data.list[0], 'y')
  ) {
    return {
      fontSize: criteria.isNumber(data.fontSize, defaults.fontSize),
      list: data.list,
    };
  }
  return null;
};

module.exports = annotations;
