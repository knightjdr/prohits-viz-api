import validateHeatmap from './heatmap';

describe('Heatmap validation', () => {
  describe('abundance cap', () => {
    it('should validate number', () => {
      const abundanceCap = 20;
      const expected = 20;
      expect(validateHeatmap('abundanceCap', abundanceCap)).toBe(expected);
    });

    it('should return default', () => {
      const abundanceCap = '20';
      const expected = 50;
      expect(validateHeatmap('abundanceCap', abundanceCap)).toBe(expected);
    });
  });

  it('should validate annotations', () => {
    const annotations = {
      fontSize: 15,
      list: {
        annotation1: {
          position: { x: 0.1, y: 0.2 },
          text: 'a',
        },
      },
    };
    const expected = annotations;
    expect(validateHeatmap('annotations', annotations)).toEqual(expected);
  });

  it('should validate column DB', () => {
    const columnDB = ['a', 'b', 'c'];
    const expected = columnDB;
    expect(validateHeatmap('columnDB', columnDB)).toEqual(expected);
  });

  it('should validate column order', () => {
    const columnOrder = [1, 2, 3];
    const expected = columnOrder;
    expect(validateHeatmap('columnOrder', columnOrder)).toEqual(expected);
  });

  describe('fill color', () => {
    it('should validate color', () => {
      const fillColor = 'red';
      const expected = 'red';
      expect(validateHeatmap('fillColor', fillColor)).toBe(expected);
    });

    it('should return default', () => {
      const fillColor = 'purple';
      const expected = 'blue';
      expect(validateHeatmap('fillColor', fillColor)).toBe(expected);
    });
  });

  describe('invert color', () => {
    it('should validate boolean', () => {
      const invertColor = true;
      expect(validateHeatmap('invertColor', invertColor)).toBeTruthy();
    });

    it('should return default', () => {
      const invertColor = 'true';
      expect(validateHeatmap('invertColor', invertColor)).toBeFalsy();
    });
  });

  it('should validate markers', () => {
    const markers = {
      color: '#ffffff',
      list: {
        marker1: {
          height: 10,
          width: 15,
          x: 0.5,
          y: 0.2,
        },
      },
    };
    const expected = markers;
    expect(validateHeatmap('markers', markers)).toEqual(expected);
  });

  describe('min abundance', () => {
    it('should validate number', () => {
      const minAbundance = 20;
      const expected = 20;
      expect(validateHeatmap('minAbundance', minAbundance)).toBe(expected);
    });

    it('should return default', () => {
      const minAbundance = '20';
      const expected = 0;
      expect(validateHeatmap('minAbundance', minAbundance)).toBe(expected);
    });
  });

  it('should validate row DB', () => {
    const rowDB = [
      { data: [{ value: 0.5 }], name: 'a' },
      { data: [{ value: 0.8 }], name: 'b' },
    ];
    const expected = rowDB;
    expect(validateHeatmap('rowDB', rowDB)).toEqual(expected);
  });

  it('should validate row order', () => {
    const rowOrder = [1, 2, 3];
    const expected = rowOrder;
    expect(validateHeatmap('rowOrder', rowOrder)).toEqual(expected);
  });

  it('should return null for unrecognized field', () => {
    expect(validateHeatmap('unknownField', 'test')).toBeNull();
  });
});
