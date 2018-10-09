const dotplot = require('./dotplot/dotplot');
const go = require('./go/go');

const analysis = (req, res) => {
  const { type } = req.params;
  switch (type) {
    case 'dotplot':
      dotplot(req, res);
      break;
    case 'go':
      go(req, res);
      break;
    default:
      res.status(422);
      res.end();
      break;
  }
};

module.exports = analysis;
