const bookRoutes = require("express").Router();
const {
  newBook,
  getAllBooks,
  getBookByID,
  updateBookByID,
  newBookImageByID,
  deleteBookByID,
} = require("../controllers/book");
const { isAuthenticated } = require("../../middlewares/auth");
const { uploadFile } = require("../../middlewares/handleCloudinaryFiles");

bookRoutes.post("/", [isAuthenticated], uploadFile.single("cover"), newBook);
bookRoutes.get("/", getAllBooks);
bookRoutes.get("/:id", getBookByID);
bookRoutes.put(
  "/:id",
  [isAuthenticated],
  uploadFile.single("cover"),
  updateBookByID
);
bookRoutes.put(
  "/image/:id",
  [isAuthenticated],
  uploadFile.single("image"),
  newBookImageByID
);
bookRoutes.delete("/:id", [isAuthenticated], deleteBookByID);

module.exports = bookRoutes;
