import validateDotplot from './dotplot';

describe('Dotplot validation', () => {
  it('should validate common heat map field', () => {
    const rows = [
      { data: [{ ratio: 0.5, score: 0.01, value: 0.5 }], name: 'a' },
      { data: [{ ratio: 1, score: 0.05, value: 0.8 }], name: 'b' },
    ];
    const expected = rows;
    expect(validateDotplot('rows', rows)).toEqual(expected);
  });

  describe('edge color', () => {
    it('should validate color', () => {
      const edgeColor = 'red';
      const expected = 'red';
      expect(validateDotplot('edgeColor', edgeColor)).toBe(expected);
    });

    it('should return default', () => {
      const edgeColor = 'purple';
      const expected = 'blue';
      expect(validateDotplot('edgeColor', edgeColor)).toBe(expected);
    });
  });

  describe('primary filter', () => {
    it('should validate number', () => {
      const primaryFilter = 0.05;
      const expected = 0.05;
      expect(validateDotplot('primaryFilter', primaryFilter)).toBe(expected);
    });

    it('should return default', () => {
      const primaryFilter = '0.05';
      const expected = 0.01;
      expect(validateDotplot('primaryFilter', primaryFilter)).toBe(expected);
    });
  });

  describe('score type', () => {
    it('should validate number', () => {
      const scoreType = 'gte';
      const expected = 'gte';
      expect(validateDotplot('scoreType', scoreType)).toBe(expected);
    });

    it('should return default', () => {
      const scoreType = 'unknown';
      const expected = 'lte';
      expect(validateDotplot('scoreType', scoreType)).toBe(expected);
    });
  });

  describe('secondary filter', () => {
    it('should validate number', () => {
      const secondaryFilter = 0.1;
      const expected = 0.1;
      expect(validateDotplot('secondaryFilter', secondaryFilter)).toBe(expected);
    });

    it('should return default', () => {
      const secondaryFilter = '0.1';
      const expected = 0.05;
      expect(validateDotplot('secondaryFilter', secondaryFilter)).toBe(expected);
    });
  });

  it('should return null for unrecognized field', () => {
    expect(validateDotplot('unknownField', 'test')).toBeNull();
  });
});
