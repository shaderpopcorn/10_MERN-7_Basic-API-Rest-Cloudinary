const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    cover: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    stock: { type: Boolean, required: true, default: true },
    price: { type: Number, required: true },
    language: {
      type: String,
      required: true,
      enum: ["german", "english", "spanish", "portuguese"],
      trim: true,
    },
    category: { type: mongoose.Types.ObjectId, ref: "categories" },
  },
  {
    timestamps: true,
    collection: "books",
  }
);

const Book = mongoose.model("books", bookSchema);

module.exports = Book;
