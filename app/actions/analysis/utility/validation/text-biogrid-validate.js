import config from '../../../../config/config.js';
import isTrue from '../../../../utils/is-true.js';

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
  'two-hybrid'
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
  } = fields;

  const fdr = Number(inputFDR);
  const max = Number(inputMax),

  const errors = {};
  const evidenceList = inputEvidenceList.filter((evidence) => evidenceOptions.includes(evidence))
  if (Number.isNaN(fdr) || fdr < 0 || fdr > 1) {
    errors.fdr = 'FDR is not within the bounds of 0 and 1';
  }

  if (!idTypeOptions.includes(idType)) {
    errors.idType = 'Invalid idType option';
  }

  if (Number.isNaN(max) || max < 0 || max > 10000) {
    errors.max = 'max is not within the bounds of 0 and 10000';
  }

  return {
    fields: {
      accessKey: config.biogridKey,
      evidenceList: 
      fdr,
      idType,
      includeEvidence: isTrue(includeEvidence),
      includePrimaryInteractions: isTrue(includePrimaryInteractions),
      includeSecondaryInteractions: isTrue(includeSecondaryInteractions),
      includeSaintInteractions: isTrue(includeSaintInteractions),
      interSpeciesExcluded: isTrue(interSpeciesExcluded),
      isSaint: isTrue(isSaint),
      max,
    },
    errors,
  };
};

export default validateTextBiogridNetwork;
