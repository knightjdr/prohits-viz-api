const parseBackground = require('./parse-background');

const addBackground = (scope, body, defaultScope) => {
  const options = {};

  if (scope === 'custom') {
    const background = parseBackground(body.background);
    if (background.length > 0) {
      options.background = background;
    } else {
      options.domain_scope = defaultScope;
    }
  }

  return options;
};

module.exports = addBackground;
