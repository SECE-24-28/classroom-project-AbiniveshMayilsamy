import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Styles/Login.css";

function QuizAuth() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadQuiz() {
      try {
        if (id === "1") {
          const res = await fetch("/Quiz.json");
          const data = await res.json();
          setQuiz({ id: 1, title: data.title, className: "General", totalQuestions: data.total_questions });
        } else if (id === "2") {
          const res = await fetch("/quiz-2.json");
          const data = await res.json();
          setQuiz({ id: 2, title: data.title, className: "General", totalQuestions: data.total_questions });
        } else if (id === "3") {
          const res = await fetch("/quiz-3.json");
          const data = await res.json();
          setQuiz({ id: 3, title: data.title, className: "General", totalQuestions: data.total_questions });
        } else {
          const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
          const found = quizzes.find(q => q.id === parseInt(id));
          if (found) {
            setQuiz({ ...found, totalQuestions: found.questions?.length || 0 });
          }
        }
      } catch (err) {
        console.log("Error:", err);
      }
    }
    loadQuiz();
  }, [id]);

  function validateRollNo(roll) {
    const pattern = /^[0-9]{2}[A-Za-z]{2,3}[0-9]{3}$/;
    return pattern.test(roll);
  }

  function handleAuth(e) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (!rollNo.trim()) {
      setError("Please enter your roll number");
      return;
    }

    if (!validateRollNo(rollNo)) {
      setError("Invalid Roll Number! Format: 2 digits + 2-3 letters + 3 digits (e.g., 23CSE045)");
      return;
    }

    if (!quiz) {
      setError("Quiz not found!");
      return;
    }

    const studentClass = rollNo.substring(2, rollNo.length - 3).toUpperCase();
    
    if (quiz.className && quiz.className !== "General" && quiz.className !== studentClass) {
      setError(`This quiz is only for ${quiz.className} class! Your class: ${studentClass}`);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("currentQuizStudent", JSON.stringify({ name, rollNo }));
      navigate(`/quiz/start/${id}`);
    }, 300);
  }

  if (!quiz) return <div className="quiz-loading">Loading...</div>;

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-form-section">
          <div className="login-header">
            <h2>Quiz Details</h2>
          </div>

          <div className="quiz-info">
            <h3>{quiz.title}</h3>
            <div className="quiz-stats">
              <span>Questions: {quiz.totalQuestions}</span>
              <span>Category: {quiz.className}</span>
            </div>
          </div>

          <form onSubmit={handleAuth}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="login-input"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Roll Number (e.g., 23CSE045)"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value.toUpperCase())}
                required
                className="login-input"
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Starting..." : "Start Quiz"}
            </button>
          </form>

          <button onClick={() => navigate("/quiz")} className="back-button">Back to Catalog</button>
        </div>
      </div>
    </div>
  );
}

export default QuizAuth;
