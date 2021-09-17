import isTrue from '../../../../utils/is-true.js';

import { parseArray } from '../../../../utils/parse-form.js';

const evidenceOptions = [
  'affinity capture-luminescence',
  'affinity capture-ms',
  'affinity capture-rna',
  'affinity capture-western',
  'biochemical activity',
  'co-crystal structure',
  'co-fractionation',
  'co-localization',
  'co-purification',
  'dosage growth defect',
  'dosage lethality',
  'dosage rescue',
  'far western',
  'fret',
  'negative genetic',
  'pca',
  'phenotypic enhancement',
  'phenotypic suppression',
  'positive genetic',
  'protein-peptide',
  'protein-rna',
  'proximity label-ms',
  'reconstituted complex',
  'synthetic growth defect',
  'synthetic haploinsufficiency',
  'synthetic lethality',
  'synthetic rescue',
  'two-hybrid',
];

const idTypeOptions = [
  'ensemblg',
  'ensemblp',
  'entrez',
  'refseqg',
  'refseqp',
  'symbol',
  'uniprotacc',
  'uniprotid',
];

const throughputOptions = [
  'all',
  'high',
  'low',
];

const validateTextBiogridNetwork = (fields) => {
  const {
    evidenceList: inputEvidenceList,
    fdr: inputFDR,
    idType,
    includeEvidence,
    includePrimaryInteractions,
    includeSecondaryInteractions,
    includeSaintInteractions,
    interSpeciesExcluded,
    isSaint,
    max: inputMax,
    throughputTag,
  } = fields;

  const fdr = Number(inputFDR);
  const max = Number(inputMax);

  const errors = {};

  const evidenceList = parseArray(inputEvidenceList).filter((evidence) => evidenceOptions.includes(evidence));

  if (Number.isNaN(fdr) || fdr < 0 || fdr > 1) {
    errors.fdr = 'FDR is not within the bounds of 0 and 1';
  }

  if (!idTypeOptions.includes(idType)) {
    errors.idType = 'Invalid idType option';
  }

  if (Number.isNaN(max) || max < 0 || max > 10000) {
    errors.max = 'Max is not within the bounds of 0 and 10000';
  }

  if (!throughputOptions.includes(throughputTag)) {
    errors.throughputTag = 'Invalid throughput option';
  }

  return {
    fields: {
      evidenceList,
      fdr,
      idType,
      includeEvidence: isTrue(includeEvidence),
      includePrimaryInteractions: isTrue(includePrimaryInteractions),
      includeSecondaryInteractions: isTrue(includeSecondaryInteractions),
      includeSaintInteractions: isTrue(includeSaintInteractions),
      interSpeciesExcluded: isTrue(interSpeciesExcluded),
      isSaint: isTrue(isSaint),
      max,
      throughputTag,
    },
    errors,
  };
};

export default validateTextBiogridNetwork;
