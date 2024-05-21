const User = require("../models/user");
const setError = require("../../config/error");
const { hashPassword, verifyPassword } = require("../../config/password");
const { generateToken } = require("../../config/jwt");

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hash = await hashPassword(password);
    const newUser = new User({ username, password: hash });

    const userExists = await User.findOne({ username });
    if (userExists) {
      return next(setError(400, "User already exists."));
    }

    const user = await newUser.save();
    return res.status(201).json(user);
  } catch (err) {
    return next(setError(400, "Can't register user."));
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).lean();

    if (!user) {
      return next(setError(401, "Incorrect login credentials."));
    }

    const isValidPassword = await verifyPassword(password, user.password); // password - from req.body / user.password - from database

    if (!isValidPassword) {
      return next(setError(401, "Incorrect login credentials."));
    } else {
      const token = generateToken({ id: user._id });
      const { password: userPassword, ...restUser } = user; // pulling out password from the rest so it is not shown
      return res.status(200).json({ data: { token, user: restUser } });
    }
  } catch (err) {
    return next(setError(400, "Unable to login."));
  }
};

module.exports = { register, login };
