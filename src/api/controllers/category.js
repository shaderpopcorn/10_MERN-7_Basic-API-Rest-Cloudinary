const setError = require("../../config/error");
const Category = require("../models/category");

// POST
const newCategory = async (req, res, next) => {
  try {
    const CategoryExists = await Category.findOne({ name: req.body.name });
    if (CategoryExists) {
      return res.status(400, "Category already exists!");
    } else {
      const newCategory = new Category(req.body);
      const newCategoryInDB = await newCategory.save(newCategory);
      return res.status(201).json(newCategoryInDB);
    }
  } catch (err) {
    return next(setError(400, err));
  }
};

// GET
const getAllCategories = async (req, res, next) => {
  try {
    const allWords = await Category.find()
      .lean()
      .populate("books", "title stock");
    return res.status(200).json(allWords);
  } catch (err) {
    return next(setError(400, err));
  }
};

// GET
const getCategoryByID = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id)
      .lean()
      .populate("books", "title stock");
    return res.status(200).json(category);
  } catch (err) {
    return next(setError(400, err));
  }
};

// PUT
const updateCategoryByID = async (req, res, next) => {
  try {
    // const { id } = req.params;
    // const oldCategory = await Category.findById(id);
    // const newCategory = new Category(req.body);
    // newCategory._id = id;

    // if (newCategory.books) {
    //   const uniqueSet = newSet([...oldCategory.books, ...newCategory.books]);
    //   newCategory.books = Array.from(uniqueSet);
    // }

    // const updatedCategory = await Category.findByIdAndUpdate(
    //   req.params.id,
    //   req.body,
    //   { runValidators: true, new: true }
    // );
    // return res.status(200).json(updatedCategory);

    const { id } = req.params;
    const oldCategory = await Category.findByID(id).populate(
      "books",
      "title stock"
    );
    const newCategory = new Category(req.body);
    newCategory._id = id;

    const oldCategoryBooks = oldCategory.books.toString().split(",");
    const newCategoryBooks = newCategory.books.toString().split(",");
    const combinedCategoryBooks = [...oldCategoryBooks, ...newCategoryBooks];

    const noEmpties = combinedCategoryBooks.filter((el) => {
      el != "";
    });

    const uniqueSet = [...newSet(noEmpties)];

    newCategory.books = uniqueSet.map(
      (idString) => new mongoose.Types.ObjectId(idString)
    );

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      updatedCategory,
      {
        runValidators: true,
        new: true,
      }
    );

    return res.status(200).json(updatedCategory);
  } catch (error) {
    return next(setError(400, err));
  }
};

// DELETE
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
