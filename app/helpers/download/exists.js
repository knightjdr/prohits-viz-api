import fs from 'fs/promises';

const exists = async (file, res) => {
  try {
    const results = await fs.stat(file);
    return results;
  } catch (error) {
    res.status(404);
    res.end();
    return false;
  }
};

export default exists;
