/* eslint no-param-reassign: 0 */

import fs from 'fs';

const writeArray = (arr, file, varName) => (
  new Promise((resolve) => {
    const stream = fs.createWriteStream(file);

    stream.write(`/* eslint quotes: 0 */\n\nconst ${varName} = [\n`);
    arr.forEach((item) => {
      stream.write(`  "${item}",\n`);
    });
    stream.write(`];\n\nexport default ${varName};\n\n`);
    stream.end();

    stream.on('finish', () => {
      resolve();
    });
  })
);

export default writeArray;
