const options = document.querySelectorAll(".option");
const gameBoard = document.querySelector(".game-board");

const rulesContainer = document.querySelector(".rules-container");
const rulesBtn = document.querySelector("#rules-btn");
const closeBtn = document.querySelector(".close-btn");
const hurrayContainer = document.querySelector(".hurray-container");
const resultContainer = document.querySelector(".results-container");
const triangleContainer = document.querySelector(".triangle-container");
const playBtn = document.querySelector(".result-announced button");
const yourScore = document.querySelector(".your-score");
const comScore = document.querySelector(".com-score");

updateScore();

function updateScore(winner = null) {
  if (winner === "win") {
    if (localStorage.yourScore) {
      localStorage.yourScore = Number(localStorage.yourScore) + 1;
    } else {
      localStorage.setItem("yourScore", 1);
    }
  } else {
    if (localStorage.comScore) {
      localStorage.comScore = Number(localStorage.comScore) + 1;
    } else {
      localStorage.setItem("comScore", 1);
    }
  }

  yourScore.textContent = localStorage.yourScore || 0;
  comScore.textContent = localStorage.comScore || 0;
}

function makeComChoice() {
  const optionsArr = ["rock", "paper", "scissors"];
  const comScore = Math.floor(Math.random() * 3);
  console.log(comScore);

  return optionsArr[comScore];
}

function playAgain() {
  triangleContainer.classList.remove("hide");
  resultContainer.firstChild.remove();
  resultContainer.lastChild.remove();
  resultContainer.classList.add("hide");
}

playBtn.addEventListener("click", playAgain);

function checkWinner(yourChoice, comChoice) {
  let result;
  if (yourChoice === comChoice) {
    return (result = "Tie");
  } else if (yourChoice === "rock" && comChoice === "scissors") {
    return (result = "win");
  } else if (yourChoice === "paper" && comChoice === "rock") {
    return (result = "win");
  } else if (yourChoice === "scissors" && comChoice === "paper") {
    return (result = "win");
  } else {
    return (result = "lose");
  }
}

function announceWinner(winner, yourChoice, comChoice) {
  updateScore(winner);
  makeResultUI(winner, yourChoice, comChoice);
  if (winner === "win") {
    hurrayContainer.classList.remove("hide");
    gameBoard.classList.add("hide");
  } else {
    triangleContainer.classList.add("hide");
    resultContainer.classList.remove("hide");
  }
}

function makeResultUI(winner, yourChoice, comChoice) {
  let yourChoiceElem = document.querySelector(`#${yourChoice}`).cloneNode(true);
  let comChoiceElem = document.querySelector(`#${comChoice}`).cloneNode(true);

  resultContainer.insertAdjacentElement("afterbegin", yourChoiceElem);
  resultContainer.insertAdjacentElement("beforeend", comChoiceElem);
  if (winner === "win") {
    resultContainer.querySelector("h1").textContent = "YOU WIN";
    resultContainer.querySelector("p").textContent = "AGAINST PC";
    yourChoiceElem.classList.add("winner");
  } else {
    resultContainer.querySelector("h1").textContent = "YOU LOSE";
    resultContainer.querySelector("p").textContent = "AGAINST PC";
    comChoiceElem.classList.add("winner");
  }
}

rulesBtn.addEventListener("click", () =>
  rulesContainer.classList.add("active")
);
closeBtn.addEventListener("click", () =>
  rulesContainer.classList.remove("active")
);

options.forEach((option) => {
  option.addEventListener("click", (e) => {
    const comChoice = makeComChoice();
    console.log(comChoice);
    const yourChoice = e.target.closest(".option").getAttribute("id");
    const winner = checkWinner(yourChoice, comChoice);
    announceWinner(winner, yourChoice, comChoice);
  });
});

hurrayContainer.addEventListener("click", () => {
  gameBoard.classList.remove("hide");
  triangleContainer.classList.add("hide");
  hurrayContainer.classList.add("hide");
  resultContainer.classList.remove("hide");
});
