/* eslint quotes: 0 */

const isJson = require('../../../utils/is-json');

const validTypes = ['dotplot', 'heatmap', 'scatter'];

// Validates that an input body is JSON formatted and has the
// necessary fields and values for the interactive viewer. If the analysis
// type is "dotplot" or "heatmap", this includes checking for the "column"
// and "rows" props.
const validate = (body) => {
  const json = isJson(body, false);

  // If the json is not valid, return err.
  if (!json) {
    return {
      err: new Error('Invalid body format'),
    };
  }

  const { columns, parameters, rows } = json;

  // The file should have a "parameters" key that is an object.
  if (
    !Object.prototype.hasOwnProperty.call(json, 'parameters') ||
    Object.prototype.toString.call(json.parameters) !== '[object Object]'
  ) {
    return {
      err: new Error("The request body must have a 'parameters' property with an object containing analysis parameters"),
    };
  }

  // The image type should be specified.
  if (
    !parameters.imageType ||
    !validTypes.includes(parameters.imageType)
  ) {
    return {
      err: new Error("The image type must be specified in the parameters object and be of a supported type"),
    };
  }

  // Validate dotplot/heatmaps.
  if (
    parameters.imageType === 'dotplot' ||
    parameters.imageType === 'heatmap'
  ) {
    // The file should have a "column" key containing a "names" array.
    if (
      !columns ||
      Object.prototype.toString.call(columns) !== '[object Object]' ||
      !Object.prototype.hasOwnProperty.call(columns, 'names') ||
      !Array.isArray(columns.names)
    ) {
      return {
        err: new Error("The request body must have a 'columns' property with an array of column names"),
      };
    }

    // The file should have a "rows" key with an array list.
    if (
      !rows ||
      Object.prototype.toString.call(rows) !== '[object Object]' ||
      !Object.prototype.hasOwnProperty.call(rows, 'list') ||
      !Array.isArray(rows.list)
    ) {
      return {
        err: new Error("The request body must have a 'rows' property with a list of row values"),
      };
    }

    // The row entries should have "data" and "name" props.
    if (
      rows.list.length === 0 ||
      Object.prototype.toString.call(rows.list[0]) !== '[object Object]' ||
      !Object.prototype.hasOwnProperty.call(rows.list[0], 'data') ||
      !Object.prototype.hasOwnProperty.call(rows.list[0], 'name')
    ) {
      return {
        err: new Error("Each entry in 'rows.list' should have a 'data' and 'name' prop"),
      };
    }

    // The row data prop should be an array with a "value" key.
    if (
      !Array.isArray(rows.list[0].data) ||
      Object.prototype.toString.call(rows.list[0].data[0]) !== '[object Object]' ||
      !Object.prototype.hasOwnProperty.call(rows.list[0].data[0], 'value')
    ) {
      return {
        err: new Error("The row data should be an array of objects with at least a 'value' key"),
      };
    }
  }

  return {
    err: false,
    json,
  };
};

module.exports = validate;
