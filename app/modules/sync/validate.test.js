const { validateDotplot, validateHeatmap, validateSync } = require('./validate');

describe('Validate sync method object', () => {
  describe('when image type is dotplot', () => {
    it('with valid parameters', () => {
      const body = {
        abundanceCap: 40,
        edgeColor: 'redBlack',
        fillColor: 'redBlack',
        imageType: 'dotplot',
        invertColor: true,
        primaryFilter: 0.02,
        rows: [],
        scoreType: 'gte',
        secondaryFilter: 0.10,
      };
      expect(validateDotplot(body)).toEqual(body);
    });

    it('with missing', () => {
      const body = {
        rows: [],
      };
      const expected = {
        abundanceCap: 50,
        edgeColor: 'blueBlack',
        fillColor: 'blueBlack',
        imageType: 'dotplot',
        invertColor: false,
        primaryFilter: 0.01,
        rows: [],
        scoreType: 'lte',
        secondaryFilter: 0.05,
      };
      expect(validateDotplot(body)).toEqual(expected);
    });

    it('with invalid parameters', () => {
      const body = {
        abundanceCap: 'a',
        edgeColor: 'purpleBlack',
        fillColor: 'black',
        imageType: 'other',
        invertColor: 0.05,
        primaryFilter: 'a',
        rows: [],
        scoreType: 'pte',
        secondaryFilter: 'a',
      };
      const expected = {
        abundanceCap: 50,
        edgeColor: 'blueBlack',
        fillColor: 'blueBlack',
        imageType: 'dotplot',
        invertColor: false,
        primaryFilter: 0.01,
        rows: [],
        scoreType: 'lte',
        secondaryFilter: 0.05,
      };
      expect(validateDotplot(body)).toEqual(expected);
    });
  });

  describe('when image type is heatmap', () => {
    it('with valid parameters', () => {
      const body = {
        abundanceCap: 40,
        fillColor: 'redBlack',
        imageType: 'heatmap',
        invertColor: true,
        rows: [],
        scoreType: 'gte',
      };
      expect(validateHeatmap(body)).toEqual(body);
    });

    it('with missing', () => {
      const body = { rows: [] };
      const expected = {
        abundanceCap: 50,
        fillColor: 'blueBlack',
        imageType: 'heatmap',
        invertColor: false,
        rows: [],
        scoreType: 'lte',
      };
      expect(validateHeatmap(body)).toEqual(expected);
    });

    it('with invalid parameters', () => {
      const body = {
        abundanceCap: 'a',
        fillColor: 'black',
        imageType: 'other',
        invertColor: 0.05,
        rows: [],
        scoreType: 'pte',
      };
      const expected = {
        abundanceCap: 50,
        fillColor: 'blueBlack',
        imageType: 'heatmap',
        invertColor: false,
        rows: [],
        scoreType: 'lte',
      };
      expect(validateHeatmap(body)).toEqual(expected);
    });
  });

  describe('from method handler', () => {
    it('should validate dotplot', () => {
      const body = {
        imageType: 'dotplot',
        rows: [],
      };
      const expected = {
        abundanceCap: 50,
        edgeColor: 'blueBlack',
        fillColor: 'blueBlack',
        imageType: 'dotplot',
        invertColor: false,
        primaryFilter: 0.01,
        rows: [],
        scoreType: 'lte',
        secondaryFilter: 0.05,
      };
      expect(validateSync(body)).toEqual(expected);
    });

    it('should validate everything else as a heatmap', () => {
      const body = {
        imageType: 'other',
        rows: [],
      };
      const expected = {
        abundanceCap: 50,
        fillColor: 'blueBlack',
        imageType: 'heatmap',
        invertColor: false,
        rows: [],
        scoreType: 'lte',
      };
      expect(validateSync(body)).toEqual(expected);
    });
  });
});
