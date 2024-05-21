const bcrypt = require("bcrypt");
const setError = require("../config/error");

const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

const verifyPassword = async (password, hash) => {
  try {
    const isValid = await bcrypt.compare(password, hash);
    return isValid;
  } catch (err) {
    setError(401, "Could not verify password.");
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
};
