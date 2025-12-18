import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuizLeaderboard from "../Components/QuizLeaderboard";
import "../Styles/Quiz.css";

function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [cloudinaryCloudName, setCloudinaryCloudName] = useState("demo");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [totalScore, setTotalScore] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [liveScores, setLiveScores] = useState([]);

  const student = JSON.parse(localStorage.getItem("currentQuizStudent"));

  useEffect(() => {
    if (!student) {
      navigate(`/quiz/auth/${id}`);
      return;
    }

    async function loadQuiz() {
      try {
        let data;
        if (id === "1") {
          const res = await fetch("/Quiz.json");
          data = await res.json();
        } else if (id === "2") {
          const res = await fetch("/quiz-2.json");
          data = await res.json();
        } else if (id === "3") {
          const res = await fetch("/quiz-3.json");
          data = await res.json();
        } else {
          const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
          data = quizzes.find((q) => q.id === parseInt(id));
        }
        
        if (data) {
          setCloudinaryCloudName(data.cloudinary_cloud_name || "demo");
          setQuiz({
            id: parseInt(id),
            title: data.title,
            timeLimit: 30,
            questions: data.questions.map((q) => ({
              question: q.question,
              options: q.options,
              answer: typeof q.answer === "number" ? q.answer : q.options.indexOf(q.answer),
              imageId: q.image_id || q.imageId
            })),
          });
          setTimeLeft(30);
        }
      } catch (err) {
        console.log("Error loading quiz:", err);
      }
    }
    loadQuiz();
  }, [id, student, navigate]);

  function handleAnswer(optionIndex) {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  }

  function handleNext() {
    if (!quiz) return;

    const isCorrect = answers[currentQuestion] === quiz.questions[currentQuestion].answer;
    const baseScore = 1000;
    const timeBonus = timeLeft * 10;
    const questionScore = isCorrect ? baseScore + timeBonus : 0;
    const newTotalScore = totalScore + questionScore;
    setTotalScore(newTotalScore);

    const currentScores = JSON.parse(localStorage.getItem(`quiz_${id}_scores`)) || [];
    const userIndex = currentScores.findIndex(s => s.rollNo === student.rollNo);
    
    if (userIndex >= 0) {
      currentScores[userIndex].score = newTotalScore;
    } else {
      currentScores.push({ 
        name: student.name, 
        rollNo: student.rollNo, 
        score: newTotalScore,
        className: student.rollNo.substring(2, student.rollNo.length - 3).toUpperCase()
      });
    }
    
    localStorage.setItem(`quiz_${id}_scores`, JSON.stringify(currentScores));
    setLiveScores(currentScores);
    setShowLeaderboard(true);

    setTimeout(() => {
      if (currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(30);
        setShowLeaderboard(false);
      } else {
        const result = {
          quizId: quiz.id,
          quizTitle: quiz.title,
          score: newTotalScore,
          total: quiz.questions.length * 1000,
          name: student.name,
          rollNo: student.rollNo,
          className: student.rollNo.substring(2, student.rollNo.length - 3).toUpperCase(),
          date: new Date().toISOString(),
        };
        const results = JSON.parse(localStorage.getItem("results")) || [];
        results.push(result);
        localStorage.setItem("results", JSON.stringify(results));
        localStorage.removeItem("currentQuizStudent");
        navigate("/quiz/leaderboard");
      }
    }, 3000);
  }

  useEffect(() => {
    if (!quiz || showLeaderboard) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleNext();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quiz, showLeaderboard, currentQuestion]);

  if (!quiz || !student) return <div className="quiz-loading">Loading Quiz...</div>;

  if (showLeaderboard) {
    return <QuizLeaderboard scores={liveScores} currentUser={student.rollNo} />;
  }

  const question = quiz.questions[currentQuestion];
  const timePercentage = (timeLeft / 30) * 100;
  const rotation = (timePercentage / 100) * 360;
  const imageUrl = question.imageId ? `https://res.cloudinary.com/${cloudinaryCloudName}/image/upload/${question.imageId}` : null;

  return (
    <div className="quiz-container">
      <h2>{quiz.title}</h2>
      <p><strong>Student:</strong> {student.name} ({student.rollNo})</p>
      <div className="quiz-score-display">Score: {totalScore}</div>
      <p className="quiz-progress">Question {currentQuestion + 1} of {quiz.questions.length}</p>
      
      <div className="timer-pie-container">
        <svg className="timer-pie" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" className="timer-pie-bg" />
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            className="timer-pie-fill"
            style={{
              strokeDasharray: `${(timePercentage / 100) * 282.7} 282.7`
            }}
          />
          <text x="50" y="55" className="timer-text">{timeLeft}s</text>
        </svg>
      </div>

      <h3 className="quiz-question">{question.question}</h3>
      {imageUrl && <img src={imageUrl} alt="Question" className="quiz-image" />}
      <div className="quiz-options">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(idx)}
            className={`quiz-option ${answers[currentQuestion] === idx ? 'selected' : ''}`}
          >
            {option}
          </button>
        ))}
      </div>
      <button onClick={handleNext} disabled={answers[currentQuestion] === undefined} className="quiz-next-btn">
        {currentQuestion < quiz.questions.length - 1 ? "Next" : "Submit"}
      </button>
    </div>
  );
}

export default Quiz;
