const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    language: {
      type: String,
      required: true,
      enum: ["german", "english", "spanish", "portuguese"],
      trim: true,
    },
    categories: { type: mongoose.Types.ObjectId, ref: "categories" },
  },
  {
    timestamps: true,
    collection: "words",
  }
);

const Word = mongoose.model("words", wordSchema);

module.exports = { Word };
