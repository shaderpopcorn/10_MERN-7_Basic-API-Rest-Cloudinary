const bookRoutes = require("express").Router();
const {
  newBook,
  getAllBooks,
  getBookByID,
  updateBookByID,
  deleteBookByID,
} = require("../controllers/book");
const { isAuthenticated } = require("../../middlewares/auth");

bookRoutes.post("/", [isAuthenticated], newBook);
bookRoutes.get("/", getAllBooks);
bookRoutes.get("/:id", getBookByID);
bookRoutes.put("/:id", [isAuthenticated], updateBookByID);
bookRoutes.delete("/:id", [isAuthenticated], deleteBookByID);

module.exports = bookRoutes;
