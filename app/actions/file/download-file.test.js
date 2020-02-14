import downloadFile from './download-file.js';
import exists from '../../helpers/download/exists.js';
import readStream from '../../helpers/download/read-stream.js';

jest.mock('../../config/config', () => ({
  workDir: 'tmp/',
}));
jest.mock('../../helpers/download/exists');
exists.mockResolvedValue();
jest.mock('../../helpers/download/read-stream');
readStream.mockResolvedValue();

const req = {
  params: { file: 'folder/svg/image.svg' },
};
const res = {
  end: jest.fn(),
  status: jest.fn(),
};

describe('Downloading a file', () => {
  describe('successfully', () => {
    beforeAll(async () => {
      await downloadFile(req, res);
    });

    it('should check if file exists', () => {
      expect(exists).toHaveBeenCalledWith('tmp/folder/svg/image.svg', res);
    });

    it('should stream file to download', () => {
      expect(readStream).toHaveBeenCalledWith('tmp/folder/svg/image.svg', res, true);
    });

    it('should not end response', () => {
      expect(res.end).not.toHaveBeenCalled();
    });
  });

  describe('unsuccessfully', () => {
    beforeAll(async () => {
      exists.mockRejectedValue();
      await downloadFile(req, res);
    });

    it('should set status code response', () => {
      expect(res.status).toHaveBeenCalledWith(500);
    });

    it('should end response', () => {
      expect(res.end).toHaveBeenCalled();
    });
  });
});
