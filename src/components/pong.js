let pongInfo;
let AIscoreNode;
let playerScoreNode;
let restartBtn;
let canvas;
let ctx;
let canvasWidth;
let canvasHeight;
let playerPos;
let AIpos;
let ballX;
let ballY;
const paddleW = 10;
const paddleH = 50;
const ballR = 5;
let dirX = 120;
let dirY = 120;
let maxBounceAngle = 75;
let isGameOver = false;
let animationID;
let playerScore = 0;
let AIscore = 0;
let lastTime;

export function pongInit(response) {
  pongInfo = response.querySelector(".pong-info");
  canvas = response.querySelector("#pong-canvas");
  ctx = canvas.getContext("2d");
  AIscoreNode = response.querySelector(".pong-ai-counter");
  playerScoreNode = response.querySelector(".pong-player-counter");
  restartBtn = response.querySelector(".pong-restart-btn");

  setTimeout(() => {
    canvasWidth = canvas.width = canvas.clientWidth;
    canvasHeight = canvas.height = canvas.clientHeight;
    pongInfo.style.width = `${canvasWidth}px`;
    pongInfo.style.height = `${canvasHeight}px`;
    restartBtn.addEventListener("click", startPong);
    startPong();
  }, 0);
}

function startPong() {
  isGameOver = false;
  if (animationID != null) {
    cancelAnimationFrame(animationID);
    animationID = null;
  }
  playerPos = canvasHeight / 2 - paddleH / 2;
  AIpos = canvasHeight / 2 - paddleH / 2;
  ballX = canvasWidth / 2 - ballR;
  ballY = canvasHeight / 2 - ballR;
  dirX = 120;
  dirY = 120;
  restartBtn.style.display = "none";
  lastTime = 0;
  animationID = requestAnimationFrame(frame);
  canvas.focus();
  canvas.addEventListener("keydown", addKeydownListener);
}

function frame(timestamp) {
  // if (!document.querySelector("#pong-canvas")) {
  //   isGameOver = true;
  //   canvas.removeEventListener("keydown", addKeydownListener);
  //   cancelAnimationFrame(animationID);
  // }
  if (isGameOver) return;
  if (!lastTime) {
    lastTime = timestamp;
    animationID = requestAnimationFrame(frame);
    return;
  }
  const deltaTime = (timestamp - lastTime) / 1000;
  lastTime = timestamp;
  ballMove(deltaTime);
  moveAI(deltaTime);
  checkCollision();
  draw();
  animationID = requestAnimationFrame(frame);
}

function draw() {
  let backgroundColor;
  let elementsColor;
  if (document.getElementById("app").classList.contains("light")) {
    backgroundColor = "#f1f1f1";
    elementsColor = "#000000";
  } else {
    backgroundColor = "#000000";
    elementsColor = "#ffffff";
  }
  ctx.beginPath();
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = elementsColor;
  ctx.fillRect(0, AIpos, paddleW, paddleH);
  ctx.fillRect(canvasWidth - paddleW, playerPos, paddleW, paddleH);
  ctx.arc(ballX, ballY, ballR, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

function ballMove(deltaTime) {
  if (!Number.isFinite(deltaTime)) return;
  ballX += dirX * deltaTime;
  ballY += dirY * deltaTime;
}

function moveAI(deltaTime) {
  if (!Number.isFinite(deltaTime)) return;
  if (dirX >= 0) return;
  if (ballY - 5 <= AIpos) {
    if (AIpos <= 0) return;
    AIpos -= 125 * deltaTime;
  }
  if (ballY + 5 >= AIpos + paddleH) {
    if (AIpos >= canvasHeight - paddleH) return;
    AIpos += 125 * deltaTime;
  }
}

function checkCollision() {
  checkWallCollision();
  checkPlayerCollision();
  checkAIcollision();
  gameOver();
}

function checkWallCollision() {
  if (ballY + ballR >= canvasHeight || ballY - ballR <= 0) {
    if (ballY <= ballR) ballY = ballR;
    if (ballY >= canvasHeight - ballR) ballY = canvasHeight - ballR;
    dirY = -dirY;
  }
}

function checkPlayerCollision() {
  if (
    ballX + ballR >= canvasWidth - paddleW &&
    ballY + ballR >= playerPos &&
    ballY - ballR <= playerPos + paddleH
  ) {
    calcBounceAngle(playerPos, 1);
    ballX = canvasWidth - paddleW - ballR;
    dirX = -dirX;
  }
}

function checkAIcollision() {
  if (
    ballX - ballR <= paddleW &&
    ballY + ballR >= AIpos &&
    ballY - ballR <= AIpos + paddleH
  ) {
    calcBounceAngle(AIpos, -1);
    ballX = paddleW + ballR;
    dirX = -dirX;
  }
}

function gameOver() {
  if (ballX <= 0) {
    isGameOver = true;
    playerScore += 1;
    playerScoreNode.textContent = playerScore;
    restartBtn.style.display = "block";
    canvas.removeEventListener("keydown", addKeydownListener);
  } else if (ballX >= canvasWidth) {
    isGameOver = true;
    AIscore += 1;
    AIscoreNode.textContent = AIscore;
    restartBtn.style.display = "block";
    canvas.removeEventListener("keydown", addKeydownListener);
  }
}

function addKeydownListener(e) {
  if (e.key === "ArrowUp" && !isGameOver) {
    if (playerPos <= 0) return;
    e.preventDefault();
    playerPos -= 10;
  } else if (e.key === "ArrowDown" && !isGameOver) {
    if (playerPos >= canvasHeight - paddleH) return;
    e.preventDefault();
    playerPos += 10;
  }
}

function calcBounceAngle(pos, direction) {
  const paddleCenterY = pos + paddleH / 2;
  let normalized = (ballY - paddleCenterY) / (paddleH / 2);
  normalized = Math.max(-1, Math.min(1, normalized));
  const angle = normalized * maxBounceAngle * (Math.PI / 180);
  const speed = Math.hypot(dirX, dirY);
  dirX = direction * Math.cos(angle) * speed;
  dirY = Math.sin(angle) * speed;
}

export function stopPong() {
  if (document.querySelector("#pong-canvas")) {
    isGameOver = true;
    canvas.removeEventListener("keydown", addKeydownListener);
    cancelAnimationFrame(animationID);
  }
}
