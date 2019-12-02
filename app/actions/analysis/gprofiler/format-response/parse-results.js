const convertToExponential = require('../../../../utils/convert-to-exponential');
const mapFieldsToResult = require('./map-fields-to-result');
const mapIntersectionToGenes = require('./map-intersections-to-genes');
const { createSourceLink } = require('./create-source-link');

const parseResult = (result, genes) => {
  const parsedResult = mapFieldsToResult(result);
  return {
    ...parsedResult,
    genes: mapIntersectionToGenes(result.intersections, genes).sort().join(', '),
    pValue: convertToExponential(parsedResult.pValue),
    sourceURL: createSourceLink(parsedResult.id, parsedResult.source),
  };
};

const parseResults = (results, genes) => (
  results.map(result => parseResult(result, genes))
);

module.exports = parseResults;
