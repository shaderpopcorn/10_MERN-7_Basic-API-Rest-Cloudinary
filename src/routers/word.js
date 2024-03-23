const wordRoutes = require("express").Router();
const {
  getAllWords,
  getWordByID,
  newWord,
  updateWordByID,
  deleteWordByID,
} = require("../controllers/word");

wordRoutes.get("/", getAllWords);
wordRoutes.get("/:id", getWordByID);
wordRoutes.post("/", newWord);
wordRoutes.put("/:id", updateWordByID);
wordRoutes.delete("/:id", deleteWordByID);

module.exports = wordRoutes;
