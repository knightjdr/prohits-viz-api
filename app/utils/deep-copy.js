const deepCopy = (arr) => {
  if (!arr) {
    return null;
  }
  return JSON.parse(JSON.stringify(arr));
};

module.exports = deepCopy;
