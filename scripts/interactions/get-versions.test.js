import fetchText from '../utils/fetch-text.js';
import listFTP from '../utils/list-ftp.js';

import { getBiogridVersion, getIntactVersion } from './get-versions.js';

jest.mock('../utils/fetch-text.js');
jest.mock('../utils/list-ftp.js');

describe('Get BioGrid version', () => {
  let version = '';
  beforeAll(async () => {
    fetchText.mockClear();
    fetchText.mockResolvedValue(`
    <html>
      <body>
        <a href="https://test.org/releases">link</a>
        <a href="https://downloads.thebiogrid.org/BioGRID/Release-Archive/BIOGRID-4.1.1/">link</a>
        <a href="https://downloads.thebiogrid.org/BioGRID/Release-Archive/BIOGRID-4.1.0/">link</a>
      </body>
    </html>
    `);

    version = await getBiogridVersion('https://test.org');
  });

  it('should return the latest version number', () => {
    const expected = '4.1.1';
    expect(version).toBe(expected);
  });

  it('should call fetchText function', () => {
    expect(fetchText).toHaveBeenCalledWith('https://test.org');
  });
});

describe('Get Intact version', () => {
  let version = '';
  beforeAll(async () => {
    listFTP.mockClear();
    listFTP.mockResolvedValue([
      { name: '2010-01-01' },
      { name: '2021-01-01' },
      { name: '2016-01-01' },
      { name: 'current' },
    ]);

    version = await getIntactVersion('ftp.test.org', '/pub/');
  });

  it('should return the latest version date', () => {
    const expected = '2021-01-01';
    expect(version).toBe(expected);
  });

  it('should call listFTP', () => {
    expect(listFTP).toHaveBeenCalledWith('ftp.test.org', '/pub/');
  });
});
