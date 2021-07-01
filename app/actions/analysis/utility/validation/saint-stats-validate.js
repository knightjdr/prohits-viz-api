const validateSaintStats = (fields) => {
  const { fdr: inputFDR } = fields;

  const fdr = Number(inputFDR);

  const errors = {};
  if (Number.isNaN(fdr) || fdr < 0 || fdr > 1) {
    errors.fdr = 'FDR is not within the bounds of 0 and 1';
  }

  return {
    fields: { fdr },
    errors,
  };
};

export default validateSaintStats;
