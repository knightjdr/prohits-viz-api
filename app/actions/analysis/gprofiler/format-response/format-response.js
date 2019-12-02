const parseQueriedGenes = require('./parse-queried-genes');
const parseResults = require('./parse-results');

const formatResponse = (response) => {
  const queriedGenes = parseQueriedGenes(response.data.meta.genes_metadata);
  const unknownQueries = response.data.meta.genes_metadata.failed;

  return {
    results: parseResults(response.data.result, queriedGenes),
    unknownQueries,
  };
};

module.exports = formatResponse;
