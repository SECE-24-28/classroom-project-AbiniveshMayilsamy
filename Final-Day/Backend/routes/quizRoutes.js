const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");

router.post("/create", quizController.createQuiz);
router.get("/results/all", quizController.getResults);
router.get("/", quizController.getQuizzes);
router.get("/:id", quizController.getQuizById);
router.post("/submit", quizController.submitQuiz);
router.delete("/:id", quizController.deleteQuiz);

module.exports = router;
