const path = require('path');

/* Removes the extension for an array of files and
** appends the file name to the arr argument. */
const stripExt = (files, arr) => (
  files.reduce((accum, file) => ([
    ...accum,
    path.parse(file).name,
  ]), [...arr])
);

module.exports = stripExt;
