// Attaches the socket session to the request.
const getSocket = (req, res, next) => {
  res.locals.socket = req.app.get('socketio').sockets.connected[req.get('Session')];
  next();
};

module.exports = getSocket;
