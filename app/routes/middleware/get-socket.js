import logger from '../../helpers/logging/logger.js';

// Attaches the socket session to the request.
const getSocket = (req, res, next) => {
  try {
    res.locals.socket = req.app.get('socketio').sockets.sockets.get(req.get('Session'));
    next();
  } catch (error) {
    logger.error(`get socket - ${error.toString()}`);
    res.status(400);
    res.end();
  }
};

export default getSocket;
