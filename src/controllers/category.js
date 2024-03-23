const setError = require("../config/error");
const Category = require("../models/category");

// GET
const getAllCategories = async (req, res, next) => {
  try {
    const allWords = await Category.find().lean();
    return res.status(200).json(allWords);
  } catch (err) {
    return next(setError(400, err));
  }
};

// GET
const getCategoryByID = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    return res.status(200).json(category);
  } catch (err) {
    return next(setError(400, err));
  }
};

const newCategory = async (req, res, next) => {
  try {
    const CategoryExists = await Category.findOne({ name: req.params.name });
    if (CategoryExists) {
      return res.status(200, "Category already exists!");
    } else {
      const newCategory = new Category(req.body);
      const newCategoryInDB = await newCategory.save(newCategory);
      return res.status(201).json(newCategoryInDB);
    }
  } catch (err) {
    return next(setError(400, err));
  }
};

const updateCategoryByID = async (req, res, next) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).json(updatedCategory);
  } catch (error) {
    return next(setError(400, err));
  }
};

const deleteCategoryByID = async (req, res, next) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    return res.status(200).json(deletedCategory);
  } catch (err) {
    return next(setError(400, err));
  }
};

module.exports = {
  getAllCategories,
  getCategoryByID,
  newCategory,
  updateCategoryByID,
  deleteCategoryByID,
};
