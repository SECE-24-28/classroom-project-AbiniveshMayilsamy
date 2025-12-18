let quizzes = [];
let results = [];

exports.createQuiz = (req, res) => {
  const { title, className, timeLimit, questions } = req.body;

  if (!title || !className || !questions) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const quiz = {
    id: Date.now(),
    title,
    className,
    timeLimit: timeLimit || 30,
    questions: questions.map(q => ({
      question: q.question,
      options: q.options,
      answer: parseInt(q.answer),
      imageId: q.imageId || ""
    })),
    createdAt: new Date()
  };

  quizzes.push(quiz);
  res.status(201).json({ message: "Quiz created successfully", quiz });
};

exports.getQuizzes = (req, res) => {
  res.status(200).json(quizzes);
};

exports.getQuizById = (req, res) => {
  const quiz = quizzes.find(q => q.id === parseInt(req.params.id));
  
  if (!quiz) {
    return res.status(404).json({ message: "Quiz not found" });
  }

  res.status(200).json(quiz);
};

exports.submitQuiz = (req, res) => {
  const { userId, quizId, answers, name, rollNo, className } = req.body;
  const quiz = quizzes.find(q => q.id === parseInt(quizId));

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
    id: Date.now(),
    userId,
    quizId,
    score,
    totalQuestions: quiz.questions.length,
    answers,
    name,
    rollNo,
    className,
    completedAt: new Date()
  };

  results.push(result);
  res.status(201).json({ message: "Quiz submitted successfully", result });
};

exports.getResults = (req, res) => {
  res.status(200).json(results);
};

exports.deleteQuiz = (req, res) => {
  const quizId = parseInt(req.params.id);
  quizzes = quizzes.filter(q => q.id !== quizId);
  res.status(200).json({ message: "Quiz deleted successfully" });
};
