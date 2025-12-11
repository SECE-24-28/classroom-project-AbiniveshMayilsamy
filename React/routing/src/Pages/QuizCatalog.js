import { useNavigate } from "react-router-dom";

const QuizCatalog = () => {
  const navigate = useNavigate();
  const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [
    {
      id: 1,
      title: "JavaScript Basics",
      questions: [
        {
          question: "What is JavaScript?",
          options: ["Language", "Framework", "Library", "Database"],
          answer: 0,
        },
      ],
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Quiz Catalog</h2>
      <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
        {quizzes.map((quiz) => (
          <div key={quiz.id} style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
            <h3>{quiz.title}</h3>
            <p>{quiz.questions.length} Questions</p>
            <button onClick={() => navigate(`/quiz/quiz/${quiz.id}`)} style={{ padding: "10px 20px" }}>
              Start Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizCatalog;
