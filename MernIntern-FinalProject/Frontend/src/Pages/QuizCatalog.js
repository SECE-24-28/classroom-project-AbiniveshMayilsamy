import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { quizAPI } from "../api";
import "../Styles/QuizCatalog.css";

function QuizCatalog() {
  const navigate = useNavigate();
  const [quizzesByClass, setQuizzesByClass] = useState({});
  const [userStats, setUserStats] = useState({ attempted: 0, completed: 0, bestScore: 0 });
  const [filterClass, setFilterClass] = useState("All");

  useEffect(() => {
    loadQuizzes();
    loadUserStats();
  }, []);

  function loadUserStats() {
    const results = JSON.parse(localStorage.getItem("results")) || [];
    const userName = localStorage.getItem("userName");
    const userResults = results.filter(r => r.name === userName);
    
    setUserStats({
      attempted: userResults.length,
      completed: userResults.length,
      bestScore: userResults.length > 0 ? Math.max(...userResults.map(r => r.score)) : 0
    });
  }

  function loadQuizzes() {
    async function fetchQuizzes() {
      try {
        const jsonQuizzes = [];
        
        const res1 = await fetch("/Quiz.json");
        const data1 = await res1.json();
        jsonQuizzes.push({
          id: 1,
          title: data1.title,
          description: "General Knowledge Test",
          questions: data1.total_questions,
          total_questions: data1.total_questions,
          timeLimit: 30,
          className: "General",
          difficulty: "Medium"
        });

        const res2 = await fetch("/quiz-2.json");
        const data2 = await res2.json();
        jsonQuizzes.push({
          id: 2,
          title: data2.title,
          description: "Science Knowledge Test",
          questions: data2.total_questions,
          total_questions: data2.total_questions,
          timeLimit: 30,
          className: "General",
          difficulty: "Medium"
        });

        const res3 = await fetch("/quiz-3.json");
        const data3 = await res3.json();
        jsonQuizzes.push({
          id: 3,
          title: data3.title,
          description: "History Knowledge Test",
          questions: data3.total_questions,
          total_questions: data3.total_questions,
          timeLimit: 30,
          className: "General",
          difficulty: "Easy"
        });
        
        const backendQuizzes = await quizAPI.getQuizzes();
        const allQuizzes = [...jsonQuizzes, ...(backendQuizzes || [])];
        
        const grouped = allQuizzes.reduce((acc, quiz) => {
          const className = quiz.className || "General";
          if (!acc[className]) acc[className] = [];
          acc[className].push(quiz);
          return acc;
        }, {});
        
        setQuizzesByClass(grouped);
      } catch (err) {
        console.log("Error loading quizzes:", err);
      }
    }
    fetchQuizzes();
  }

  const allClasses = ["All", ...Object.keys(quizzesByClass)];
  const displayedClasses = filterClass === "All" ? Object.keys(quizzesByClass) : [filterClass];

  return (
    <div className="catalog-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Quiz Portal</h1>
          <p className="hero-subtitle">Test Your Knowledge and Compete with Others</p>
          <button className="hero-cta" onClick={() => document.querySelector('.quiz-category')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore Quizzes
          </button>
          <div className="hero-stats">
            <div className="stat-box">
              <span className="stat-number">{userStats.attempted}</span>
              <span className="stat-label">Quizzes Attempted</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">{userStats.completed}</span>
              <span className="stat-label">Completed</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">{userStats.bestScore}</span>
              <span className="stat-label">Best Score</span>
            </div>
          </div>
        </div>
      </div>

      <div className="brand-intro">
        <h2>About Our Quiz Platform</h2>
        <p>We provide comprehensive, high-quality quizzes designed to test and enhance your knowledge across multiple categories. Our platform is built with a focus on accuracy, fairness, and user experience. Join thousands of learners who trust us for their assessment needs.</p>
      </div>

      <div className="catalog-content">
        <div className="catalog-header">
          <h2 className="catalog-title">Available Quizzes</h2>
          <div className="filter-section">
            <label>Filter by Category:</label>
            <select value={filterClass} onChange={(e) => setFilterClass(e.target.value)} className="filter-select">
              {allClasses.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
        </div>
        
        {Object.keys(quizzesByClass).length === 0 ? (
          <p style={{ textAlign: "center", color: "#9b8b7b" }}>No quizzes available. Admin can create quizzes.</p>
        ) : (
          displayedClasses.map(className => (
            <div key={className} className="quiz-category">
              <h3 className="category-title">{className} Category</h3>
              <div className="catalog-grid">
                {quizzesByClass[className].map((quiz) => (
                  <div key={quiz.id} className="catalog-card">
                    <div className="card-header">
                      <h3>{quiz.title}</h3>
                      {quiz.difficulty && <span className={`difficulty ${quiz.difficulty.toLowerCase()}`}>{quiz.difficulty}</span>}
                    </div>
                    <p className="card-description">{quiz.description || "Test your knowledge"}</p>
                    <div className="card-info">
                      <span>Questions: {quiz.questions?.length || quiz.questions || quiz.total_questions}</span>
                      <span>Time: {quiz.timeLimit || 30}s/Q</span>
                    </div>
                    <button onClick={() => navigate(`/quiz/auth/${quiz.id}`)} className="start-button">Start Quiz</button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="contact-section">
        <div className="contact-section-content">
          <div className="contact-item">
            <h3>Location</h3>
            <p>Sri Eswar College of Engineering</p>
            <p>Coimbatore</p>
            <p>Department of Computer Science and Engineering</p>
          </div>

          <div className="contact-item">
            <h3>Follow Us</h3>
            <p>Instagram: <a href="https://instagram.com/srieshwarcbe" target="_blank" rel="noopener noreferrer">@srieshwarcbe</a></p>
          </div>

          <div className="contact-item">
            <h3>More Information</h3>
            <p>Get in touch with us for more details about our quiz platform.</p>
            <a href="/contact" className="contact-link-btn">Contact Us</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizCatalog;
