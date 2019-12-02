const dotplot = require('./dotplot/create');
const gprofiler = require('./gprofiler/gprofiler');

const analysis = (req, res) => {
  const { type } = req.params;
  switch (type) {
    case 'dotplot':
      dotplot(req, res);
      break;
    case 'go':
      gprofiler(req, res);
      break;
    default:
      res.status(422);
      res.end();
      break;
  }
};

module.exports = analysis;
