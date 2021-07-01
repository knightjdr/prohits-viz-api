import validatePVConvert from './pvconvert-validate.js';

describe('Validate pvconvert utility fields', () => {
  it('should handle valid fields', () => {
    const fields = { imageType: 'dotplot' };
    const expected = {
      errors: {},
      fields: { imageType: 'dotplot' },
    };
    expect(validatePVConvert(fields)).toEqual(expected);
  });

  it('should handle fields with errors', () => {
    const fields = { imageType: 'other' };
    const expected = {
      errors: { imageType: 'Invalid image type' },
      fields: { imageType: 'other' },
    };
    expect(validatePVConvert(fields)).toEqual(expected);
  });
});
