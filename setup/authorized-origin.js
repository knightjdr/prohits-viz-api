const validateThirdParty = require('../app/modules/third-party/auth/auth');

const forbidden = (res, err) => {
  if (err) {
    res.statusMessage(err.toString());
  }
  res.status(403);
  res.end();
};

/* This middleware checks to see if the endpoint is being accessed by
** a user connected to prohits-viz.org. It uses their socket ID to confirm.
** Currently any origin can access API endpoints at
** /api/third-pary, but only prohits-viz can access the others. */
const authorizedOrigin = (req, res, next) => {
  const re = new RegExp(/third-party/);
  const sessionID = req.get('session');
  const sessions = req.app.get('sessions');
  if (req.method === 'GET') {
    next();
  } else if (
    req.method === 'POST'
    && sessions.includes(sessionID)
  ) {
    next();
  } else if (req.originalUrl.search(re) > -1) {
    validateThirdParty(req)
      .then(() => { next(); })
      .catch((err) => { forbidden(res, err); });
  } else {
    forbidden(res);
  }
};

module.exports = {
  authorizedOrigin,
  forbidden,
};
