const indexRouter = require("express").Router();
const categoryRoutes = require("./category");
const bookRoutes = require("./book");
const relationRoutes = require("./relation");

indexRouter.use("/book", bookRoutes);
indexRouter.use("/category", categoryRoutes);
indexRouter.use("/relation", relationRoutes);

module.exports = indexRouter;
