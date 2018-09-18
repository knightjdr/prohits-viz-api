const go = require('./go/go');

const analysis = (req, res) => {
  const { type } = req.params;
  switch (type) {
    case 'go':
      go(req, res);
      break;
    default:
      break;
  }
};

module.exports = analysis;
