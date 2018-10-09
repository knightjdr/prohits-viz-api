const shouldResolve = (curr, total, resolve) => {
  if (curr === total) {
    resolve();
  }
};

module.exports = shouldResolve;
