const validHex = (hex) => {
  const regex = /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i;
  return regex.test(hex);
};

export default validHex;
