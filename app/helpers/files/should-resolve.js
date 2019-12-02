const shouldResolve = (curr, total, resolve, resolveValue) => {
  if (curr >= total) {
    resolve(resolveValue);
  }
};

module.exports = shouldResolve;
