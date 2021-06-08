import downloadFile from '../utils/download-ftp.js';
import fetchJSON from '../utils/fetch-json.js';

import { getHGNCVersion, getUniprotVersion } from './get-versions.js';

jest.mock('../utils/download-ftp.js');
jest.mock('../utils/fetch-json.js');

describe('Get HGNC version', () => {
  let version = '';
  beforeAll(async () => {
    fetchJSON.mockClear();
    fetchJSON.mockResolvedValue({
      lastModified: '2021-06-05T10:09:20.58Z',
      numDoc: 38760,
    });

    version = await getHGNCVersion('http://test.org/info');
  });

  it('should return the last modified date', () => {
    const expected = '2021-06-05';
    expect(version).toBe(expected);
  });

  it('should call downloadFile', () => {
    expect(fetchJSON).toHaveBeenCalledWith('http://test.org/info', { Accept: 'application/json' });
  });
});

describe('Get UniProt version', () => {
  let version = '';
  beforeAll(async () => {
    downloadFile.mockClear();
    downloadFile.mockResolvedValue(`
    UniProt Release 2021_02

    The UniProt consortium European Bioinformatics Institute (EBI), SIB Swiss 
    Institute of Bioinformatics and Protein Information Resource (PIR), 
    is pleased to announce UniProt Knowledgebase (UniProtKB) Release 
    2021_02 (07-Apr-2021). UniProt (Universal Protein Resource) is a 
    comprehensive catalog of information on proteins.
    `);

    version = await getUniprotVersion('ftp.test.org', 'pub/file.txt');
  });

  it('should return the latest version number', () => {
    const expected = '2021_02';
    expect(version).toBe(expected);
  });

  it('should call downloadFile', () => {
    expect(downloadFile).toHaveBeenCalledWith('ftp.test.org', 'pub/file.txt');
  });
});
