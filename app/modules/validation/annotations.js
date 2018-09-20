/* An annotations object should be of the form:

annotations = [
  { text: 'text, x: 0, y: 0.5 },
];

I only test the first item for performance reasons,
assuming others will conform to the format used for it. Also
x and y should be between 0 and 1 (inclusive) but again,
don't test this for performance.
*/
const annotations = (data) => {
  if (
    Array.isArray(data) &&
    data[0] &&
    typeof data[0] === 'object' &&
    Object.prototype.hasOwnProperty.call(data[0], 'text') &&
    Object.prototype.hasOwnProperty.call(data[0], 'x') &&
    Object.prototype.hasOwnProperty.call(data[0], 'y')
  ) {
    return data;
  }
  return null;
};

module.exports = annotations;
