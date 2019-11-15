const checkUserAuth = require('../app/modules/third-party/auth/check-user-auth');

const forbidden = (res) => {
  res.status(403);
  res.end();
};

const urlRE = new RegExp(/third-party/);

const isRequestAuthorized = (req, sessions, sessionID) => (
  req.method === 'GET'
  || (
    req.method === 'POST'
    && sessions.includes(sessionID)
  )
  || (
    urlRE.test(req.originalUrl)
    && checkUserAuth(req)
  )
);

/* This middleware checks to see if the endpoint is being accessed by
** a user connected to prohits-viz.org. It uses their socket ID to confirm.
** API endpoints at /api/third-pary are validated using their apikey. */
const isOriginAuthorized = async (req, res, next) => {
  const sessionID = req.get('session');
  const sessions = req.app.get('sessions');
  if (isRequestAuthorized(req, sessions, sessionID)) {
    next();
  } else {
    forbidden(res);
  }
};

module.exports = {
  forbidden,
  isOriginAuthorized,
  isRequestAuthorized,
};
