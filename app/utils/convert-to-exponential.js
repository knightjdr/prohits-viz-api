const convertToExponential = (x, f = 3) => (
  Number.parseFloat(x).toExponential(f)
);

export default convertToExponential;
