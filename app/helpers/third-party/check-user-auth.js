const findOne = require('../database/find-one');
const validateKey = require('./validate-key');

const checkUserAuth = async (req) => {
  const apikey = req.get('apikey');
  if (!apikey) {
    return false;
  }

  const [contact, password] = req.get('apikey').split(':');
  const query = { contact };
  const match = await findOne('thirdparty', query);
  return validateKey(match, password);
};

module.exports = checkUserAuth;
