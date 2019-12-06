import checkUserAuth from '../helpers/third-party/check-user-auth.js';

export const forbidden = (res) => {
  res.status(403);
  res.end();
};

const urlRE = new RegExp(/third-party/);

export const isRequestAuthorized = (req, sessions, sessionID) => (
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
export const isOriginAuthorized = async (req, res, next) => {
  const sessionID = req.get('session');
  const sessions = req.app.get('sessions');
  if (isRequestAuthorized(req, sessions, sessionID)) {
    next();
  } else {
    forbidden(res);
  }
};
