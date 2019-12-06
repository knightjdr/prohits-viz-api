import dotplot from './dotplot/create.js';
import gprofiler from './gprofiler/gprofiler.js';

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

export default analysis;
