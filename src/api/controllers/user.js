const User = require("../models/user");
const setError = require("../../config/error");
const { hashPassword, verifyPassword } = require("../../config/password");
const { generateToken, verifyToken } = require("../../config/jwt");
const { deleteFile } = require("../../middlewares/handleCloudinaryFiles");

// POST
const register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return next(setError(401, "Email already exists."));
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
    const newUser = new User({ email, username, password: hash });
    const user = await newUser.save();
    return res.status(201).json(user);
  } catch (err) {
    return next(setError(401, "Can't register user."));
  }
};

// POST
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

// PUT
const avatar = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return next(setError(401, "You do not have permission."));
    }

    const parsedToken = token.replace("Bearer ", "");
    const isValidToken = verifyToken(parsedToken);
    const userLoggedIn = User.findById(isValidToken.id);

    const userWithAvatar = new User(req.body);
    userWithAvatar._id = isValidToken.id;

    if (req.file) {
      userWithAvatar.avatar = req.file.path;
      if (userLoggedIn.avatar) {
        deleteFile(userLoggedIn.avatar);
      }
    }

    const combinedUser = { ...userLoggedIn, ...userWithAvatar };

    const userLoggedInInfo = await User.findByIdAndUpdate(
      isValidToken.id,
      combinedUser,
      {
        runValidators: true,
        new: true,
      }
    );

    return res.status(201).json(userLoggedInInfo);
  } catch (err) {
    return next(setError(401, "Avatar can't be updated"));
  }
};

module.exports = { register, login, avatar };
