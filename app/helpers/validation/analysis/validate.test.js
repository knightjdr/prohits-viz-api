import validate from './validate.js';

describe('Form validation', () => {
  describe('Condition-condition validation interface', () => {
    it('should return valid object', () => {
      const data = {
        abundance: 'AvgSpec',
        condition: 'Bait',
        control: 'ctrlCounts',
        ctrlSub: 'true',
        fileType: 'saint',
        logBase: '10',
        mockConditionAbundance: 'false',
        normalization: 'total',
        normalizationReadout: '',
        readout: 'PreyGene',
        readoutLength: '',
        readoutLengthNorm: 'false',
        sampleFile: 'true',
        score: 'BFDR',
        scoreType: 'lte',
        png: 'false',

        conditionX: 'condition1',
        conditionY: 'condition2',
        minAbundance: '0',
        primaryFilter: '0.01',
        secondaryFilter: '0.05',
      };
      const files = [{}];

      const expected = {
        errors: {},
        values: {
          abundance: 'AvgSpec',
          condition: 'Bait',
          control: 'ctrlCounts',
          ctrlSub: true,
          fileType: 'saint',
          logBase: '10',
          mockConditionAbundance: false,
          normalization: 'total',
          normalizationReadout: '',
          readout: 'PreyGene',
          readoutLength: '',
          readoutLengthNorm: false,
          sampleFile: true,
          score: 'BFDR',
          scoreType: 'lte',
          png: false,

          conditionX: 'condition1',
          conditionY: 'condition2',
          minAbundance: 0,
          primaryFilter: 0.01,
          secondaryFilter: 0.05,
        },
      };
      expect(validate('condition-condition', data, files)).toEqual(expected);
    });
  });

  describe('Correlation validation interface', () => {
    it('should return valid object', () => {
      const data = {
        abundance: 'AvgSpec',
        condition: 'Bait',
        control: 'ctrlCounts',
        ctrlSub: 'true',
        fileType: 'saint',
        logBase: '10',
        mockConditionAbundance: 'false',
        normalization: 'total',
        normalizationReadout: '',
        readout: 'PreyGene',
        readoutLength: '',
        readoutLengthNorm: 'false',
        sampleFile: 'true',
        score: 'BFDR',
        scoreType: 'lte',
        png: 'false',

        automaticallySetFill: 'true',
        clustering: 'hierarchical',
        clusteringMethod: 'complete',
        clusteringOptimize: 'true',
        conditionAbundanceFilter: 0,
        conditionScoreFilter: 0.01,
        correlation: 'pearson',
        cytoscapeCutoff: 0.9,
        distance: 'euclidean',
        fillColor: 'blueRed',
        ignoreSourceTargetMatches: true,
        minConditions: '1',
        parsimoniousReadoutFiltering: 'false',
        readoutAbundanceFilter: 10,
        readoutScoreFilter: 0.05,
        useReplicates: true,
      };
      const files = [{}];

      const expected = {
        errors: {},
        values: {
          abundance: 'AvgSpec',
          condition: 'Bait',
          control: 'ctrlCounts',
          ctrlSub: true,
          fileType: 'saint',
          logBase: '10',
          mockConditionAbundance: false,
          normalization: 'total',
          normalizationReadout: '',
          readout: 'PreyGene',
          readoutLength: '',
          readoutLengthNorm: false,
          sampleFile: true,
          score: 'BFDR',
          scoreType: 'lte',
          png: false,

          automaticallySetFill: true,
          clustering: 'hierarchical',
          clusteringMethod: 'complete',
          clusteringOptimize: true,
          conditionAbundanceFilter: 0,
          conditionScoreFilter: 0.01,
          correlation: 'pearson',
          cytoscapeCutoff: 0.9,
          distance: 'euclidean',
          fillColor: 'blueRed',
          ignoreSourceTargetMatches: true,
          minConditions: 1,
          parsimoniousReadoutFiltering: false,
          readoutAbundanceFilter: 10,
          readoutScoreFilter: 0.05,
          useReplicates: true,
        },
      };
      expect(validate('correlation', data, files)).toEqual(expected);
    });
  });

  describe('Dotplot/Heatmap validation interface', () => {
    it('should return valid object', () => {
      const data = {
        abundance: 'AvgSpec',
        condition: 'Bait',
        control: 'ctrlCounts',
        ctrlSub: 'true',
        fileType: 'saint',
        logBase: '10',
        mockConditionAbundance: 'false',
        normalization: 'total',
        normalizationReadout: '',
        readout: 'PreyGene',
        readoutLength: '',
        readoutLengthNorm: 'false',
        sampleFile: 'true',
        score: 'BFDR',
        scoreType: 'lte',
        png: 'false',

        abundanceCap: '50',
        automaticallySetFill: 'true',
        biclusteringApprox: 'false',
        clustering: 'hierarchical',
        clusteringMethod: 'complete',
        clusteringOptimize: 'true',
        conditionClustering: '',
        conditionList: '',
        distance: 'euclidean',
        edgeColor: 'blue',
        fillColor: 'blue',
        minAbundance: '0',
        minConditions: '1',
        parsimoniousReadoutFiltering: 'false',
        primaryFilter: '0.01',
        ratioDimension: 'diameter',
        readoutClustering: '',
        readoutList: '',
        secondaryFilter: '0.05',
        writeDistance: 'false',
        writeHeatmap: 'false',
      };
      const files = [{}];

      const expected = {
        errors: {},
        values: {
          abundance: 'AvgSpec',
          condition: 'Bait',
          control: 'ctrlCounts',
          ctrlSub: true,
          fileType: 'saint',
          logBase: '10',
          mockConditionAbundance: false,
          normalization: 'total',
          normalizationReadout: '',
          readout: 'PreyGene',
          readoutLength: '',
          readoutLengthNorm: false,
          sampleFile: true,
          score: 'BFDR',
          scoreType: 'lte',
          png: false,

          abundanceCap: 50,
          automaticallySetFill: true,
          biclusteringApprox: false,
          clustering: 'hierarchical',
          clusteringMethod: 'complete',
          clusteringOptimize: true,
          conditionClustering: '',
          conditionList: '',
          distance: 'euclidean',
          edgeColor: 'blue',
          fillColor: 'blue',
          minAbundance: 0,
          minConditions: 1,
          parsimoniousReadoutFiltering: false,
          primaryFilter: 0.01,
          ratioDimension: 'diameter',
          readoutClustering: '',
          readoutList: '',
          secondaryFilter: 0.05,
          writeDistance: false,
          writeHeatmap: false,
        },
      };
      expect(validate('dotplot', data, files)).toEqual(expected);
    });
  });

  describe('SCV validation interface', () => {
    it('should return valid object', () => {
      const data = {
        abundance: ['AvgSpec', 'otherColumn'],
        condition: 'Bait',
        control: 'ctrlCounts',
        ctrlSub: 'true',
        fileType: 'saint',
        logBase: '10',
        mockConditionAbundance: 'false',
        normalization: 'total',
        normalizationReadout: '',
        otherAbundance: [],
        readout: 'PreyGene',
        readoutLength: '',
        readoutLengthNorm: 'false',
        sampleFile: 'true',
        score: 'BFDR',
        scoreType: 'lte',
        png: 'false',

        abundanceCap: '50',
        abundanceFilterColumn: 'otherColumn',
        conditionIDType: 'symbol',
        conditionMapColumn: '',
        conditionMapFile: [],
        known: 'interaction',
        knownFile: [],
        minAbundance: '0',
        primaryFilter: '0.01',
        proteinTissues: [],
        readoutIDType: 'entrez',
        readoutMapColumn: '',
        readoutMapFile: [],
        rnaTissues: [],
        specificity: 'true',
        verticalHeatmap: 'false',
      };
      const files = [{}];

      const expected = {
        errors: {},
        values: {
          abundance: 'otherColumn',
          condition: 'Bait',
          control: 'ctrlCounts',
          ctrlSub: true,
          fileType: 'saint',
          logBase: '10',
          mockConditionAbundance: false,
          normalization: 'total',
          normalizationReadout: '',
          readout: 'PreyGene',
          readoutLength: '',
          readoutLengthNorm: false,
          sampleFile: true,
          score: 'BFDR',
          scoreType: 'lte',
          png: false,

          abundanceCap: 50,
          abundanceFilterColumn: 'otherColumn',
          conditionIDType: 'symbol',
          conditionMapColumn: '',
          conditionMapFile: [],
          known: 'interaction',
          knownFile: [],
          minAbundance: 0,
          otherAbundance: ['AvgSpec'],
          primaryFilter: 0.01,
          proteinTissues: [],
          readoutIDType: 'entrez',
          readoutMapColumn: '',
          readoutMapFile: [],
          rnaTissues: [],
          specificity: true,
          verticalHeatmap: false,
        },
      };
      expect(validate('scv', data, files)).toEqual(expected);
    });
  });

  describe('Specificity validation interface', () => {
    it('should return valid object', () => {
      const data = {
        abundance: 'AvgSpec',
        condition: 'Bait',
        control: 'ctrlCounts',
        ctrlSub: 'true',
        fileType: 'saint',
        logBase: '10',
        mockConditionAbundance: 'false',
        normalization: 'total',
        normalizationReadout: '',
        readout: 'PreyGene',
        readoutLength: '',
        readoutLengthNorm: 'false',
        sampleFile: 'true',
        score: 'BFDR',
        scoreType: 'lte',
        png: 'false',

        minAbundance: '0',
        specificityMetric: 'fe',
      };
      const files = [{}];

      const expected = {
        errors: {},
        values: {
          abundance: 'AvgSpec',
          condition: 'Bait',
          control: 'ctrlCounts',
          ctrlSub: true,
          fileType: 'saint',
          logBase: '10',
          mockConditionAbundance: false,
          normalization: 'total',
          normalizationReadout: '',
          readout: 'PreyGene',
          readoutLength: '',
          readoutLengthNorm: false,
          sampleFile: true,
          score: 'BFDR',
          scoreType: 'lte',
          png: false,

          minAbundance: 0,
          specificityMetric: 'fe',
        },
      };
      expect(validate('specificity', data, files)).toEqual(expected);
    });
  });
});
