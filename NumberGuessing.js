// 1 We need all the instance
let againBtn = document.querySelector(".again");
let number = document.querySelector(".number");
let guess = document.querySelector(".guess");
let checkBtn = document.querySelector(".check");
let score = document.querySelector(".score");
let highScore = document.querySelector(".highscore");
let msg = document.querySelector(".message");

// 2. Generate a Rnadom Number betwenn 1 and 20
let randomNumber = Math.trunc(Math.random() * 20) + 1;

// 2.1 creat a varible of score
let scr = 20;

// Button Functionalities
// 1.event  that we want to occur 2. Callback
checkBtn.addEventListener("click", () => {
  console.log("Button Clicked", randomNumber);
  console.log(randomNumber);
});

// check the button functionality
checkBtn.addEventListener("click", () => {
  let guessNumber = Number(guess.value);
  console.log(guessNumber, typeof guessNumber);

  // when there is no input
  if (!guessNumber) {
    msg.textContent = "⛔ No Number!";
  }
  // when player wins
  else if (guessNumber === randomNumber) {
    msg.textContent = "🎉 Correct Number!";
    number.textContent = randomNumber;
    document.body.style.backgroundColor = "#32bd08ff";
    number.style.width = "30rem";
    if (scr > highScore.textContent) {
      highScore.textContent = scr;
    }
  }
  // when guess is wrong
  else if (guessNumber !== randomNumber) {
    if (scr > 1) {
      msg.textContent =
        guessNumber > randomNumber ? "📈 Too High!" : "📉 Too Low!";
      scr--;
      score.textContent = scr;
    } else {
      msg.textContent = "💥 You lost the game!";
      score.textContent = 0;
    }
  }
});

//to change the background color
function changeColor() {
  document.body.style.backgroundColor = "#222";
}

//to change the guess number back to question mark
function changeNumber() {
  number.textContent = "?";
}

//again button functionality
againBtn.addEventListener("click", () => {
  scr = 20;
  score.textContent = scr;
  randomNumber = Math.trunc(Math.random() * 20) + 1;
  msg.textContent = "Start guessing...";
  guess.value = "";
  changeColor();
  changeNumber();
});

//anmation hover
function hover() {
  checkBtn.classList.add("hover");
}

// lost game message
function lostGame() {
  if (scr === 0) {
    msg.textContent = "💥 You lost the game!";
  }
}
