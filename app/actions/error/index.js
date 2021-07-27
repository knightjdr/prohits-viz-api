import fs from 'fs/promises';

import config from '../../config/config.js';
import getTimestamp from '../../utils/get-timestamp.js';
import logger from '../../helpers/logging/logger.js';

const logClientError = async (req, res) => {
  try {
    const { error, info } = req.body;

    const date = getTimestamp();
    const message = `${date}, ${error}\n${JSON.stringify(info, null, 2)}\n\n`;
    await fs.appendFile(`${config.logDir}client.log`, message);

    res.end();
  } catch (error) {
    logger.error(`client error - ${error.toString()}`);
    res.status(500);
    res.end();
  }
};

export default logClientError;
