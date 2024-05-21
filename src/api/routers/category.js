const categoryRoutes = require("express").Router();

const {
  getAllCategories,
  getCategoryByID,
  newCategory,
  updateCategoryByID,
  deleteCategoryByID,
} = require("../controllers/category");
const { isAuthenticated } = require("../../middlewares/auth");

categoryRoutes.post("/", [isAuthenticated], newCategory);
categoryRoutes.get("/", getAllCategories);
categoryRoutes.get("/:id", getCategoryByID);
categoryRoutes.put("/:id", [isAuthenticated], updateCategoryByID);
categoryRoutes.delete("/:id", [isAuthenticated], deleteCategoryByID);

module.exports = categoryRoutes;
