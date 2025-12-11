import "../App.css";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header style={{ backgroundColor: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", padding: "15px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1200px", margin: "auto" }}>
        <img
          src="/multi quiz portal.png"
          alt="Quiz Portal"
          onClick={() => navigate("/")}
          style={{ height: "50px", cursor: "pointer", borderRadius: "10px", objectFit: "contain" }}
        />
        <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
          <NavLink to={"/"} style={{ color: "#333", textDecoration: "none", fontWeight: "500" }}>Home</NavLink>
          <NavLink to={"/quiz/quiz-catalog"} style={{ color: "#333", textDecoration: "none", fontWeight: "500" }}>Quiz Catalog</NavLink>
          <NavLink to={"/login"} style={{ color: "#333", textDecoration: "none", fontWeight: "500" }}>Login</NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
