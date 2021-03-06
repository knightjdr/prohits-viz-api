const mapFromValuesToKeys = obj => (
  Object.entries(obj).reduce((accum, [key, value]) => ({
    ...accum,
    [value]: key,
  }), {})
);

export default mapFromValuesToKeys;
