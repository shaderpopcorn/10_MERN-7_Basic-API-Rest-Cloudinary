const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/mern7-db")
  .then(() => {
    console.log("Connected to MongoDB: mern7-db");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: mern7-db", err);
  });

module.exports = mongoose;
