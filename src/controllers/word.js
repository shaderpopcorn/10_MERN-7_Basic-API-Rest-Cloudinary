const setError = require("../config/error");
const { Word } = require("../models/word");

// GET
const getAllWords = async (req, res, next) => {
  try {
    const allWords = await Word.find().lean();
    return res.status(200).json(allWords);
  } catch (err) {
    return next(setError(400, err));
  }
};

// GET
const getWordByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const word = await Word.findById(id);
    return res.status(200).json(word);
  } catch (err) {
    return next(setError(400, err));
  }
};

// POST
const newWord = async (req, res, next) => {
  try {
    const wordExists = await Word.findOne({ name: req.params.name });
    if (wordExists) {
      return res.status(400).json("Word already exists!");
    } else {
      const newWord = new Word(req.body);
      const newWordInDB = await newWord.save();
      return res.status(201).json(newWordInDB);
    }
  } catch (err) {
    return next(setError(400, err));
  }
};

// PUT
const updateWordByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedWord = await Word.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedWord);
  } catch (err) {
    return next(setError(400, err));
  }
};

// DELETE
const deleteWordByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedWord = await Word.findByIdAndDelete(id);
    return res.status(200).json(deletedWord);
  } catch (err) {
    return next(setError(400, err));
  }
};

module.exports = {
  getAllWords,
  getWordByID,
  newWord,
  updateWordByID,
  deleteWordByID,
};
