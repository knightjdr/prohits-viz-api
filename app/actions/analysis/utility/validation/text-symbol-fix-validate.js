import { parseArray } from '../../../../utils/parse-form.js';

const validateTextSymbolFix = (fields) => {
  const {
    columns: inputColumns,
  } = fields;

  const errors = {};

  const columns = parseArray(inputColumns);

  return {
    fields: {
      columns,
    },
    errors,
  };
};

export default validateTextSymbolFix;
