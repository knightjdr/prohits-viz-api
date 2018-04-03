// deep copy a variable
const DeepCopy = (arr) => {
  if (!arr) {
    return null;
  }
  return JSON.parse(JSON.stringify(arr));
};
module.exports = DeepCopy;
