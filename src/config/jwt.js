const jwt = require("jsonwebtoken");
const setError = require("./error");

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: "1h" });
  return token;
};

const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_TOKEN);
    return payload;
  } catch (err) {
    setError(400, "Invalid or expired JWT-Token.");
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
