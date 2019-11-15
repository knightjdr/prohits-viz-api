const crypto = require('crypto');

const isObject = require('../../helpers/is-object');

const validateKey = (match, password) => {
  if (!match || !isObject(match)) {
    return false;
  }

  const {
    algo,
    hash,
    iterations,
    keylen,
    salt,
  } = match;
  const calculatedHash = crypto.pbkdf2Sync(password, salt, iterations, keylen, algo).toString('hex');
  return calculatedHash === hash;
};

module.exports = validateKey;
