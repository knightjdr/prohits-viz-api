import convertToExponential from '../../../../utils/convert-to-exponential.js';
import mapFieldsToResult from './map-fields-to-result.js';
import mapIntersectionToGenes from './map-intersections-to-genes.js';
import { createSourceLink } from './create-source-link.js';

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

export default parseResults;
