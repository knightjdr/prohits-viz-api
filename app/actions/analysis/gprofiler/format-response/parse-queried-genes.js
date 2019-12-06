import mapFromValuesToKeys from '../../../../utils/map-from-values-to-keys.js';

const parseQueriedGenes = (genesMetadata) => {
  const { ensgs, mapping } = genesMetadata.query.query_1;
  const ensgToGeneMap = mapFromValuesToKeys(mapping);
  return ensgs.map(ensg => ensgToGeneMap[ensg]);
};

export default parseQueriedGenes;
