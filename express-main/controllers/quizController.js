const Quiz = require("../models/quizModel");

exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json({
      status: "success",
      results: quizzes.length,
      data: { quizzes },
    });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz)
      return res
        .status(404)
        .json({ status: "failed", message: "Quiz not found" });
    res.status(200).json({ status: "success", data: { quiz } });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

exports.createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json({ status: "success", data: { quiz } });
  } catch (error) {
    res.status(400).json({ status: "failed", message: error.message });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!quiz)
      return res
        .status(404)
        .json({ status: "failed", message: "Quiz not found" });
    res.status(200).json({ status: "success", data: { quiz } });
  } catch (error) {
    res.status(400).json({ status: "failed", message: error.message });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz)
      return res
        .status(404)
        .json({ status: "failed", message: "Quiz not found" });
    res.status(204).json({ status: "success", data: null });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};
