require("dotenv").config();
require("./src/config/db");
const express = require("express");
const indexRouter = require("./src/routers/indexRouter");
const setError = require("./src/config/error");
const app = express();

app.use(express.json());

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
  console.log(`Server listening on port: http://localhost/${DB_PORT}`);
});
