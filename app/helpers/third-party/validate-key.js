import crypto from 'crypto';

import isObject from '../../utils/is-object.js';

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

export default validateKey;
