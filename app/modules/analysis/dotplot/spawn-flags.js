const flags = obj => (
  Object.entries(obj).reduce((accum, [key, value]) => {
    if (value === 'true') {
      accum.push(`-${key}`);
    } else if (value) {
      accum.push(`-${key}`);
      accum.push(value);
    }
    return accum;
  }, [])
);

module.exports = flags;
