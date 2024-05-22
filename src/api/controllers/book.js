const setError = require("../../config/error");
const Book = require("../models/book");
const { deleteFile } = require("../../middlewares/handleCloudinaryFiles");

// POST
const newBook = async (req, res, next) => {
  try {
    const bookExists = await Book.findOne({ title: req.body.title });
    if (bookExists) {
      return res.status(401).json("Book already exists!");
    } else {
      const newBook = new Book(req.body);

      if (req.file) {
        newBook.cover = req.file.path;
      }

      const newBookInDB = await newBook.save();
      return res.status(201).json(newBookInDB);
    }
  } catch (err) {
    return next(setError(401, "Book can't be created"));
  }
};

// GET
const getAllBooks = async (req, res, next) => {
  try {
    const allBooks = await Book.find().lean().populate("category", "name");
    return res.status(200).json(allBooks);
  } catch (err) {
    return next(setError(401, err));
  }
};

// GET
const getBookByID = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    return res.status(200).json(book);
  } catch (err) {
    return next(setError(401, err));
  }
};

// PUT
const updateBookByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldBook = await Book.findById(id);
    const newBook = new Book(req.body);
    newBook._id = id;

    if (req.file) {
      newBook.cover = req.file.path;
      if (oldBook.cover) {
        deleteFile(oldBook.cover);
      }
    }

    const updatedBook = await Book.findByIdAndUpdate(id, newBook, {
      runValidators: true,
      new: true,
    });
    return res.status(200).json(updatedBook);
  } catch (err) {
    return next(setError(401, "Book can't be updated"));
  }
};

// PUT
const newBookImageByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldImageBook = await Book.findById(id);
    const newImageBook = new Book(req.body);
    newImageBook._id = id;

    if (req.file) {
      newImageBook.image = req.file.path;
      if (oldImageBook.image) {
        deleteFile(oldImageBook.image);
      }
    }

    const updatedImageBook = await Book.findByIdAndUpdate(id, newImageBook, {
      runValidators: true,
      new: true,
    });
    return res.status(200).json(updatedImageBook);
  } catch (err) {
    return next(setError(401, "Book image can't be updated"));
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
    return next(setError(401, "Book can't be deleted"));
  }
};

module.exports = {
  newBook,
  getAllBooks,
  getBookByID,
  updateBookByID,
  newBookImageByID,
  deleteBookByID,
};
