const crypto = require('crypto');

const validateKey = (match, password) => {
  if (!match || Object.keys(match).length === 0) {
    return new Error('contact address not found');
  }
  const {
    algo,
    hash,
    iterations,
    keylen,
    salt,
  } = match;
  const calculatedHash = crypto.pbkdf2Sync(password, salt, iterations, keylen, algo).toString('hex');
  if (calculatedHash === hash) {
    return true;
  }
  return new Error('incorrect password');
};

module.exports = validateKey;
