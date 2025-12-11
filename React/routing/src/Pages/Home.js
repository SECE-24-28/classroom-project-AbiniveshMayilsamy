import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import QuizCard from "../Components/QuizCard";
import "../Styles/Home.css";

const Home = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch("/quizzes.json");
        const data = await response.json();
        setQuizzes(data);
        console.log("Quizzes:", data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchQuizzes();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchQuizDetail = async () => {
        try {
          const response = await fetch(`/quiz-${id}.json`);
          const data = await response.json();
          setSelectedQuiz(data);
          console.log("Quiz Detail:", data);
        } catch (error) {
          const response = await fetch("/Quiz.json");
          const data = await response.json();
          setSelectedQuiz(data);
        }
      };
      fetchQuizDetail();
    }
  }, [id]);

  const handleQuizClick = (quizId) => {
    navigate(`/${quizId}`);
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Quiz Portal Home</h1>
      {!id && (
        <div>
          <h2>Available Quizzes:</h2>
          <div className="quiz-grid">
            {quizzes.map((item) => (
              <QuizCard key={item.id} quiz={item} onClick={handleQuizClick} />
            ))}
          </div>
        </div>
      )}
      {id && selectedQuiz && (
        <div className="quiz-detail-container">
          <button onClick={() => navigate("/")} className="back-button">Back to Home</button>
          <h2>Page ID: {id}</h2>
          <h3>{selectedQuiz.title}</h3>
          <pre className="quiz-data">
            {JSON.stringify(selectedQuiz, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Home;
