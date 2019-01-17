/* eslint no-param-reassign: 0 */

const fs = require('fs');

const writeArray = arr => (
  new Promise((resolve) => {
    const stream = fs.createWriteStream('../../files/interactor-species.js', { flags: 'w' });

    stream.write('/* eslint quotes: 0 */\n\nconst species = [\n');
    arr.forEach((item) => {
      stream.write(`  "${item}",\n`);
    });
    stream.write('];\n\nexport default species;\n\n');
    resolve();
  })
);

module.exports = writeArray;
