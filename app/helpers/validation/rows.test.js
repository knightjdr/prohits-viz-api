import rows from './rows';

const err = new Error('Invalid row array');

describe('Validate rows object', () => {
  it('should return error when falsy', () => {
    const data = undefined;
    expect(() => { rows('heatmap', data); }).toThrowError(err);
  });

  it('should return error when not an array', () => {
    const data = {};
    expect(() => { rows('heatmap', data); }).toThrowError(err);
  });

  it('should return error when array is empty', () => {
    const data = [];
    expect(() => { rows('heatmap', data); }).toThrowError(err);
  });

  it('should return error when array item is null', () => {
    const data = [null];
    expect(() => { rows('heatmap', data); }).toThrowError(err);
  });

  it('should return error when array items are not objects', () => {
    const data = ['a'];
    expect(() => { rows('heatmap', data); }).toThrowError(err);
  });

  it('should return error when items are missing name', () => {
    const data = [{}];
    expect(() => { rows('heatmap', data); }).toThrowError(err);
  });

  it('should return error when item name is not a string', () => {
    const data = [{ name: 1 }];
    expect(() => { rows('heatmap', data); }).toThrowError(err);
  });

  it('should return error when items are missing data prop', () => {
    const data = [{ name: 'a' }];
    expect(() => { rows('heatmap', data); }).toThrowError(err);
  });

  it('should return error when data prop is not an array', () => {
    const data = [{ data: {}, name: 'a' }];
    expect(() => { rows('heatmap', data); }).toThrowError(err);
  });

  it('should return error when data array items are null', () => {
    const data = [{ data: [null], name: 'a' }];
    expect(() => { rows('heatmap', data); }).toThrowError(err);
  });

  it('should return error when data array items are not objects', () => {
    const data = [{ data: ['a'], name: 'a' }];
    expect(() => { rows('heatmap', data); }).toThrowError(err);
  });

  it('should return error when data array items are missing value prop', () => {
    const data = [{ data: [{}], name: 'a' }];
    expect(() => { rows('heatmap', data); }).toThrowError(err);
  });

  it('should return row data', () => {
    const data = [{ data: [{ value: 1 }], name: 'a' }];
    expect(rows('heatmap', data)).toEqual(data);
  });

  describe('when image type is "dotplot"', () => {
    it('should return error when data array items are missing ratio prop', () => {
      const data = [{ data: [{ value: 1 }], name: 'a' }];
      expect(() => { rows('dotplot', data); }).toThrowError(err);
    });

    it('should return error when data array items are missing score prop', () => {
      const data = [{ data: [{ ratio: 0.5, value: 1 }], name: 'a' }];
      expect(() => { rows('dotplot', data); }).toThrowError(err);
    });

    it('should return row data', () => {
      const data = [{ data: [{ ratio: 0.5, score: 0.01, value: 1 }], name: 'a' }];
      expect(rows('dotplot', data)).toEqual(data);
    });
  });
});
