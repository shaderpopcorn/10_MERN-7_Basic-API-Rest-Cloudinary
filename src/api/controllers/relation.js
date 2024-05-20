const setError = require("../../config/error");
const Book = require("../models/book");
const Category = require("../models/category");

// GET
const getBooksOfCategoryByID = async (req, res, next) => {
  try {
    const booksOfCategory = await Category.findById(req.params.id).populate(
      "books"
    );
    return res.status(200).json(booksOfCategory);
  } catch (err) {
    return next(setError(400, err));
  }
};

// GET
const getCategoriesOfBookByID = async (req, res, next) => {
  try {
    const categoriesOfBook = await Book.findById(req.params.id).populate(
      "categories"
    );
    return res.status(200).json(categoriesOfBook);
  } catch (err) {
    return next(setError(400, err));
  }
};

// PUT
const updateBooksOfCategoryByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldCategory = await Category.findByID(id).populate("books");
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
  } catch (err) {
    return next(setError(400, err));
  }
};

// PUT
const updateCategoriesOfBookByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldBook = await Book.findById(id).populate("categories");
    const newBook = new Book(req.body);
    newBook._id = id;

    const oldBookCategories = oldBook.categories.toString().split(",");
    const newWorldCategories = newBook.categories.toString().split(",");
    const combinedCategoryBooks = [...oldBookCategories, ...newWorldCategories];

    const noEmpties = combinedCategoryBooks.filter((el) => {
      el != "";
    });

    const uniqueSet = [...newSet(noEmpties)];

    newBook.categories = uniqueSet.map(
      (idString) => new mongoose.Types.ObjectId(idString)
    );

    const updatedBook = await Book.findByIdAndUpdate(id, newBook, {
      new: true,
    });
    return res.status(200).json(updatedBook);
  } catch (err) {
    return next(setError(400, err));
  }
};

module.exports = {
  getBooksOfCategoryByID,
  getCategoriesOfBookByID,
  updateBooksOfCategoryByID,
  updateCategoriesOfBookByID,
};
