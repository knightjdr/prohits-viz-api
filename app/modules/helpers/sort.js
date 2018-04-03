// sort two characters or numbers
const Sort = {
  character: (a, b) => {
    // ensure a and b are not null or if one is null sort as if less than the other
    if (
      !a &&
      !b
    ) {
      return 0;
    } else if (!a) {
      return 1;
    } else if (!b) {
      return -1;
    }
    // a and b are defined, now sort ignoring case
    const nameA = String(a).toLowerCase();
    const nameB = String(b).toLowerCase();
    if (nameA < nameB) {
      return -1;
    } else if (nameA > nameB) {
      return 1;
    }
    return 0;
  },
  numeric: (x, y) => {
    // ensure x and y are both numeric
    // if either is null, treat null as greater than numbers
    if (
      (Number.isNaN(Number(x)) || x == null) &&
      (Number.isNaN(Number(y)) || y == null)
    ) {
      return 0;
    } else if (
      (Number.isNaN(Number(x)) || x == null)
    ) {
      return 1;
    } else if (
      (Number.isNaN(Number(y)) || y == null)
    ) {
      return -1;
    }
    // x and y are numeric, now convert to numbers and sort
    const xSort = Number(x);
    const ySort = Number(y);
    return xSort - ySort;
  },
};
module.exports = Sort;
