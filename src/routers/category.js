const categoryRoutes = require("express").Router();

const {
  getAllCategories,
  getCategoryByID,
  newCategory,
  updateCategoryByID,
  deleteCategoryByID,
} = require("../controllers/category");

categoryRoutes.get("/", getAllCategories);
categoryRoutes.get("/:id", getCategoryByID);
categoryRoutes.post("/", newCategory);
categoryRoutes.put("/:id", updateCategoryByID);
categoryRoutes.delete("/:id", deleteCategoryByID);

module.exports = categoryRoutes;
