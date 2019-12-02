const iterator = require('./iterator');

const validator = jest.fn();
validator.mockReturnValueOnce(20);
validator.mockReturnValueOnce(null);
validator.mockReturnValueOnce(new Error());
validator.mockReturnValueOnce('blueBlack');

describe('Validation iterator', () => {
  const errs = [];
  let validatedData;

  beforeAll(() => {
    const data = {
      abundanceCap: 20,
      annotations: {},
    };
    const defaults = {
      abundanceCap: 50,
      fillColor: 'blueBlack',
    };
    const props = ['abundanceCap', 'annotations', 'column', 'fillColor'];
    validatedData = iterator(props, data, defaults, validator, errs);
  });

  it('should return validated data object', () => {
    const expected = {
      abundanceCap: 20,
      fillColor: 'blueBlack',
    };
    expect(validatedData).toEqual(expected);
  });

  it('should push errors to err argument', () => {
    expect(errs.length).toBe(1);
  });
});
