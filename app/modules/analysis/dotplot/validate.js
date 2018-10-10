const acceptedFields = [
  'abundance',
  'abundanceCap',
  'analysisType',
  'condition',
  'conditionClustering',
  'conditionList',
  'biclusteringApprox',
  'clustering',
  'clusteringMethod',
  'control',
  'distance',
  'edgeColor',
  'fillColor',
  'logBase',
  'minAbundance',
  'normalization',
  'normalizationReadout',
  'pdf',
  'png',
  'readout',
  'readoutClustering',
  'readoutLength',
  'readoutList',
  'primaryFilter',
  'score',
  'scoreType',
  'secondaryFilter',
  'writeDistance',
  'writeDotplot',
  'writeHeatmap',
];

const validate = (form, files) => {
  let validated = { ...form };

  // Clear control column if not required.
  if (validated.control && !validated.ctrlSub) {
    validated.control = '';
  }

  // Clear readout length column if not required.
  if (validated.readoutLength && !validated.readoutLengthNorm) {
    validated.readoutLength = '';
  }

  // Remove log property if none.
  if (validated.logBase === 'none') {
    delete validated.logBase;
  }

  // Remove user clustering fields if not required.
  if (validated.clustering !== 'none') {
    delete validated.conditionClustering;
    delete validated.readoutClustering;
  }

  // Delete unneeding fields and "false" fields.
  validated = Object.entries(validated).reduce((accum, [key, value]) => {
    if (
      value &&
      value !== 'false' &&
      acceptedFields.includes(key)
    ) {
      const newProp = {};
      newProp[key] = value;
      return {
        ...accum,
        ...newProp,
      };
    }
    return accum;
  }, {});

  // Add files as comma separated list.
  validated.fileList = files.map(file => `files/${file.originalname}`).join(',');

  // Add field to create dotplot.
  validated.writeDotplot = 'true';
  return validated;
};

module.exports = validate;
