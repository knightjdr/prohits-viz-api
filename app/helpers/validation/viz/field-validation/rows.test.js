import { validateRowOrder, validateRows } from './rows.js';

describe('Validate rows object', () => {
  const err = new Error('Invalid row DB array');

  it('should return error when falsy', () => {
    const data = undefined;
    expect(() => { validateRows('heatmap', data); }).toThrowError(err);
  });

  it('should return error when not an array', () => {
    const data = {};
    expect(() => { validateRows('heatmap', data); }).toThrowError(err);
  });

  it('should return error when array is empty', () => {
    const data = [];
    expect(() => { validateRows('heatmap', data); }).toThrowError(err);
  });

  it('should return error when array item is null', () => {
    const data = [null];
    expect(() => { validateRows('heatmap', data); }).toThrowError(err);
  });

  it('should return error when array items are not objects', () => {
    const data = ['a'];
    expect(() => { validateRows('heatmap', data); }).toThrowError(err);
  });

  it('should return error when items are missing name', () => {
    const data = [{}];
    expect(() => { validateRows('heatmap', data); }).toThrowError(err);
  });

  it('should return error when item name is not a string', () => {
    const data = [{ name: 1 }];
    expect(() => { validateRows('heatmap', data); }).toThrowError(err);
  });

  it('should return error when items are missing data prop', () => {
    const data = [{ name: 'a' }];
    expect(() => { validateRows('heatmap', data); }).toThrowError(err);
  });

  it('should return error when data prop is not an array', () => {
    const data = [{ data: {}, name: 'a' }];
    expect(() => { validateRows('heatmap', data); }).toThrowError(err);
  });

  it('should return error when data array items are null', () => {
    const data = [{ data: [null], name: 'a' }];
    expect(() => { validateRows('heatmap', data); }).toThrowError(err);
  });

  it('should return error when data array items are not objects', () => {
    const data = [{ data: ['a'], name: 'a' }];
    expect(() => { validateRows('heatmap', data); }).toThrowError(err);
  });

  it('should return error when data array items are missing value prop', () => {
    const data = [{ data: [{}], name: 'a' }];
    expect(() => { validateRows('heatmap', data); }).toThrowError(err);
  });

  it('should return row data', () => {
    const data = [{ data: [{ value: 1 }], name: 'a' }];
    expect(validateRows('heatmap', data)).toEqual(data);
  });

  describe('when image type is "dotplot"', () => {
    it('should return error when data array items are missing ratio prop', () => {
      const data = [{ data: [{ value: 1 }], name: 'a' }];
      expect(() => { validateRows('dotplot', data); }).toThrowError(err);
    });

    it('should return error when data array items are missing score prop', () => {
      const data = [{ data: [{ ratio: 0.5, value: 1 }], name: 'a' }];
      expect(() => { validateRows('dotplot', data); }).toThrowError(err);
    });

    it('should return row data', () => {
      const data = [{ data: [{ ratio: 0.5, score: 0.01, value: 1 }], name: 'a' }];
      expect(validateRows('dotplot', data)).toEqual(data);
    });
  });
});

describe('Validate row order', () => {
  const err = new Error('Invalid row order array');

  it('should return error when falsy', () => {
    const data = undefined;
    expect(() => { validateRowOrder(data); }).toThrowError(err);
  });

  it('should return error when not an array', () => {
    const data = {};
    expect(() => { validateRowOrder(data); }).toThrowError(err);
  });

  it('should return error when array is empty', () => {
    const data = [];
    expect(() => { validateRowOrder(data); }).toThrowError(err);
  });

  it('should return error when array elements are not all numbers', () => {
    const data = ['a', 'b', 2];
    expect(() => { validateRowOrder(data); }).toThrowError(err);
  });

  it('should array when valid', () => {
    const data = [1, 2, 3];
    expect(validateRowOrder(data)).toEqual(data);
  });
});
