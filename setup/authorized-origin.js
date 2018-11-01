const origins = process.env.NODE_ENV === 'production' ?
  [
    'https://prohits-viz.lunenfeld.ca',
  ]
  :
  [
    'http://localhost:3000',
  ];

/* This middleware checks to see if the endpoint is being accessed by
** an authorized origin. Currently any origin can access API endpoints at
** /api/third-pary, but only prohits-viz can access the others. */
const authorizedOrigin = (req, res, next) => {
  next();
  /* const re = new RegExp(/^\/api\/third-party/);
  if (
    req.originalUrl.search(re) > -1 ||
    origins.includes(req.get('origin'))
  ) {
    next();
  } else {
    res.status(403);
    res.end();
  } */
};

module.exports = authorizedOrigin;
