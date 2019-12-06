import heatmap from './heatmap/heatmap.js';

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
      res.status(422);
      res.end();
      break;
  }
};

export default exportContent;
