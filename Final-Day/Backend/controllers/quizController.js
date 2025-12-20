const Quiz = require("../models/Quiz");
const Result = require("../models/Result");

let quizzes = [];
let results = [];

exports.createQuiz = async (req, res) => {
  try {
    const { title, className, timeLimit, questions } = req.body;

    if (!title || !className || !questions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const quiz = new Quiz({
        title,
        className,
        timeLimit: timeLimit || 30,
        questions
      });
      await quiz.save();
      res.status(201).json({ message: "Quiz created successfully", quiz });
    } catch (dbError) {
      const quiz = {
        _id: Date.now().toString(),
        title,
        className,
        timeLimit: timeLimit || 30,
        questions
      };
      quizzes.push(quiz);
      res.status(201).json({ message: "Quiz created successfully", quiz });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getQuizzes = async (req, res) => {
  try {
    try {
      const dbQuizzes = await Quiz.find();
      res.status(200).json(dbQuizzes);
    } catch (dbError) {
      res.status(200).json(quizzes);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    try {
      const quiz = await Quiz.findById(req.params.id);
      if (!quiz) throw new Error("Not found");
      res.status(200).json(quiz);
    } catch (dbError) {
      const quiz = quizzes.find(q => q._id === req.params.id);
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }
      res.status(200).json(quiz);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.submitQuiz = async (req, res) => {
  try {
    const { userId, quizId, answers, name, rollNo, className } = req.body;
    
    try {
      const quiz = await Quiz.findById(quizId);
      if (!quiz) throw new Error("Not found");
      
      let score = 0;
      answers.forEach((answer, index) => {
        if (quiz.questions[index] && quiz.questions[index].answer === parseInt(answer)) {
          score++;
        }
      });

      const result = new Result({
        userId,
        quizId,
        score,
        totalQuestions: quiz.questions.length,
        answers,
        name,
        rollNo,
        className
      });

      await result.save();
      res.status(201).json({ message: "Quiz submitted successfully", result });
    } catch (dbError) {
      const quiz = quizzes.find(q => q._id === quizId);
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }

      let score = 0;
      answers.forEach((answer, index) => {
        if (quiz.questions[index] && quiz.questions[index].answer === parseInt(answer)) {
          score++;
        }
      });

      const result = {
        _id: Date.now().toString(),
        userId,
        quizId,
        score,
        totalQuestions: quiz.questions.length,
        answers,
        name,
        rollNo,
        className
      };

      results.push(result);
      res.status(201).json({ message: "Quiz submitted successfully", result });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getResults = async (req, res) => {
  try {
    try {
      const dbResults = await Result.find();
      res.status(200).json(dbResults);
    } catch (dbError) {
      res.status(200).json(results);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    try {
      await Quiz.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Quiz deleted successfully" });
    } catch (dbError) {
      quizzes = quizzes.filter(q => q._id !== req.params.id);
      res.status(200).json({ message: "Quiz deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
