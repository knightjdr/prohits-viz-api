const validateSaintFEA = (fields) => {
  const { fdr: inputFDR, topPreys: inputTopPreys } = fields;

  const fdr = Number(inputFDR);
  const topPreys = Number(inputTopPreys);

  const errors = {};
  if (Number.isNaN(fdr) || fdr < 0 || fdr > 1) {
    errors.fdr = 'FDR is not within the bounds of 0 and 1';
  }

  if (Number.isNaN(topPreys)) {
    errors.topPreys = 'Should be a non-negative number';
  }

  return {
    fields: { fdr, topPreys },
    errors,
  };
};

export default validateSaintFEA;
