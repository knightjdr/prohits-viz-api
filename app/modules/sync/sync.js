const fs = require('fs');

const writeCallback = require('./write-callback');
const workDir = require('../helpers/work-dir');
const { validateSync } = require('./validate');

// Generate a minimap for a data set.
const sync = (req, res) => {
  const { socket } = res.locals;
  const validated = validateSync(req.body);
  const workingDir = workDir();

  // Generate image directories.
  fs.mkdirSync(`${workingDir}/minimap`);
  fs.mkdirSync(`${workingDir}/svg`);

  // Write JSON to file and spawn process (do not wait).
  fs.writeFile(`${workingDir}/map.json`, JSON.stringify(validated), 'utf8', (err) => {
    writeCallback(err, socket, workingDir);
  });

  res.end();
};

module.exports = sync;
