const config = require('../config');
const urlDetails = require('../app/modules/helpers/url-details');

const getOrigins = () => (
  [config.origin, ...config.thirdPartyOrigins]
);

/* This middleware checks to see if the endpoint is being accessed by
** an authorized origin. Currently any origin can access API endpoints at
** /api/third-pary, but only prohits-viz can access the others. */
const authorizedOrigin = (req, res, next) => {
  const origins = getOrigins();
  const re = new RegExp(/third-party/);
  const url = urlDetails(req);
  if (
    req.originalUrl.search(re) > -1 ||
    origins.includes(url.host)
  ) {
    next();
  } else {
    res.status(403);
    res.end();
  }
};

module.exports = authorizedOrigin;
