import parseQueriedGenes from './parse-queried-genes.js';
import parseResults from './parse-results.js';

const formatResponse = (response) => {
  const queriedGenes = parseQueriedGenes(response.data.meta.genes_metadata);
  const unknownQueries = response.data.meta.genes_metadata.failed;

  return {
    results: parseResults(response.data.result, queriedGenes),
    unknownQueries,
  };
};

export default formatResponse;
