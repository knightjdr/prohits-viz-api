import ValidateJson from './validate';

describe('Validate Json', () => {
  it('should return error for invalid JSON', () => {
    const json = ValidateJson(1234);
    expect(json.err).toEqual(new Error('Invalid body format'));
  });

  describe('invalid parameters', () => {
    const expectedErr = new Error("The request body must have a 'parameters' property with an object containing analysis parameters");

    it('should return an error for missing parameters prop', () => {
      const body = {};
      const json = ValidateJson(body);
      expect(json.err).toEqual(expectedErr);
    });

    it('should return an error for parameters value not equal to an object ', () => {
      const body = { parameters: [] };
      const json = ValidateJson(body);
      expect(json.err).toEqual(expectedErr);
    });
  });

  describe('image type', () => {
    const expectedErr = new Error('The image type must be specified in the parameters object and be of a supported type');

    it('should return an error for missing image type', () => {
      const body = { parameters: {} };
      const json = ValidateJson(body);
      expect(json.err).toEqual(expectedErr);
    });

    it('should return an error for unsupported image type', () => {
      const body = {
        parameters: { imageType: 'something' },
      };
      const json = ValidateJson(body);
      expect(json.err).toEqual(expectedErr);
    });
  });

  describe('heatmap validation', () => {
    describe('columns', () => {
      const expectedErr = new Error("The request body must have a 'columns' property with an array of column names");

      it('should return an error for missing column prop', () => {
        const body = {
          parameters: { imageType: 'dotplot' },
        };
        const json = ValidateJson(body);
        expect(json.err).toEqual(expectedErr);
      });

      it('should return an error when columns is not an object', () => {
        const body = {
          columns: [],
          parameters: { imageType: 'dotplot' },
        };
        const json = ValidateJson(body);
        expect(json.err).toEqual(expectedErr);
      });

      it('should return an error when columns does not have a names prop', () => {
        const body = {
          columns: {},
          parameters: { imageType: 'dotplot' },
        };
        const json = ValidateJson(body);
        expect(json.err).toEqual(expectedErr);
      });

      it('should return an error when columns.names is not an array', () => {
        const body = {
          columns: { names: { } },
          parameters: { imageType: 'dotplot' },
        };
        const json = ValidateJson(body);
        expect(json.err).toEqual(expectedErr);
      });
    });

    describe('rows', () => {
      describe('rows list', () => {
        const expectedErr = new Error("The request body must have a 'rows' property with a list of row values");

        it('should return an error for missing row prop', () => {
          const body = {
            columns: { names: [] },
            parameters: { imageType: 'dotplot' },
          };
          const json = ValidateJson(body);
          expect(json.err).toEqual(expectedErr);
        });

        it('should return an error when rows is not an object', () => {
          const body = {
            columns: { names: [] },
            parameters: { imageType: 'dotplot' },
            rows: [],
          };
          const json = ValidateJson(body);
          expect(json.err).toEqual(expectedErr);
        });

        it('should return an error when rows does not have a list prop', () => {
          const body = {
            columns: { names: [] },
            parameters: { imageType: 'dotplot' },
            rows: {},
          };
          const json = ValidateJson(body);
          expect(json.err).toEqual(expectedErr);
        });

        it('should return an error when rows.list is not an array', () => {
          const body = {
            columns: { names: [] },
            parameters: { imageType: 'dotplot' },
            rows: { list: {} },
          };
          const json = ValidateJson(body);
          expect(json.err).toEqual(expectedErr);
        });
      });

      describe('row entries', () => {
        const expectedErr = new Error("Each entry in 'rows.list' should have a 'data' and 'name' prop");

        it('should return an error when rows.list empty', () => {
          const body = {
            columns: { names: [] },
            parameters: { imageType: 'dotplot' },
            rows: { list: [] },
          };
          const json = ValidateJson(body);
          expect(json.err).toEqual(expectedErr);
        });

        it('should return an error when list items are not objects', () => {
          const body = {
            columns: { names: [] },
            parameters: { imageType: 'dotplot' },
            rows: { list: ['a'] },
          };
          const json = ValidateJson(body);
          expect(json.err).toEqual(expectedErr);
        });

        it('should return an error when list items missing data prop', () => {
          const body = {
            columns: { names: [] },
            parameters: { imageType: 'dotplot' },
            rows: { list: [{}] },
          };
          const json = ValidateJson(body);
          expect(json.err).toEqual(expectedErr);
        });

        it('should return an error when list items missing name prop', () => {
          const body = {
            columns: { names: [] },
            parameters: { imageType: 'dotplot' },
            rows: { list: [{ data: [] }] },
          };
          const json = ValidateJson(body);
          expect(json.err).toEqual(expectedErr);
        });
      });

      describe('row entry data', () => {
        const expectedErr = new Error("The row data should be an array of objects with at least a 'value' key");

        it('should return an error when rows.list.data is not an array', () => {
          const body = {
            columns: { names: [] },
            parameters: { imageType: 'dotplot' },
            rows: {
              list: [
                { data: {}, name: 'a' },
              ],
            },
          };
          const json = ValidateJson(body);
          expect(json.err).toEqual(expectedErr);
        });

        it('should return an error when rows.list.data entries are not objects', () => {
          const body = {
            columns: { names: [] },
            parameters: { imageType: 'dotplot' },
            rows: {
              list: [
                { data: ['a'], name: 'a' },
              ],
            },
          };
          const json = ValidateJson(body);
          expect(json.err).toEqual(expectedErr);
        });

        it('should return an error when rows.list.data entries are missing value prop', () => {
          const body = {
            columns: { names: [] },
            parameters: { imageType: 'dotplot' },
            rows: {
              list: [
                { data: [{}], name: 'a' },
              ],
            },
          };
          const json = ValidateJson(body);
          expect(json.err).toEqual(expectedErr);
        });
      });
    });
  });

  describe('valid dotplot data', () => {
    let body;
    let json;

    beforeAll(() => {
      body = {
        columns: { names: ['a', 'b'] },
        parameters: { imageType: 'dotplot' },
        rows: {
          list: [
            {
              data: [{ ratio: 1, score: 0.01, value: 1 }],
              name: 'test',
            },
          ],
        },
      };
      json = ValidateJson(body);
    });

    it('should not return an err', () => {
      expect(json.err).toBeFalsy();
    });

    it('should return body', () => {
      expect(json.json).toEqual(body);
    });
  });

  describe('valid heatmap data', () => {
    let body;
    let json;

    beforeAll(() => {
      body = {
        columns: { names: ['a', 'b'] },
        parameters: { imageType: 'heatmap' },
        rows: {
          list: [
            {
              data: [{ value: 1 }],
              name: 'test',
            },
          ],
        },
      };
      json = ValidateJson(body);
    });

    it('should not return an err', () => {
      expect(json.err).toBeFalsy();
    });

    it('should return body', () => {
      expect(json.json).toEqual(body);
    });
  });
});
