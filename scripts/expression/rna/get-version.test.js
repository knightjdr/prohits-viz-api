/* eslint-disable max-len */
import fetchText from '../../utils/fetch-text.js';

import getHPAVersion from './get-version.js';

jest.mock('../../utils/fetch-text.js');

describe('Get HPA version', () => {
  let version = '';
  beforeAll(async () => {
    fetchText.mockClear();
    fetchText.mockResolvedValue(`
    <html>
      <body>
        <table>
          <tbody>
            <td>
              <b>Search results</b>
              <br>
              The data files represented here includes data available in the Human Protein Atlas version 20.1. A subset of this data can also be downloaded from the Search page with the genes corresponding to the current search result in the result in different formats; XML, RDF, TSV & JSON.
              <hr>
            </td>
          </tbody>
        </table>
      </body>
    </html>
    `);

    version = await getHPAVersion('https://test.org');
  });

  it('should return the version number', () => {
    const expected = '20.1';
    expect(version).toBe(expected);
  });

  it('should call fetchText function', () => {
    expect(fetchText).toHaveBeenCalledWith('https://test.org');
  });
});
