import "./App.css";
import { useState } from "react";
import Header from "./Header";
import GuessInput from "./GuessInput";
import ScoreBoard from "./ScoreBoard";

function App() {
  let [randomNumber, setRandomNumber] = useState(
    Math.trunc(Math.random() * 20) + 1
  );
  let [score, setScore] = useState(20);
  let [highScore, setHighScore] = useState(0);
  let [message, setMessage] = useState("Start guessing...");
  let [guess, setGuess] = useState("");
  let [isWin, setIsWin] = useState(false);
  let [numberDisplay, setNumberDisplay] = useState("?");
  let [numberWidth, setNumberWidth] = useState("15rem");

  const handleCheck = () => {
    const guessNumber = Number(guess);

    if (!guessNumber) {
      setMessage("No Number!");
      console.log("No Number!");
    } else if (guessNumber === randomNumber) {
      setMessage("Correct Number!");
      console.log("Correct Number!");
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
        console.log("You lost the game!");
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

  let appClass = "App";

  if (isWin) {
    appClass += " win";
  }
  return (
    <div className={appClass}>
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
