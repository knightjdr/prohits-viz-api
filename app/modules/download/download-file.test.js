const exists = require('./exists');
const readFile = require('./read-file');
const readStream = require('./read-stream');

jest.mock('../../../config', () => ({
  workDir: 'tmp/',
}));
jest.mock('./exists');
exists.mockResolvedValue();
jest.mock('./read-file');
readFile.mockResolvedValue('svg/file.svg');
jest.mock('./read-stream');
readStream.mockResolvedValue();

const downloadFile = require('./download-file');

const req = {
  params: { folder: 'folder' },
};
const res = {
  end: jest.fn(),
  status: jest.fn(),
};

const sleep = ms => (
  new Promise(resolve => setTimeout(resolve, ms))
);

describe('Downloading a file', () => {
  describe('successfully', () => {
    beforeAll(async (done) => {
      downloadFile(req, res);
      await sleep(200);
      done();
    });

    it('should check if file with download instructions exists', () => {
      expect(exists).toHaveBeenCalledWith('tmp/folder/download.txt', res);
    });

    it('should read download instructions', () => {
      expect(readFile).toHaveBeenCalledWith('tmp/folder/download.txt', 'utf8');
    });

    it('should stream file to download', () => {
      expect(readStream).toHaveBeenCalledWith('tmp/folder', 'svg/file.svg', res);
    });

    it('should not end response', () => {
      expect(res.end).not.toHaveBeenCalled();
    });
  });

  describe('unsuccessfully', () => {
    beforeAll(async (done) => {
      readFile.mockRejectedValue();
      downloadFile(req, res);
      await sleep(200);
      done();
    });

    it('should set status code response', () => {
      expect(res.status).toHaveBeenCalledWith(500);
    });

    it('should end response', () => {
      expect(res.end).toHaveBeenCalled();
    });
  });
});
