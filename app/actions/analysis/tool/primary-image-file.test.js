import getPrimaryImageFile from './primary-image-file.js';

describe('Get primary analysis image file', () => {
  it('should get condition-condition file based on settings', () => {
    const settings = { condition: 'condition' };
    const tool = 'condition-condition';

    const expected = 'condition-condition';
    expect(getPrimaryImageFile(tool, settings)).toBe(expected);
  });

  it('should get correlation file based on settings', () => {
    const settings = { readout: 'readout' };
    const tool = 'correlation';

    const expected = 'readout-readout';
    expect(getPrimaryImageFile(tool, settings)).toBe(expected);
  });

  it('should get dot plot file', () => {
    const settings = {};
    const tool = 'dotplot';

    const expected = 'dotplot';
    expect(getPrimaryImageFile(tool, settings)).toBe(expected);
  });

  it('should get scv file', () => {
    const settings = {};
    const tool = 'scv';

    const expected = 'scv';
    expect(getPrimaryImageFile(tool, settings)).toBe(expected);
  });

  it('should get specificity file', () => {
    const settings = {};
    const tool = 'specificity';

    const expected = 'specificity';
    expect(getPrimaryImageFile(tool, settings)).toBe(expected);
  });

  it('should return empty string for other analysis types', () => {
    const settings = {};
    const tool = 'other';

    const expected = '';
    expect(getPrimaryImageFile(tool, settings)).toBe(expected);
  });
});
