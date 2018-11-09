const config = require('../config');

const getOrigins = () => (
  [config.origin, ...config.thirdPartyOrigins]
);

/* This middleware checks to see if the endpoint is being accessed by
** an authorized origin. Currently any origin can access API endpoints at
** /api/third-pary, but only prohits-viz can access the others. */
const authorizedOrigin = (req, res, next) => {
  const origins = getOrigins();
  const re = new RegExp(/^\/api\/third-party/);
  if (
    req.originalUrl.search(re) > -1 ||
    origins.includes(req.get('origin'))
  ) {
    next();
  } else {
    res.status(403);
    res.end();
  }
};

module.exports = authorizedOrigin;
