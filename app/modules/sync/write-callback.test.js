const spawnProcess = require('./spawn');

const writeCallback = require('./write-callback');

jest.mock('./spawn');

const socket = {
  emit: jest.fn(),
};

describe('Callback after json write', () => {
  it('should called spanwProcess when there is no error', () => {
    writeCallback(0, socket, 'testdir/');
    expect(spawnProcess).toHaveBeenCalledWith(socket, 'testdir/');
  });

  it('should call socket.emit when there is an error', () => {
    writeCallback(1, socket, 'testdir/');
    expect(socket.emit).toHaveBeenCalledWith('action', { type: 'SYNC_ERROR' });
  });
});
