import validateCorrelation from './validate-fields.js';

describe('Validate correlation analysis fields', () => {
  it('should validate acceptable fields', () => {
    const form = {
      automaticallySetFill: 'true',
      clustering: 'hierarchical',
      clusteringMethod: 'complete',
      clusteringOptimize: 'true',
      conditionAbundanceFilter: '20',
      conditionScoreFilter: '0.1',
      correlation: 'pearson',
      cytoscapeCutoff: '0.7',
      distance: 'euclidean',
      fillColor: 'blue',
      ignoreSourceTargetMatches: 'false',
      minConditions: '1',
      parsimoniousReadoutFiltering: 'false',
      readoutAbundanceFilter: '20',
      readoutScoreFilter: '0.01',
      useReplicates: 'true',
    };

    const expected = {
      automaticallySetFill: true,
      clustering: 'hierarchical',
      clusteringMethod: 'complete',
      clusteringOptimize: true,
      conditionAbundanceFilter: 20,
      conditionScoreFilter: 0.1,
      correlation: 'pearson',
      cytoscapeCutoff: 0.7,
      distance: 'euclidean',
      fillColor: 'blue',
      ignoreSourceTargetMatches: false,
      minConditions: 1,
      parsimoniousReadoutFiltering: false,
      readoutAbundanceFilter: 20,
      readoutScoreFilter: 0.01,
      useReplicates: true,
    };

    Object.entries(form).forEach(([key, value]) => {
      expect(validateCorrelation(key, value)).toEqual({ value: expected[key] });
    });
  });

  it('should invalidate unacceptable fields', () => {
    const form = {
      automaticallySetFill: 'yes',
      clustering: 'unknown',
      clusteringMethod: 'unknown',
      clusteringOptimize: 'yes',
      conditionAbundanceFilter: 'a',
      conditionScoreFilter: 'a',
      correlation: 'unknown',
      cytoscapeCutoff: 'a',
      distance: 'unknown',
      fillColor: 'unknown',
      ignoreSourceTargetMatches: 'no',
      minConditions: '0',
      parsimoniousReadoutFiltering: 'no',
      readoutAbundanceFilter: 'a',
      readoutScoreFilter: 'a',
      useReplicates: 'yes',
    };

    const expected = {
      automaticallySetFill: 'should be a boolean',
      clustering: 'invalid value',
      clusteringMethod: 'invalid method',
      clusteringOptimize: 'should be a boolean',
      conditionAbundanceFilter: 'should be a number',
      conditionScoreFilter: 'should be a number',
      correlation: 'invalid algorithm',
      cytoscapeCutoff: 'should be a number',
      distance: 'invalid metric',
      fillColor: 'invalid color',
      ignoreSourceTargetMatches: 'should be a boolean',
      minConditions: 'should be a number > 0',
      parsimoniousReadoutFiltering: 'should be a boolean',
      readoutAbundanceFilter: 'should be a number',
      readoutScoreFilter: 'should be a number',
      useReplicates: 'should be a boolean',
    };

    Object.entries(form).forEach(([key, value]) => {
      expect(validateCorrelation(key, value)).toEqual({ error: expected[key] });
    });
  });

  it('should return empty object for unknown field', () => {
    expect(validateCorrelation('unknown', '1')).toEqual({});
  });
});
