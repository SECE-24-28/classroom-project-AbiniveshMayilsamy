const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  className: { type: String, required: true },
  timeLimit: { type: Number, default: 30 },
  questions: [{
    question: String,
    options: [String],
    answer: Number,
    imageId: String
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Quiz", quizSchema);
