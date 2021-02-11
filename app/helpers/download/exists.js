import fs from 'fs/promises';

const exists = async (file, res) => {
  try {
    await fs.stat(file);
  } catch (error) {
    res.status(404);
    res.end();
  }
};

export default exists;
