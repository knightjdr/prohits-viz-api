import downloadFile from './download-file';
import exists from '../../helpers/download/exists';
import readFile from './read-file';
import readStream from '../../helpers/download/read-stream';

jest.mock('../../config/config', () => ({
  workDir: 'tmp/',
}));
jest.mock('../../helpers/download/exists');
exists.mockResolvedValue();
jest.mock('./read-file');
readFile.mockResolvedValue('svg/file.svg');
jest.mock('../../helpers/download/read-stream');
readStream.mockResolvedValue();

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
      expect(readStream).toHaveBeenCalledWith('tmp/folder', 'svg/file.svg', res, true);
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
