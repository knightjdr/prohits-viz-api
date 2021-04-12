import { nanoid } from 'nanoid';

const createArchiveID = () => {
  const date = new Date();
  const dateId = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const id = nanoid(14);
  return `${dateId}-${id}`;
};

export default createArchiveID;
