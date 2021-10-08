import validateSpecificity from './saint-specificity-validate.js';

describe('Validate saint_specificity utility fields', () => {
  it('should handle valid fields', () => {
    const fields = {
      controlSubtract: true,
      metric: 'fe',
    };
    const expected = {
      errors: {},
      fields: {
        controlSubtract: true,
        metric: 'fe',
      },
    };
    expect(validateSpecificity(fields)).toEqual(expected);
  });

  it('should handle metric error for invalid option', () => {
    const fields = {
      controlSubtract: true,
      metric: 'metric',
    };
    const expected = {
      errors: { metric: 'Invalid metric option' },
      fields: {
        controlSubtract: true,
        metric: 'metric',
      },
    };
    expect(validateSpecificity(fields)).toEqual(expected);
  });
});
