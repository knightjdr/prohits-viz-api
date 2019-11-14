const removeDuplicates = require('../../../helpers/remove-duplicates');

const reQuotes = new RegExp(/['"]+/g);
const reSeparator = new RegExp(/[\s,]+/);

const parseBackground = (text) => {
  const arr = text.trim().split(reSeparator).filter(string => string);
  return removeDuplicates(arr.map(string => string.toLowerCase().replace(reQuotes, '')));
};

module.exports = parseBackground;
