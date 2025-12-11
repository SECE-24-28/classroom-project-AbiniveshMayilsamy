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
    <header style={{ backgroundColor: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", padding: "15px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1200px", margin: "auto" }}>
        <img 
          src="/multi quiz portal.png" 
          alt="Quiz Portal" 
          onClick={() => navigate("/")} 
          style={{ height: "50px", cursor: "pointer", borderRadius: "10px", objectFit: "contain" }}
        />
        <nav style={{ display: "flex", gap: "25px", alignItems: "center" }}>
          {userRole === "admin" ? (
            <>
              <NavLink to="/quiz/admin" style={{ color: "#333", textDecoration: "none", fontWeight: "500", transition: "color 0.3s" }}>Create Quiz</NavLink>
              <NavLink to="/quiz/leaderboard" style={{ color: "#333", textDecoration: "none", fontWeight: "500", transition: "color 0.3s" }}>Leaderboard</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/quiz/quiz-catalog" style={{ color: "#333", textDecoration: "none", fontWeight: "500", transition: "color 0.3s" }}>Quizzes</NavLink>
              <NavLink to="/quiz/results" style={{ color: "#333", textDecoration: "none", fontWeight: "500", transition: "color 0.3s" }}>My Results</NavLink>
              <NavLink to="/quiz/leaderboard" style={{ color: "#333", textDecoration: "none", fontWeight: "500", transition: "color 0.3s" }}>Leaderboard</NavLink>
            </>
          )}
          <button onClick={handleLogout} style={{ backgroundColor: "#f44336", border: "none", color: "white", padding: "8px 20px", cursor: "pointer", borderRadius: "5px", fontWeight: "500" }}>
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default QuizHeader;
