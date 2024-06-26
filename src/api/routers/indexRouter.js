const indexRouter = require("express").Router();
const bookRoutes = require("./book");
const categoryRoutes = require("./category");
const userRoutes = require("./user");

indexRouter.use("/book", bookRoutes);
indexRouter.use("/category", categoryRoutes);
indexRouter.use("/auth", userRoutes);

module.exports = indexRouter;
