// Attaches the socket session to the request.
const getSocket = (req, res, next) => {
  res.locals.socket = req.app.get('socketio').sockets.sockets.get(req.get('Session'));
  next();
};

export default getSocket;
