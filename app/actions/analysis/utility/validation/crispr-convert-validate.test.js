import validateCrisprConvert from './crispr-convert-validate.js';

describe('Validate crispr_convert utility fields', () => {
  it('should handle tool fields', () => {
    const fields = {
      tool: 'bagel',
    };
    const expected = {
      errors: {},
      fields: {
        tool: 'bagel',
      },
    };
    expect(validateCrisprConvert(fields)).toEqual(expected);
  });

  it('should handle tool error for invalid option', () => {
    const fields = {
      tool: 'unknown',
    };
    const expected = {
      errors: { tool: 'Invalid tool specified' },
      fields: {
        tool: 'unknown',
      },
    };
    expect(validateCrisprConvert(fields)).toEqual(expected);
  });
});
