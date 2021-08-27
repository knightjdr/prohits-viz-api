import removeDuplicates from '../../../../../utils/remove-duplicates.js';

const reQuotes = /['"]+/g;
const reSeparator = /[\s,]+/;

const parseBackground = (text) => {
  const arr = text.trim().split(reSeparator).filter(string => string);
  return removeDuplicates(arr.map(string => string.toLowerCase().replace(reQuotes, '')));
};

export default parseBackground;
