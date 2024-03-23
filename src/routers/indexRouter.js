const indexRouter = require("express").Router();
const categoryRoutes = require("./category");
const wordRoutes = require("./word");
const relationRoutes = require("./relation");

indexRouter.use("/category", categoryRoutes);
indexRouter.use("/word", wordRoutes);
indexRouter.use("/relation", relationRoutes);

module.exports = indexRouter;
