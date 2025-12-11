import { NavLink, useNavigate } from "react-router-dom";

const QuizHeader = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <header style={{ backgroundColor: "#333", color: "white", padding: "15px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1200px", margin: "auto" }}>
        <h2>Quiz Portal</h2>
        <nav style={{ display: "flex", gap: "20px" }}>
          {userRole === "admin" ? (
            <>
              <NavLink to="/quiz/admin" style={{ color: "white", textDecoration: "none" }}>Create Quiz</NavLink>
              <NavLink to="/quiz/leaderboard" style={{ color: "white", textDecoration: "none" }}>Leaderboard</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/quiz/quiz-catalog" style={{ color: "white", textDecoration: "none" }}>Quizzes</NavLink>
              <NavLink to="/quiz/results" style={{ color: "white", textDecoration: "none" }}>My Results</NavLink>
              <NavLink to="/quiz/leaderboard" style={{ color: "white", textDecoration: "none" }}>Leaderboard</NavLink>
            </>
          )}
          <button onClick={handleLogout} style={{ background: "none", border: "1px solid white", color: "white", padding: "5px 15px", cursor: "pointer" }}>
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default QuizHeader;
