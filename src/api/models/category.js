const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    icon: { type: String, required: true, trim: true },
    isle: { type: Number, required: true },
    floor: {
      type: String,
      required: true,
      enum: ["GF", "FF", "SF", "TF"],
      trim: true,
    },
    books: [{ type: mongoose.Types.ObjectId, ref: "books" }],
  },
  {
    timestamps: true,
    collection: "categories",
  }
);

const Category = mongoose.model("categories", categorySchema);

module.exports = Category;
