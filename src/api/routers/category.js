const categoryRoutes = require("express").Router();

const {
  getAllCategories,
  getCategoryByID,
  newCategory,
  updateCategoryByID,
  deleteCategoryByID,
} = require("../controllers/category");
const { isAuthenticated } = require("../../middlewares/auth");
const { uploadFile } = require("../../middlewares/handleCloudinaryFiles");

categoryRoutes.post(
  "/",
  [isAuthenticated],
  uploadFile.single("icon"),
  newCategory
);
categoryRoutes.get("/", getAllCategories);
categoryRoutes.get("/:id", getCategoryByID);
categoryRoutes.put(
  "/:id",
  [isAuthenticated],
  uploadFile.single("icon"),
  updateCategoryByID
);
categoryRoutes.delete("/:id", [isAuthenticated], deleteCategoryByID);

module.exports = categoryRoutes;
