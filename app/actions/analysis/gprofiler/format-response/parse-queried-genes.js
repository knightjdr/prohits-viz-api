const mapFromValuesToKeys = require('../../../../utils/map-from-values-to-keys');

const parseQueriedGenes = (genesMetadata) => {
  const { ensgs, mapping } = genesMetadata.query.query_1;
  const ensgToGeneMap = mapFromValuesToKeys(mapping);
  return ensgs.map(ensg => ensgToGeneMap[ensg]);
};

module.exports = parseQueriedGenes;
