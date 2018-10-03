const shouldResolve = (curr, total, resolveTasks, resolve) => {
  if (curr === total) {
    resolve(resolveTasks);
  }
};

module.exports = shouldResolve;
