const findOne = require('../../db-methods/find-one');
const validateKey = require('./validate-key');

const auth = req => (
  new Promise((resolve, reject) => {
    const apikey = req.get('apikey');
    if (!apikey) {
      reject(new Error('missing api key'));
    } else {
      const [contact, password] = req.get('apikey').split(':');
      const query = { contact };
      findOne('thirdparty', query)
        .then((match) => {
          const validation = validateKey(match, password);
          if (validation instanceof Error) {
            throw validation;
          } else {
            resolve();
          }
        })
        .catch((err) => {
          reject(err);
        });
    }
  })
);

module.exports = auth;
