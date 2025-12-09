import "./App.css";
import { useState } from "react";
import Header from "./Header";
import GuessInput from "./GuessInput";
import ScoreBoard from "./ScoreBoard";

function App() {
  const [randomNumber, setRandomNumber] = useState(
    Math.trunc(Math.random() * 20) + 1
  );
  const [score, setScore] = useState(20);
  const [highScore, setHighScore] = useState(0);
  const [message, setMessage] = useState("Start guessing...");
  const [guess, setGuess] = useState("");
  const [isWin, setIsWin] = useState(false);
  const [numberDisplay, setNumberDisplay] = useState("?");
  const [numberWidth, setNumberWidth] = useState("15rem");

  const handleCheck = () => {
    const guessNumber = Number(guess);

    if (!guessNumber) {
      setMessage("No Number!");
    } else if (guessNumber === randomNumber) {
      setMessage("Correct Number!");
      setNumberDisplay(randomNumber);
      setIsWin(true);
      setNumberWidth("30rem");
      if (score > highScore) {
        setHighScore(score);
      }
    } else if (guessNumber !== randomNumber) {
      if (score > 1) {
        setMessage(guessNumber > randomNumber ? "Too High!" : "Too Low!");
        setScore(score - 1);
      } else {
        setMessage("You lost the game!");
        setScore(0);
      }
    }
  };

  const handleAgain = () => {
    setScore(20);
    setRandomNumber(Math.trunc(Math.random() * 20) + 1);
    setMessage("Start guessing...");
    setGuess("");
    setIsWin(false);
    setNumberDisplay("?");
    setNumberWidth("15rem");
  };

  return (
    <div className={`App ${isWin ? "win" : ""}`}>
      <Header
        numberDisplay={numberDisplay}
        numberWidth={numberWidth}
        handleAgain={handleAgain}
      />
      <main>
        <GuessInput
          guess={guess}
          setGuess={setGuess}
          handleCheck={handleCheck}
        />
        <ScoreBoard message={message} score={score} highScore={highScore} />
      </main>
    </div>
  );
}

export default App;
