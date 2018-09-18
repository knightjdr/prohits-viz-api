const heatmap = require('./heatmap/heatmap');

const exportContent = (req, res) => {
  const { type } = req.params;
  switch (type) {
    case 'dotplot':
      heatmap(req, res);
      break;
    case 'heatmap':
      heatmap(req, res);
      break;
    default:
      break;
  }
};

module.exports = exportContent;
