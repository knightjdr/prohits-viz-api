const getDate = (date) => {
  const dateObj = date ? new Date(date) : new Date();
  const month = `0${dateObj.getUTCMonth() + 1}`.slice(-2);
  const day = `0${dateObj.getUTCDate()}`.slice(-2);
  const year = dateObj.getUTCFullYear();

  return `${year}-${month}-${day}`;
};

export default getDate;
