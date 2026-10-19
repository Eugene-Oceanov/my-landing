import logicLib from "./library.js";

let canvas = null;
let ctx = null;
let countNode = null;
let tile = 25;
let grid = null;
let snake = [];
const directions = {
  up: { x: 0, y: -1 },
  right: { x: 1, y: 0 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
};
let direction = directions.right;
let apple;
let delay = 500;
let score = 0;
let isRunning = true;
let bestResult = localStorage.getItem("snakeBest")
  ? localStorage.getItem("snakeBest")
  : 0;

export function gameInit(response) {
  canvas = response.querySelector("#snake-canvas");
  canvas.focus();
  ctx = canvas.getContext("2d");
  grid = canvas.width / tile;
  countNode = response.querySelector(".snake-score");
  snake.push({
    x: logicLib.getRandomInt(0, grid),
    y: logicLib.getRandomInt(0, grid),
  });
  apple = getApple();
  draw();
  setTimeout(() => gameCycle(bestResult), delay);
  keydownListener();
}

function gameCycle() {
  if (!isRunning) return;
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  if (head.x > grid - 1) head.x = 0;
  if (head.x < 0) head.x = grid - 1;
  if (head.y > grid - 1) head.y = 0;
  if (head.y < 0) head.y = grid - 1;
  snake.unshift(head);
  if (checkCollision()) gameOver();
  if (snake[0].x == apple.x && snake[0].y == apple.y) {
    apple = getApple();
    score++;
    if (score > parseInt(bestResult)) {
      countNode.textContent = `Счет: ${score}. Лучший результат: ${score}.`;
      localStorage.setItem("snakeBest", score);
    } else {
      countNode.textContent = `Счет: ${score}. Лучший результат: ${parseInt(bestResult)}.`;
    }

    if (delay > 50) delay = delay - 10;
  } else snake.pop();
  draw();
  setTimeout(gameCycle, delay);
}

function draw() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
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

function gameOver() {
  isRunning = false;
  canvas.remove();
  countNode.textContent = "Вы можете лучше.";
  countNode.classList.remove("snake-score");
}

function keydownListener() {
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && direction != directions.down) {
      e.preventDefault();
      direction = directions.up;
    }
    if (e.key === "ArrowRight" && direction != directions.left)
      direction = directions.right;
    if (e.key === "ArrowDown" && direction != directions.up) {
      e.preventDefault();
      direction = directions.down;
    }
    if (e.key === "ArrowLeft" && direction != directions.right)
      direction = directions.left;
  });
}
