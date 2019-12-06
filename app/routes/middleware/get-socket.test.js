import getSocket from './get-socket';

describe('Get socket', () => {
  it('should add object to res locals', () => {
    const req = {
      app: {
        get: () => ({
          sockets: {
            connected: { id: 'test' },
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
