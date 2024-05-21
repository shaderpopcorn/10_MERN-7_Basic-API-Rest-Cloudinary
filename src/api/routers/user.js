const { register, login, avatar } = require("../controllers/user");
const { uploadFile } = require("../../middlewares/handleCloudinaryFiles");

userRoutes = require("express").Router();

userRoutes.post("/register", uploadFile.single("avatar"), register);
userRoutes.post("/login", login);
userRoutes.post("/avatar", avatar);

module.exports = userRoutes;
