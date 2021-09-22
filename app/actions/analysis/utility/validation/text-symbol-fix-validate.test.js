import validateTextSymbolFix from './text-symbol-fix-validate.js';

const validFields = {
  columns: [],
};

describe('Validate text_symbol_fix utility fields', () => {
  it('should handle valid fields', () => {
    const fields = validFields;
    const expected = {
      errors: {},
      fields: validFields,
    };
    expect(validateTextSymbolFix(fields)).toEqual(expected);
  });

  describe('columns', () => {
    it('should parse array', () => {
      const fields = {
        ...validFields,
        columns: ['column1', 'column2'],
      };
      const expected = {
        errors: {},
        fields: {
          ...validFields,
          columns: ['column1', 'column2'],
        },
      };
      expect(validateTextSymbolFix(fields)).toEqual(expected);
    });

    it('should parse JSON', () => {
      const fields = {
        ...validFields,
        columns: '["column1", "column2"]',
      };
      const expected = {
        errors: {},
        fields: {
          ...validFields,
          columns: ['column1', 'column2'],
        },
      };
      expect(validateTextSymbolFix(fields)).toEqual(expected);
    });
  });
});
