const socketIo = require('socket.io');

const socketConfig = (app, server) => {
  // Set up socket.
  const io = socketIo(server, { path: '/ws' });
  app.set('sessions', []);
  io.on('connection', (client) => {
    const { id } = client;
    app.set('sessions', [...app.get('sessions'), id]);
    client.emit('action', { id, type: 'SET_SESSION_ID' });
    client.on('disconnect', () => {
      const sessions = [...app.get('sessions')];
      const index = sessions.indexOf(id);
      if (index >= 0) {
        sessions.splice(index, 1);
        app.set('sessions', sessions);
      }
    });
  });
  app.set('socketio', io);
};

module.exports = socketConfig;
