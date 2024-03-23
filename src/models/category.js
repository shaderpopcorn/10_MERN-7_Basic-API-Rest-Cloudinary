const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    language: {
      type: String,
      required: true,
      enum: ["german", "english", "spanish", "portuguese"],
      trim: true,
    },
    words: { type: mongoose.Types.ObjectId, ref: "words" },
  },
  {
    timestamps: true,
    collection: "categories",
  }
);

const Category = mongoose.model("categories", categorySchema);

module.exports = Category;
