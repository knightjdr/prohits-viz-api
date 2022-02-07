import fs from 'fs/promises';

const exists = async (file) => {
  const results = await fs.stat(file);
  return results;
};

export default exists;
