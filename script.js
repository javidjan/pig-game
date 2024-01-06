"use strict";

const p0TotalScoreEl = document.querySelector("#player-0-total-score");
const p1TotalScoreEl = document.querySelector("#player-1-total-score");
const p0CurrentScoreEl = document.querySelector("#player-0-current-score");
const p1CurrentScoreEl = document.querySelector("#player-1-current-score");
const diceEl = document.querySelector(".dice");

const p0Div = document.querySelector("#player-0-div");
const p1Div = document.querySelector("#player-1-div");

const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");

let activePlayer, currentScore, scores, palying;

const init = function () {
  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  palying = true;

  p0CurrentScoreEl.textContent = 0;
  p1CurrentScoreEl.textContent = 0;
  p0TotalScoreEl.textContent = 0;
  p1TotalScoreEl.textContent = 0;

  diceEl.classList.add("hidden");
  p0Div.classList.remove("winner_player");
  p1Div.classList.remove("winner_player");
  p0Div.classList.add("player--active");
  p1Div.classList.remove("player--active");
};

init();

const switchPlayer = function () {
  document.getElementById(
    `player-${activePlayer}-current-score`
  ).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  p0Div.classList.toggle("player--active");
  p1Div.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (palying) {
    diceEl.classList.remove("hidden");
    let roll_value = Math.floor(Math.random() * 6) + 1;
    // `dice-${dice}.png`
    diceEl.src = "dice-" + roll_value + ".png";

    if (roll_value !== 1) {
      currentScore += roll_value;
      document.getElementById(
        `player-${activePlayer}-current-score`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (palying) {
    scores[activePlayer] += currentScore;
    document.getElementById(`player-${activePlayer}-total-score`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 50) {
      palying = false;
      diceEl.classList.add("hidden");
      document
        .getElementById(`player-${activePlayer}-div`)
        .classList.add("winner_player");
      document
        .getElementById(`player-${activePlayer}-div`)
        .classList.toggle("player--active");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
