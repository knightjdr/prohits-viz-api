const fs = require('fs');

const writeCallback = require('./write-callback');
const workDir = require('../helpers/work-dir');
const { validateSync } = require('./validate');

// Generate a minimap for a data set.
const sync = (socket, body) => (
  new Promise((resolve) => {
    // Validate input.
    const validated = validateSync(body);

    // Generate working dir.
    const workingDir = workDir();

    // Generate image directories.
    fs.mkdirSync(`${workingDir}/minimap`);
    fs.mkdirSync(`${workingDir}/svg`);

    // Write JSON to file and spawn process (do not wait).
    fs.writeFile(`${workingDir}/map.json`, JSON.stringify(validated), 'utf8', (err) => {
      writeCallback(err, socket, workingDir);
    });

    resolve({ status: 200 });
  })
);

module.exports = sync;
