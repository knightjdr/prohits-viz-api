const mapFieldsToResult = require('./map-fields-to-result');
const mapIntersectionToGenes = require('./map-intersections-to-genes');

const parseResult = (result, genes) => ({
  ...mapFieldsToResult(result),
  genes: mapIntersectionToGenes(result.intersections, genes),
});

const parseResults = (results, genes) => (
  results.map(result => parseResult(result, genes))
);

module.exports = parseResults;
