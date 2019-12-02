const addSources = (defaultSources, body) => (
  defaultSources.reduce((accum, source) => (
    body[source] === undefined || body[source]
      ? [...accum, source]
      : accum
  ), [])
);

module.exports = addSources;
