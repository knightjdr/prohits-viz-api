import validateOptionalFields from './validate-optional-fields.js';

describe('Validate optional fields', () => {
  it('should return optional fields that exist', () => {
    const data = {
      fieldA: 'a',
      fieldC: 'c',
    };
    const fields = ['fieldA', 'fieldB', 'fieldC'];

    const expected = data;
    expect(validateOptionalFields(fields, data)).toEqual(expected);
  });
});
