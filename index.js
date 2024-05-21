require("dotenv").config();
require("./src/config/cloudinary");
const cors = require("cors");
const express = require("express");
const rateLimit = require("express-rate-limit");
const connectDB = require("./src/config/db");
const indexRouter = require("./src/api/routers/indexRouter");
const setError = require("./src/config/error");

const app = express();

const limiter = rateLimit({
  windowMs: 3 * 60 * 1000,
  max: 50,
  message: "Too many requests from this IP, please try again after 3 minutes",
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(limiter);
app.use(cors());

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
