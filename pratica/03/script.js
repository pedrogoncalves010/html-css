let score = 0;
let time = 30;

const gameContainer = document.getElementById('game-container');
const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const timerElement = document.getElementById('time');
const scoreElement = document.getElementById('score');

gameContainer.addEventListener('mousemove', movePlayer);

function movePlayer(event) {
  const mouseX = event.clientX - gameContainer.getBoundingClientRect().left;
  const mouseY = event.clientY - gameContainer.getBoundingClientRect().top;

  player.style.left = mouseX - player.clientWidth / 2 + 'px';
  player.style.top = mouseY - player.clientHeight / 2 + 'px';
}

function startGame() {
  setInterval(function() {
    time--;
    updateTimer();

    if (time === 0) {
      endGame();
    }
  }, 1000);

  setInterval(moveObstacle, 1000);
}

function moveObstacle() {
  const maxX = gameContainer.clientWidth - obstacle.clientWidth;
  const maxY = gameContainer.clientHeight - obstacle.clientHeight;

  const newX = Math.floor(Math.random() * maxX);
  const newY = Math.floor(Math.random() * maxY);

  obstacle.style.left = newX + 'px';
  obstacle.style.top = newY + 'px';
}

function endGame() {
  alert('Game Over! Your score: ' + score);
  resetGame();
}

function resetGame() {
  score = 0;
  time = 30;
  updateScore();
  updateTimer();
}

function updateTimer() {
  timerElement.textContent = 'Time: ' + time + 's';
}

function updateScore() {
  scoreElement.textContent = 'Score: ' + score;
}

function checkCollision() {
  const playerRect = player.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  if (
    playerRect.left < obstacleRect.right &&
    playerRect.right > obstacleRect.left &&
    playerRect.top < obstacleRect.bottom &&
    playerRect.bottom > obstacleRect.top
  ) {
    score++;
    updateScore();
    moveObstacle();
  }
}

setInterval(checkCollision, 100);
startGame();