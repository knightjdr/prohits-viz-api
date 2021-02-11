import fs from 'fs/promises';

const readFile = async (file, encoding = 'utf8') => {
  try {
    const data = await fs.readFile(file, encoding);
    return data;
  } catch (error) {
    throw new Error(`Could not read file: ${file}`);
  }
};

export default readFile;
