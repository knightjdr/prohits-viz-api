import gprofiler from './gprofiler/gprofiler.js';

const analysis = (req, res) => {
  const { type } = req.params;
  switch (type) {
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
