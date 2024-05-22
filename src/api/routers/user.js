const { register, login, avatar } = require("../controllers/user");
const { isAuthenticated } = require("../../middlewares/auth");
const { uploadFile } = require("../../middlewares/handleCloudinaryFiles");

userRoutes = require("express").Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.put("/avatar", uploadFile.single("avatar"), avatar);

module.exports = userRoutes;
