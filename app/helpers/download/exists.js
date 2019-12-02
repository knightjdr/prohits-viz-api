const fs = require('fs');

const exists = (file, res) => (
  new Promise((resolve) => {
    fs.access(file, (err) => {
      if (!err) {
        resolve();
      } else {
        res.status(404);
        res.end();
        resolve();
      }
    });
  })
);

module.exports = exists;
