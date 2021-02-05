import validateParameters from './validate-parameters.js';

describe('Validate user parameters', () => {
  it('should throw error for missing paramaters property', () => {
    const parameters = undefined;
    const expected = 'The JSON object must have a "parameters" property with an object containing analysis parameters';
    expect(() => validateParameters(parameters)).toThrow(expected);
  });

  it('should throw error for incorrectly defined paramaters', () => {
    const parameters = [];
    const expected = 'The JSON object must have a "parameters" property with an object containing analysis parameters';
    expect(() => validateParameters(parameters)).toThrow(expected);
  });

  it('should throw error for missing image type', () => {
    const parameters = {};
    const expected = 'The image type must be specified in the parameters object and be of a supported type';
    expect(() => validateParameters(parameters)).toThrow(expected);
  });

  it('should throw error for unsupported image type', () => {
    const parameters = {
      imageType: 'unknown',
    };
    const expected = 'The image type must be specified in the parameters object and be of a supported type';
    expect(() => validateParameters(parameters)).toThrow(expected);
  });
});
