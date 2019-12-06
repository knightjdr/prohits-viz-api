/* Formats an array of command line argument to use when
spawning a child process. */
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

export default flags;
