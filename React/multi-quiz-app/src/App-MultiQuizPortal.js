import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import UserQuizzes from "./Pages/UserQuizzes";
import TakeQuiz from "./Pages/TakeQuiz";
import Results from "./Pages/Results";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminCreateQuiz from "./Pages/AdminCreateQuiz";

function App() {
  return (
    <Router>
      <div className="app">
        {/* Header/Navbar */}
        <nav className="navbar">
          <div className="navbar-container">
            <Link to="/" className="navbar-logo">
              🎯 Multi Quiz Portal
            </Link>
            <div className="nav-links">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/user/quizzes" className="nav-link">
                Student
              </Link>
              <Link to="/admin/dashboard" className="nav-link">
                Admin
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/quizzes" element={<UserQuizzes />} />
            <Route path="/user/quiz/:id" element={<TakeQuiz />} />
            <Route path="/user/results/:id" element={<Results />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/create" element={<AdminCreateQuiz />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer">
          <p>&copy; 2025 Multi Quiz Portal. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
