const setError = require("../../config/error");
const Book = require("../models/book");

// POST
const newBook = async (req, res, next) => {
  try {
    const bookExists = await Book.findOne({ title: req.body.title });
    if (bookExists) {
      return res.status(400).json("Book already exists!");
    } else {
      const newBook = new Book(req.body);
      const newBookInDB = await newBook.save();
      return res.status(201).json(newBookInDB);
    }
  } catch (err) {
    return next(setError(400, err));
  }
};

// GET
const getAllBooks = async (req, res, next) => {
  try {
    const allBooks = await Book.find().lean().populate("category", "name");
    return res.status(200).json(allBooks);
  } catch (err) {
    return next(setError(400, err));
  }
};

// GET
const getBookByID = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    return res.status(200).json(book);
  } catch (err) {
    return next(setError(400, err));
  }
};

// PUT
const updateBookByID = async (req, res, next) => {
  try {
    // const { id } = req.params;
    // const oldBook = await Book.findById(id);
    // const newBook = new Book(req.body);
    // newBook._id = id;

    // if (newBook.categories) {
    //   const uniqueSet = newSet([...oldBook.categories, ...newBook.categories]);
    //   newBook.categories = Array.from(uniqueSet);
    // }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    return res.status(200).json(updatedBook);
  } catch (err) {
    return next(setError(400, err));
  }
};

// DELETE
const deleteBookByID = async (req, res, next) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      confirmation: "Book successfully deleted!",
      deletedBook: deletedBook,
    });
  } catch (err) {
    return next(setError(400, err));
  }
};

module.exports = {
  newBook,
  getAllBooks,
  getBookByID,
  updateBookByID,
  deleteBookByID,
};
