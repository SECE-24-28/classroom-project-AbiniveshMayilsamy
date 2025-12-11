const QuizCard = ({ quiz, onClick }) => {
  return (
    <div className="quiz-card" onClick={() => onClick(quiz.id)}>
      <h3>{quiz.title}</h3>
      <p>{quiz.description}</p>
      <p><strong>Questions:</strong> {quiz.questions}</p>
      <p><strong>Category:</strong> {quiz.category}</p>
      <p style={{ fontSize: "12px", color: "gray" }}>ID: {quiz.id}</p>
    </div>
  );
};

export default QuizCard;
