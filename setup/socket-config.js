const socketIo = require('socket.io');

const socketConfig = (app, server) => {
  // Set up socket.
  const io = socketIo(server, { path: '/ws' });
  io.on('connection', (client) => {
    client.emit('action', { id: client.id, type: 'SET_SESSION_ID' });
  });
  app.set('socketio', io);
};

module.exports = socketConfig;
