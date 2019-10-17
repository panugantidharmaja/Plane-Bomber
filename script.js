var score = document.getElementsByClassName("dashboard")[0];
var gameArea = document.getElementsByClassName("gameArea")[0];
var startButton = document.getElementById("button");
document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);
var planeDiv = {
  score: 0,
  speed: 5,
  playGame: false
};
var keys = {
  space: false
};
function start() {
  playGame = true;
  document.getElementsByClassName("buttonDiv")[0].style.display = "none";
  planeDiv.plane = document.getElementsByClassName("plane")[0];
  if (playGame) {
    blocks();
    planeDiv.ready = true;
    console.log("game started");
    planeDiv.x = planeDiv.plane.offsetLeft;
    planeDiv.y = planeDiv.plane.offsetTop;
    console.log(planeDiv.x);
    gamePlay();
  }
}

function blocks() {
  planeDiv.block = document.getElementsByClassName("blocks")[0];
  planeDiv.block.style.width = Math.round(Math.random() * 300) + "px";
  planeDiv.block.style.heigth = Math.round(Math.random() * 100) + "px";
  planeDiv.block.style.left =
    Math.floor(Math.random() * (gameArea.offsetWidth - 200)) + 100 + "px";
}

function endGame() {
  document.getElementsByClassName("gameArea")[0].style.display = "none";
  document.getElementsByClassName("playAgain")[0].style.display = "block";
}
function makeBomb() {
  if (planeDiv.score >= 1000) endGame();
  if (planeDiv.ready) {
    let bomb = document.createElement("div");
    bomb.classList.add("bomb");
    bomb.y = planeDiv.y;
    bomb.x = planeDiv.x;
    bomb.style.left = bomb.x + "px";
    bomb.style.top = bomb.y + "px";
    gameArea.appendChild(bomb);
    planeDiv.ready = false;
    setTimeout(function() {
      planeDiv.ready = true;
    }, 500);
    console.log("making bomb");
  }
}
function moveBomb() {
  if (planeDiv.score >= 1000) endGame();
  let bombs = document.querySelectorAll(".bomb");
  bombs.forEach(function(item) {
    item.y += 5;
    item.style.top = item.y + "px";
    if (item.y > 1000) {
      planeDiv.activeBomb--;
      item.parentElement.removeChild(item);
    }
    if (isHit(item, planeDiv.block)) {
      planeDiv.score += 100;
      console.log("hit target");
      item.parentElement.removeChild(item);
      blocks();
    }
  });
}
function isHit(a, b) {
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();
  return !(
    aRect.bottom <= bRect.top ||
    aRect.top >= bRect.bottom ||
    aRect.right <= bRect.left ||
    aRect.left >= bRect.right
  );
}
function gamePlay() {
  moveBomb();
  if (keys.space) makeBomb();

  if (keys.ArrowUp && planeDiv.y > 70) {
    planeDiv.y -= planeDiv.speed;
  }
  if (keys.ArrowDown && planeDiv.y < 400) {
    planeDiv.y += planeDiv.speed;
  }
  if (keys.ArrowRight && planeDiv.x < gameArea.offsetWidth) {
    planeDiv.x += planeDiv.speed;
  }

  if (planeDiv.x >= gameArea.offsetWidth) {
    planeDiv.x = 0;
    console.log(planeDiv.x);
  }

  console.log("playing game");
  planeDiv.plane.style.top = planeDiv.y + "px";
  planeDiv.plane.style.left = planeDiv.x + "px";
  window.requestAnimationFrame(gamePlay);
  score.innerHTML = "Score:" + planeDiv.score;
  if (planeDiv.score >= 1000) {
    endGame();
  }
}

function pressOn(e) {
  e.preventDefault();
  let tempKey = e.key == " " ? "space" : e.key;
  keys[tempKey] = true;
}
function pressOff(e) {
  e.preventDefault();
  let tempKey = e.key == " " ? "space" : e.key;
  keys[tempKey] = false;
}
function playAgain() {
  location.reload();
}
