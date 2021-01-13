import validateDotplot from './validate-fields.js';

describe('Validate dotplot analysis fields', () => {
  it('should validate acceptable fields', () => {
    const form = {
      abundanceCap: '50',
      biclusteringApprox: 'true',
      clustering: 'hierarchical',
      clusteringMethod: 'complete',
      clusteringOptimize: 'true',
      conditionClustering: 'conditions',
      conditionList: 'conditionA, conditionB',
      distance: 'euclidean',
      edgeColor: 'blue',
      fillColor: 'red',
      minAbundance: '0',
      minConditions: '1',
      parsimoniousReadoutFiltering: 'false',
      primaryFilter: '0.01',
      readoutClustering: 'readouts',
      readoutList: 'readoutA   readoutB',
      secondaryFilter: '0.05',
      writeDistance: 'false',
      writeHeatmap: 'false',
    };

    const expected = {
      abundanceCap: 50,
      biclusteringApprox: true,
      clustering: 'hierarchical',
      clusteringMethod: 'complete',
      clusteringOptimize: true,
      conditionClustering: 'conditions',
      conditionList: 'conditionA, conditionB',
      distance: 'euclidean',
      edgeColor: 'blue',
      fillColor: 'red',
      minAbundance: 0,
      minConditions: 1,
      parsimoniousReadoutFiltering: false,
      primaryFilter: 0.01,
      readoutClustering: 'readouts',
      readoutList: 'readoutA   readoutB',
      secondaryFilter: 0.05,
      writeDistance: false,
      writeHeatmap: false,
    };

    Object.entries(form).forEach(([key, value]) => {
      expect(validateDotplot(key, value)).toEqual({ value: expected[key] });
    });
  });

  it('should invalidate unacceptable fields', () => {
    const form = {
      abundanceCap: 'a',
      biclusteringApprox: 'yes',
      clustering: 'unknown',
      clusteringMethod: 'unknown',
      clusteringOptimize: 'yes',
      conditionClustering: 'unknown',
      conditionList: 1,
      distance: 'unknown',
      edgeColor: 'unknown',
      fillColor: 'unknown',
      minAbundance: 'a',
      minConditions: '0',
      parsimoniousReadoutFiltering: 'no',
      primaryFilter: 'a',
      readoutClustering: 'unknown',
      readoutList: 1,
      secondaryFilter: 'a',
      writeDistance: 'no',
      writeHeatmap: 'no',
    };

    const expected = {
      abundanceCap: 'should be a number',
      biclusteringApprox: 'should be a boolean',
      clustering: 'invalid value',
      clusteringMethod: 'invalid method',
      clusteringOptimize: 'should be a boolean',
      conditionClustering: 'invalid value',
      conditionList: 'missing list of conditions for clustering',
      distance: 'invalid metric',
      edgeColor: 'invalid color',
      fillColor: 'invalid color',
      minAbundance: 'should be a number',
      minConditions: 'should be a number > 0',
      parsimoniousReadoutFiltering: 'should be a boolean',
      primaryFilter: 'should be a number',
      readoutClustering: 'invalid value',
      readoutList: 'missing list of readouts for clustering',
      secondaryFilter: 'should be a number',
      writeDistance: 'should be a boolean',
      writeHeatmap: 'should be a boolean',
    };

    Object.entries(form).forEach(([key, value]) => {
      expect(validateDotplot(key, value)).toEqual({ error: expected[key] });
    });
  });

  it('should return empty object for unknown field', () => {
    expect(validateDotplot('unknown', '1')).toEqual({});
  });
});
