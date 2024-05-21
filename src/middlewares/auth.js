const User = require("../api/models/user");
const setError = require("../config/error");
const { verifyToken } = require("../config/jwt");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return next(setError(401, "You do not have permission."));
    }

    const parsedToken = token.replace("Bearer ", "");
    const isValidToken = verifyToken(parsedToken);
    const userLoggedIn = User.findById(isValidToken.id);
    userLoggedIn.password = null;
    req.user = userLoggedIn;
    next();
  } catch (err) {
    return next(setError(401, "Unable to verify authentication."));
  }
};

module.exports = { isAuthenticated };
