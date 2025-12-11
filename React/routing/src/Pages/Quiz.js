import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
  const quiz = quizzes.find((q) => q.id === parseInt(id));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const score = answers.reduce((acc, ans, idx) => {
        return ans === quiz.questions[idx].answer ? acc + 1 : acc;
      }, 0);
      const result = {
        quizId: quiz.id,
        quizTitle: quiz.title,
        score,
        total: quiz.questions.length,
        userName: localStorage.getItem("userName"),
        date: new Date().toISOString(),
      };
      const results = JSON.parse(localStorage.getItem("results")) || [];
      results.push(result);
      localStorage.setItem("results", JSON.stringify(results));
      navigate("/quiz/results");
    }
  };

  if (!quiz) return <div>Quiz not found</div>;

  const question = quiz.questions[currentQuestion];

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>{quiz.title}</h2>
      <p>Question {currentQuestion + 1} of {quiz.questions.length}</p>
      <h3>{question.question}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "20px 0" }}>
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(idx)}
            style={{
              padding: "15px",
              backgroundColor: answers[currentQuestion] === idx ? "#4CAF50" : "#f0f0f0",
              color: answers[currentQuestion] === idx ? "white" : "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {option}
          </button>
        ))}
      </div>
      <button onClick={handleNext} disabled={answers[currentQuestion] === undefined} style={{ padding: "10px 20px" }}>
        {currentQuestion < quiz.questions.length - 1 ? "Next" : "Submit"}
      </button>
    </div>
  );
};

export default Quiz;
