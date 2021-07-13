import findOne from '../database/find-one.js';
import validateKey from './validate-key.js';

const checkUserAuth = async (req) => {
  const apikey = req.get('apikey');
  if (!apikey) {
    return false;
  }

  const [contact, password] = apikey.split(':');
  const query = { contact };
  const match = await findOne('thirdparty', query);
  return validateKey(match, password);
};

export default checkUserAuth;
