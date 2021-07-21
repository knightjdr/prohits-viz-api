const backgroundOptions = ['all', 'file'];
const idTypeOptions = [
  'ensemblg',
  'ensemblp',
  'entrez',
  'refseqg',
  'refseqp',
  'uniprotacc',
  'uniprotid',
];

const validateSaintDomainEnrich = (fields) => {
  const {
    background,
    fdr: inputFDR,
    idType,
    topPreys: inputTopPreys,
  } = fields;

  const fdr = Number(inputFDR);
  const topPreys = Number(inputTopPreys);

  const errors = {};

  if (!backgroundOptions.includes(background)) {
    errors.background = 'The background option should be either "all" or "file"';
  }

  if (!idTypeOptions.includes(idType)) {
    errors.idType = 'Invalid idType option';
  }

  if (Number.isNaN(fdr) || fdr < 0 || fdr > 1) {
    errors.fdr = 'FDR is not within the bounds of 0 and 1';
  }

  if (Number.isNaN(topPreys)) {
    errors.topPreys = 'Should be a non-negative number';
  }

  return {
    fields: {
      background,
      fdr,
      idType,
      topPreys,
    },
    errors,
  };
};

export default validateSaintDomainEnrich;
