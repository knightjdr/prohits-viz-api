import validateFields from './validate-types.js';

const validator = jest.fn();
validator.mockReturnValueOnce({ value: 20 });
validator.mockReturnValueOnce({ error: 'test message' });
validator.mockReturnValueOnce({ value: 'blueBlack' });

describe('Validation iterator', () => {
  it('should return validated data object', () => {
    const data = {
      abundanceCap: 20,
      clusteringMethod: 'unknown',
      fillColor: 'blueBlack',
    };
    const fieldsToValidate = ['abundanceCap', 'clusteringMethod', 'fillColor'];

    const expected = {
      errors: {
        clusteringMethod: 'test message',
      },
      values: {
        abundanceCap: 20,
        fillColor: 'blueBlack',
      },
    };
    const actualData = validateFields(fieldsToValidate, data, validator);
    expect(actualData).toEqual(expected);
  });
});
