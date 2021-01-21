import getSocket from './get-socket.js';

describe('Get socket', () => {
  it('should add object to res locals', () => {
    const req = {
      app: {
        get: () => ({
          sockets: {
            sockets: {
              get: () => 'test',
            },
          },
        }),
      },
      get: () => 'id',
    };
    const res = { locals: {} };
    getSocket(req, res, () => {
      expect(res.locals.socket).toBe('test');
    });
  });
});
