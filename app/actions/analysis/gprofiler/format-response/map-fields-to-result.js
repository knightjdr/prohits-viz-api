const fieldMap = {
  intersection_size: 'intersectionSize',
  name: 'term',
  native: 'id',
  p_value: 'pValue',
  query_size: 'querySize',
  source: 'source',
  term_size: 'termSize',
};

const mapFieldsToResult = result => (
  Object.entries(fieldMap).reduce((accum, [incomingField, outgoingField]) => ({
    ...accum,
    [outgoingField]: result[incomingField],
  }), {})
);

export default mapFieldsToResult;
