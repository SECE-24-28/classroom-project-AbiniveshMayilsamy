const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  userId: String,
  quizId: String,
  score: Number,
  totalQuestions: Number,
  answers: [Number],
  name: String,
  rollNo: String,
  className: String,
  completedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Result", resultSchema);
