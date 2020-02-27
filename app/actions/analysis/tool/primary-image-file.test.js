import getPrimaryImageFile from './primary-image-file.js';

describe('Get primary analysis image file', () => {
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

  it('should return empty string for other analysis types', () => {
    const settings = {};
    const tool = 'other';

    const expected = '';
    expect(getPrimaryImageFile(tool, settings)).toBe(expected);
  });
});
