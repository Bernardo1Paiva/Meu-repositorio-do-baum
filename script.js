const pacman = document.querySelector(".pacman");
const ghost = document.querySelector(".ghost");
const score = document.querySelector(".score");
const leaderboard = document.querySelector(".leaderboard");
const form = document.querySelector("form");
const nameInput = document.querySelector("#nameInput");
const scoreInput = document.querySelector("#scoreInput");
const submitBtn = document.querySelector("#submitBtn");
const leaderboardList = document.querySelector(".leaderboard-list");
const Restart = document.querySelector(".Restart");

// Adicionar elemento de áudio para tocar a música do Pac-Man
const audioElement = document.createElement("audio");
audioElement.src = "pacman_beginning.mp3";
audioElement.loop = true;
audioElement.autoplay = true;
document.body.appendChild(audioElement);

Restart.addEventListener("click", () => {
  location.reload();
});

let alreadyJump = false;
let count = 0;
let pacmanOpen = false;
let leaderboardEntries = [];

document.addEventListener("keydown", (e) => {
  if ((e.code === "ArrowUp") | (e.code === "Space")) {
    jump();
  }
});

function jump() {
  if (!pacman.classList.contains("jump")) {
    pacman.classList.add("jump");
    alreadyJump = true;

    setTimeout(() => {
      pacman.classList.remove("jump");
      alreadyJump = false;
    }, 1100);
  }
}

setInterval(() => {
  let pacmanBottom = parseInt(
    window.getComputedStyle(pacman).getPropertyValue("bottom")
  );
  let ghostLeft = parseInt(
    window.getComputedStyle(ghost).getPropertyValue("left")
  );

  if (ghostLeft > 40 && ghostLeft < 90 && pacmanBottom <= 50 && !alreadyJump) {
    alert(`Game Over!Aperte em ok depois restart game para jogar novamente, Seu score foi: ${count}`);
    leaderboardEntries.push({ name: "", score: count });
    leaderboard.style.display = "block";
    renderLeaderboard();
    Restart.style.display = "block";
    count = 0;
  }

  count++;
  score.innerHTML = `SCORE: ${count}`;

  if (count % 5 === 0) {
    pacmanOpen = !pacmanOpen;

    if (pacmanOpen) {
      pacman.classList.add("open");
    } else {
      pacman.classList.remove("open");
    }
  }
}, 10);
