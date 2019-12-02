const fs = require('fs');

const stat = (file, res) => (
  new Promise((resolve) => {
    fs.stat(file, (err) => {
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

module.exports = stat;
