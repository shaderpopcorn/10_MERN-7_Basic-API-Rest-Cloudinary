require("dotenv").config();
require("./src/config/cloudinary");
const express = require("express");
const connectDB = require("./src/config/db");
const indexRouter = require("./src/api/routers/indexRouter");
const setError = require("./src/config/error");

const app = express();
app.use(express.json());
connectDB();

app.use("/api", indexRouter);

app.use("*", (req, res, next) => {
  return next(setError(400, "Not found!"));
});

app.use((error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json(error.message || "Internal server error!");
});

const DB_PORT = parseInt(process.env.DB_PORT);
app.listen(DB_PORT, () => {
  console.log(`Server listening on port: http://localhost:${DB_PORT}`);
});
