const setError = require("../config/error");
const Word = require("../models/word");
const Category = require("../models/category");

// GET
const getWordsOfCategoryByID = async (req, res, next) => {
  try {
    const wordsOfCategory = await Category.findById(req.params.id).populate(
      "words"
    );
    return res.status(200).json(wordsOfCategory);
  } catch (err) {
    return next(setError(400, err));
  }
};

// GET
const getCategoriesOfWordByID = async (req, res, next) => {
  try {
    const categoriesOfWord = await Word.findById(req.params.id).populate(
      "categories"
    );
    return res.status(200).json(categoriesOfWord);
  } catch (err) {
    return next(setError(400, err));
  }
};

// PUT
const updateWordsOfCategoryByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldCategory = await Category.findByID(id).populate("words");
    const newCategory = new Category(req.body);
    newCategory._id = id;

    const oldCategoryWords = oldCategory.words.toString().split(",");
    const newCategoryWords = newCategory.words.toString().split(",");
    const combinedCategoryWords = [...oldCategoryWords, ...newCategoryWords];

    const noEmpties = combinedCategoryWords.filter((el) => {
      el != "";
    });

    const uniqueSet = [...newSet(noEmpties)];

    newCategory.words = uniqueSet.map(
      (idString) => new mongoose.Types.ObjectId(idString)
    );

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      updatedCategory,
      {
        new: true,
      }
    );

    return res.status(200).json(updatedCategory);
  } catch (err) {
    return next(setError(400, err));
  }
};

// PUT
const updateCategoriesOfWordByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldWord = await Word.findById(id).populate("categories");
    const newWord = new Word(req.body);
    newWord._id = id;

    const oldWordCategories = oldWord.categories.toString().split(",");
    const newWorldCategories = newWord.categories.toString().split(",");
    const combinedCategoryWords = [...oldWordCategories, ...newWorldCategories];

    const noEmpties = combinedCategoryWords.filter((el) => {
      el != "";
    });

    const uniqueSet = [...newSet(noEmpties)];

    newWord.categories = uniqueSet.map(
      (idString) => new mongoose.Types.ObjectId(idString)
    );

    const updatedWord = await Word.findByIdAndUpdate(id, newWord, {
      new: true,
    });
    return res.status(200).json(updatedWord);
  } catch (err) {
    return next(setError(400, err));
  }
};

module.exports = {
  getWordsOfCategoryByID,
  getCategoriesOfWordByID,
  updateWordsOfCategoryByID,
  updateCategoriesOfWordByID,
};
