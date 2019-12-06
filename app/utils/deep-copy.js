const deepCopy = (arr) => {
  if (!arr) {
    return null;
  }
  return JSON.parse(JSON.stringify(arr));
};

export default deepCopy;
