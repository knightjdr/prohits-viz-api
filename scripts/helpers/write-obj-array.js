/* eslint no-param-reassign: 0 */

const fs = require('fs');

const sortArray = require('./sort-array-strings');

const writeObjArray = (obj, file, varName) => (
  new Promise((resolve) => {
    const stream = fs.createWriteStream(file);

    const keys = Object.keys(obj);
    sortArray(keys);

    stream.write(`/* eslint quotes: 0 */\n\nconst ${varName} = {\n`);
    keys.forEach((key) => {
      stream.write(`  ${key}: [\n`);
      obj[key].forEach((value) => {
        stream.write(`    "${value}",\n`);
      });
      stream.write('  ],\n');
    });
    stream.write(`};\n\nexport default ${varName};\n\n`);
    stream.end();

    stream.on('finish', () => {
      resolve();
    });
  })
);

module.exports = writeObjArray;
