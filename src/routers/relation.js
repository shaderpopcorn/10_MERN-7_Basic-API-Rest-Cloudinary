const relationRoutes = require("express").Router();
const {
  getWordsOfCategoryByID,
  getCategoriesOfWordByID,
  updateWordsOfCategoryByID,
  updateCategoriesOfWordByID,
} = require("../controllers/relation");

relationRoutes.get("/:id", getWordsOfCategoryByID);
relationRoutes.get("/:id", getCategoriesOfWordByID);

relationRoutes.put("/:id", updateWordsOfCategoryByID);
relationRoutes.put("/:id", updateCategoriesOfWordByID);

module.exports = relationRoutes;
