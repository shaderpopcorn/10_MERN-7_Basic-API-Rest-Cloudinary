const relationRoutes = require("express").Router();
const {
  getBooksOfCategoryByID,
  getCategoriesOfBookByID,
  updateBooksOfCategoryByID,
  updateCategoriesOfBookByID,
} = require("../controllers/relation");

relationRoutes.get("/:id", getBooksOfCategoryByID);
relationRoutes.get("/:id", getCategoriesOfBookByID);

relationRoutes.put("/:id", updateBooksOfCategoryByID);
relationRoutes.put("/:id", updateCategoriesOfBookByID);

module.exports = relationRoutes;
