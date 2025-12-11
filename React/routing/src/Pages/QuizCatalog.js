import { useNavigate } from "react-router-dom";

const QuizCatalog = () => {
  const navigate = useNavigate();
  const localQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
  const quizzes = [
    {
      id: 1,
      title: "General Knowledge Quiz",
      questions: 20,
      source: "json"
    },
    ...localQuizzes.map(q => ({ ...q, source: "local" }))
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Quiz Catalog</h2>
      <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
        {quizzes.map((quiz) => (
          <div key={quiz.id} style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
            <h3>{quiz.title}</h3>
            <p>{quiz.questions.length || quiz.questions} Questions</p>
            <button onClick={() => navigate(`/quiz/quiz/${quiz.id}`)} style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
              Start Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizCatalog;
