// === VARIABLES === //

const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
let missed = 0;
const overlay = document.getElementById("overlay");
const start = document.querySelector(".btn__reset");
const reset = document.querySelector(".btn__reset");
const phrases = [
  "hey my friend",
  "Life is short",
  "Be yourself",
  "Everyday is a grind",
  "Never go to bed mad"
];
const letters = document.getElementsByClassName("letter");
const buttons = document.querySelectorAll("button");
let letterFound = null;
let ol = document.querySelector("ol");
let tries = document.querySelectorAll(".tries");
let count = 0;
const countShow = document.getElementsByClassName("show");

start.addEventListener("click", function() {
  // Hiding the startscreen
  overlay.style.display = "none";
});

function getRandomPhraseAsArray(arr) {
  // returnes a random phrase the phrases array
  let randomPhrase = parseInt(Math.random() * arr.length);
  return arr[randomPhrase];
}

const phraseArray = getRandomPhraseAsArray(phrases);

function addPhraseToDisplay(arr) {
  // add phrases to screen
  for (let i = 0; i < arr.length; i++) {
    const ul = phrase.querySelector("ul");
    let li = document.createElement("li");
    li.textContent = arr[i];
    ul.appendChild(li);
    if (arr[i] != " ") {
      li.className = "letter";
    } else {
      li.className = "space";
    }
  }
}

addPhraseToDisplay(phraseArray);

function checkLetter(button) {
  // check if letter on keyboard is clicked and adds class show
  for (let i = 0; i < letters.length; i++) {
    if (letters[i].textContent === button) {
      letters[i].classList.add("show");
      letters[i].style.transition = "all 1s";
      letterFound = letters[i].textContent;
    }
  }

  return letterFound;
}

qwerty.addEventListener("click", e => {
  // eventhandler for clicking buttons on keyboard
  if (e.target.tagName === "BUTTON") {
    const btn = e.target;
    const clicked = btn.textContent;
    btn.classList.add("chosen");
    checkLetter(clicked);
    letterFound = null;
    btn.disabled = true;
    console.log(checkLetter(clicked));
    if (letterFound === null) {
      missed++;
      ol.removeChild(tries[count]);
      count++;
    }
    checkWin();
  }
});

function checkWin() {
  // check for win or lose and reset the game
  if (countShow.length === letters.length) {
    overlay.style.display = "flex";
    overlay.className = "win";
    start.textContent = "Try again";
    const winText = document.createElement("a");
    winText.textContent = "You won!";
    winText.style.color = "white";
    winText.style.fontSize = "2rem";
    overlay.appendChild(winText);
    start.addEventListener("click", function() {
      location.reload();
    });
  } else if (missed >= 5) {
    overlay.style.display = "flex";
    overlay.className = "lose";
    start.textContent = "Try again";
    const loseText = document.createElement("a");
    loseText.textContent = "You lose!";
    loseText.style.color = "white";
    loseText.style.fontSize = "2rem";
    overlay.appendChild(loseText);
    start.addEventListener("click", function() {
      location.reload();
    });
  }
}
