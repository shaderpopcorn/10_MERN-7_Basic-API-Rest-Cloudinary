const indexRouter = require("express").Router();
const categoryRoutes = require("./category");
const bookRoutes = require("./book");
const relationRoutes = require("./relation");
const userRoutes = require("./user");

indexRouter.use("/book", bookRoutes);
indexRouter.use("/category", categoryRoutes);
indexRouter.use("/relation", relationRoutes);
indexRouter.use("/user", userRoutes);

module.exports = indexRouter;
