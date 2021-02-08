// Sorts an array of strings ignoring case (sorts in place).
const sort = (arr) => {
  arr.sort((a, b) => (
    a.localeCompare(b, 'en', { sensitivity: 'base' })
  ));
};

export default sort;
