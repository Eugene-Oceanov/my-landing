import logicLib from "./library.js";

let canvas;
let ctx;
let countNode;
let tile = 25;
let grid;
let snake = [];
const directions = {
  up: { x: 0, y: -1 },
  right: { x: 1, y: 0 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
};
let direction = directions.right;
let directionQueue = [];
let apple;
let delay;
let score;
let isRunning;
let bestResult = localStorage.getItem("snakeBest")
  ? localStorage.getItem("snakeBest")
  : 0;

export function snakeInit(response) {
  canvas = response.querySelector("#snake-canvas");
  ctx = canvas.getContext("2d");
  grid = canvas.width / tile;
  countNode = response.querySelector(".snake-score");
  snake.length = 0;
  snake.push({
    x: logicLib.getRandomInt(0, grid - 1),
    y: logicLib.getRandomInt(0, grid - 1),
  });
  direction = directions.right;
  apple = getApple();
  score = 0;
  isRunning = true;
  delay = 500;
  draw();
  setTimeout(() => frame(), delay);
  setTimeout(() => canvas.focus(), 0);
  canvas.addEventListener("keydown", addKeydownListener);
}

function frame() {
  if (!isRunning) return;
  if (directionQueue.length) {
    direction = directionQueue.shift();
  }
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  if (head.x > grid - 1) head.x = 0;
  if (head.x < 0) head.x = grid - 1;
  if (head.y > grid - 1) head.y = 0;
  if (head.y < 0) head.y = grid - 1;
  snake.unshift(head);
  if (checkCollision()) {
    gameOver();
    return;
  }
  if (snake[0].x == apple.x && snake[0].y == apple.y) {
    let preApple;
    do {
      preApple = getApple();
    } while (
      snake.some((item) => item.x === preApple.x && item.y === preApple.y)
    );
    apple = preApple;
    score++;
    if (score > parseInt(bestResult)) {
      countNode.textContent = `Счет: ${score}. Лучший результат: ${score}.`;
      bestResult = score;
      localStorage.setItem("snakeBest", score);
    } else {
      countNode.textContent = `Счет: ${score}. Лучший результат: ${parseInt(bestResult)}.`;
    }

    if (delay > 50) delay = delay - 10;
  } else snake.pop();
  draw();
  if (isRunning) setTimeout(frame, delay);
}

function draw() {
  let backgroundColor;
  let snakeColor;
  if (document.getElementById("app").classList.contains("light")) {
    backgroundColor = "#f1f1f1";
    snakeColor = "#000000";
  } else {
    backgroundColor = "#000000";
    snakeColor = "#ffffff";
  }
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = snakeColor;
  ctx.fillRect(tile * apple.x, tile * apple.y, tile, tile);
  if (snake.length > 0) {
    snake.forEach((item) => {
      ctx.fillRect(tile * item.x, tile * item.y, tile, tile);
    });
  }
}

function getApple() {
  let appleX = logicLib.getRandomInt(0, grid - 1);
  let appleY = logicLib.getRandomInt(0, grid - 1);
  return { x: appleX, y: appleY };
}

function checkCollision() {
  const currentHead = snake[0];
  for (let i = 1; i < snake.length; i++) {
    if (currentHead.x == snake[i].x && currentHead.y == snake[i].y) return true;
  }
  return false;
}

function stopGame() {
  isRunning = false;
  delay = null;
  canvas.removeEventListener("keydown", addKeydownListener);
}

function gameOver() {
  stopGame();
  canvas.remove();
  countNode.textContent = "Вы можете лучше.";
  countNode.classList.remove("snake-score");
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function addKeydownListener(e) {
  let newDir = null;
  if (e.key === "ArrowUp") {
    e.preventDefault();
    newDir = directions.up;
  }
  if (e.key === "ArrowRight") {
    newDir = directions.right;
  }
  if (e.key === "ArrowDown") {
    e.preventDefault();
    newDir = directions.down;
  }
  if (e.key === "ArrowLeft") {
    newDir = directions.left;
  }
  if (!newDir) return;
  const last = directionQueue.length
    ? directionQueue[directionQueue.length - 1]
    : direction;

  if (last.x + newDir.x === 0 && last.y + newDir.y === 0) return;
  if (last.x === newDir.x && last.y === newDir.y) return;
  directionQueue.push(newDir);
}

export function stopSnake() {
  if (document.querySelector("#snake-canvas")) {
    stopGame();
  }
}
