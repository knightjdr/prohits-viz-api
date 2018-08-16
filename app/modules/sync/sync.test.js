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

const socket = {
  emit: jest.fn(),
};

describe('Call sync promise', () => {
  describe('with successful file write', () => {
    let result;

    beforeAll(async (done) => {
      sync(socket, {})
        .then((value) => {
          result = value;
          done();
        });
    });

    it('should resolve with status 200', () => {
      expect(result.status).toBe(200);
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
      expect(writeCallback).toHaveBeenCalledWith('err', socket, 'testdir');
    });
  });
});
