const bookRoutes = require("express").Router();
const {
  newBook,
  getAllBooks,
  getBookByID,
  updateBookByID,
  deleteBookByID,
} = require("../controllers/book");

bookRoutes.post("/", newBook);
bookRoutes.get("/", getAllBooks);
bookRoutes.get("/:id", getBookByID);
bookRoutes.put("/:id", updateBookByID);
bookRoutes.delete("/:id", deleteBookByID);

module.exports = bookRoutes;
