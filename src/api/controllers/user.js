const User = require("../models/user");
const setError = require("../../config/error");
const { hashPassword, verifyPassword } = require("../../config/password");
const { generateToken } = require("../../config/jwt");

const register = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    const emailExists = await User.findOne({ username });
    if (emailExists) {
      return next(setError(400, "Email already exists."));
    }

    if (password.length < 6) {
      return next(
        setError(401, "Password should be at least 6 characters long.")
      );
    }

    const regularExpression = /(?=.*[a-z])(?=.*[A-Z])/g;
    if (!regularExpression.test(password)) {
      return next(
        setError(
          401,
          "Password should contain at least one lower case and one upper case character"
        )
      );
    }

    const hash = await hashPassword(password);
    const newUser = new User({ username, password: hash });

    if (req.file) {
      newUser.avatar = req.file.path;
    }

    const user = await newUser.save();
    return res.status(201).json(user);
  } catch (err) {
    return next(setError(401, "Can't register user."));
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
    return next(setError(401, "Unable to login."));
  }
};

// POST
const avatar = async (req, res, next) => {
  try {
    // TODO
    console.log("in function");
  } catch (err) {
    return next(setError(401, "Avatar can't be uploaded"));
  }
};

module.exports = { register, login, avatar };
