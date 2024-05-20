const mongoose = require("mongoose");

const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGODB_ATLAS_URL);
    console.log("Connected to MongoDB-Atlas: mern7-db");
  } catch (err) {
    console.log("Error connecting to MongoDB-Atlas: mern7-db", err);
  }
};

module.exports = connectDB;
