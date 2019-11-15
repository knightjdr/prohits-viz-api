const socketIo = require('socket.io');

const addSession = (app, id) => {
  app.set('sessions', [...app.get('sessions'), id]);
};

const removeSession = (app, id) => {
  const sessions = [...app.get('sessions')];
  if (sessions.includes(id)) {
    const index = sessions.indexOf(id);
    sessions.splice(index, 1);
    app.set('sessions', sessions);
  }
};

const configureSocket = (app, server) => {
  const io = socketIo(server, { path: '/ws' });

  app.set('sessions', []);

  io.on('connection', (client) => {
    const { id } = client;
    addSession(app, id);
    client.emit('action', { id, type: 'SET_SESSION_ID' });
    client.on('disconnect', () => {
      removeSession(app, id);
    });
  });
  app.set('socketio', io);
};

module.exports = configureSocket;
