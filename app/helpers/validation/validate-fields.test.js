import validateFields from './validate-fields';

const validator = jest.fn();
validator.mockReturnValueOnce(20);
validator.mockReturnValueOnce(null);
validator.mockReturnValueOnce('blueBlack');

describe('Validation iterator', () => {
  it('should return validated data object', () => {
    const data = {
      abundanceCap: 20,
      annotations: {},
    };
    const fieldsToValidate = ['abundanceCap', 'annotations', 'fillColor'];

    const expected = {
      abundanceCap: 20,
      fillColor: 'blueBlack',
    };
    const actualData = validateFields(fieldsToValidate, data, validator);
    expect(actualData).toEqual(expected);
  });
});
