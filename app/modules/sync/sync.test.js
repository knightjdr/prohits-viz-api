const fs = require('fs');

const writeCallback = require('./write-callback');
const workDir = require('../helpers/work-dir');
const validate = require('./validate');

fs.mkdirSync = jest.fn();
fs.writeFile = jest.fn().mockImplementation((file, string, encoding, cb) => {
  cb('err');
});
jest.mock('./write-callback');
jest.mock('../helpers/work-dir');
workDir.mockReturnValue('testdir');
validate.validateSync = jest.fn().mockReturnValue({});

const sync = require('./sync');

const req = {
  body: {},
};
const res = {
  end: jest.fn(),
  locals: {
    socket: { emit: jest.fn() },
  },
  status: jest.fn(),
};

describe('Call sync promise', () => {
  describe('with successful file write', () => {
    beforeAll(() => {
      sync(req, res);
    });

    it('should resolve with default status', () => {
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should end response', () => {
      expect(res.end).toHaveBeenCalled();
    });

    it('should validate body', () => {
      expect(validate.validateSync).toHaveBeenCalledWith({});
    });

    it('should create work directory', () => {
      expect(workDir).toHaveBeenCalled();
    });

    it('should create minimap directory', () => {
      expect(fs.mkdirSync).toHaveBeenCalledWith('testdir/minimap');
    });

    it('should create svg directory', () => {
      expect(fs.mkdirSync).toHaveBeenCalledWith('testdir/svg');
    });

    it('should write a file', () => {
      expect(fs.writeFile).toHaveBeenCalled();
      expect(fs.writeFile.mock.calls[0][0]).toBe('testdir/map.json');
      expect(fs.writeFile.mock.calls[0][1]).toBe('{}');
      expect(fs.writeFile.mock.calls[0][2]).toBe('utf8');
    });

    it('should call write callback', () => {
      expect(writeCallback).toHaveBeenCalledWith('err', res.locals.socket, 'testdir');
    });
  });
});
