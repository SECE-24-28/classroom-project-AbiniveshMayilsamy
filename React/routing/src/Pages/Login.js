import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@quiz.com" && password === "admin") {
      localStorage.setItem("userRole", "admin");
      navigate("/quiz/admin");
    } else {
      localStorage.setItem("userRole", "user");
      localStorage.setItem("userName", email);
      navigate("/quiz/quiz-catalog");
    }
  };

  return (
    <div style={{ padding: "50px", maxWidth: "400px", margin: "auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />
        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          Login
        </button>
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
      <p style={{ fontSize: "12px", color: "gray" }}>
        Admin: admin@quiz.com / admin
      </p>
    </div>
  );
};

export default Login;
