import gprofiler from './gprofiler/gprofiler.js';

const analysis = (req, res) => {
  const { tool } = req.params;
  switch (tool) {
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
