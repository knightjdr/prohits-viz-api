import fs from 'fs/promises';
import mockFS from 'mock-fs';

import createWorkDir from '../../../helpers/files/create-work-dir.js';
import handleVizFile from './handle-viz-file.js';
import logger from '../../../helpers/logging/logger.js';
import validate from './validate.js';

jest.mock('../../../helpers/files/create-work-dir');
jest.mock('../../../helpers/logging/logger.js');
jest.mock('./validate');

const mockedFileSystem = {
  tmp: {
    test1: {},
  },
};
mockFS(mockedFileSystem);

const req = {
  body: {},
};
const res = {
  send: jest.fn(),
  status: jest.fn(),
};

afterAll(() => {
  mockFS.restore();
});

describe('Third party viz', () => {
  describe('with validation error', () => {
    beforeAll(async () => {
      logger.error.mockClear();
      res.send.mockClear();
      res.status.mockClear();
      validate.mockImplementation(() => {
        throw new Error('validation error');
      });
      await handleVizFile(req, res);
    });

    it('should log error', () => {
      expect(logger.error).toHaveBeenCalledWith('third party viz - Error: validation error');
    });

    it('should set response status', () => {
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should send response', () => {
      expect(res.send).toHaveBeenCalledWith({ message: 'Error: validation error' });
    });
  });

  describe('with valid data', () => {
    beforeAll(async () => {
      res.send.mockClear();
      res.status.mockClear();
      validate.mockReturnValue({
        parameters: { imageType: 'dotplot' },
      });
      createWorkDir.mockResolvedValue('tmp/test1');
      await handleVizFile(req, res);
    });

    it('should create interactive subfolder', async () => (
      expect(fs.stat('tmp/test1/interactive')).resolves.toBeTruthy()
    ));

    it('should write request body to file', async () => {
      const expectedContents = {
        parameters: { imageType: 'dotplot' },
      };
      const data = await fs.readFile('tmp/test1/interactive/dotplot.json', 'utf8');
      expect(data).toBe(JSON.stringify(expectedContents, null, 2));
    });

    it('should send response with url', () => {
      expect(res.send).toHaveBeenCalledWith({ url: 'http://localhost:3000/visualization/test1/dotplot' });
    });
  });
});
