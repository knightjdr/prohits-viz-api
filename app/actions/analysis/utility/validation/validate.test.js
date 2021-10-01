import validate from './validate.js';

describe('Validate utility fields', () => {
  it('should validate utility fields with file', () => {
    const fields = {
      imageType: 'dotplot',
      utility: 'pvconvert',
    };
    const file = [{ originalName: 'file.txt' }];

    const expected = {
      errors: {},
      fields: {
        imageType: 'dotplot',
        utility: 'pvconvert',
      },
    };
    expect(validate(fields, file)).toEqual(expected);
  });

  it('should return errors for invalid fields', () => {
    const fields = {
      imageType: 'unknown',
      utility: 'pvconvert',
    };
    const file = [];

    const expected = {
      errors: {
        files: 'missing file',
        imageType: 'Invalid image type',
      },
      fields: {
        imageType: 'unknown',
        utility: 'pvconvert',
      },
    };
    expect(validate(fields, file)).toEqual(expected);
  });
});
