let pongPanel;
let upBtn;
let downBtn;
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
let paddleW;
let paddleH;
const ballR = 5;
let dirX = 120;
let dirY = 120;
let maxBounceAngle = 75;
let isGameOver = false;
let animationID;
let playerScore = 0;
let AIscore = 0;
let lastTime;
let upBtnIsDown = false;
let downBtnIsDown = false;

export function pongInit(response) {
  pongPanel = response.querySelector(".pong-panel");
  canvas = response.querySelector("#pong-canvas");
  const aspectRatio = 3 / 5;
  if (window.innerWidth > 650) {
    canvas.width = 500;
    canvas.height = canvas.width * aspectRatio;
    paddleW = 10;
    paddleH = 50;
  } else {
    canvas.width = window.innerWidth - 30;
    canvas.height = canvas.width * aspectRatio;
    paddleW = 7;
    paddleH = canvas.height / 6;
    upBtn = response.querySelector(".pong-up-btn");
    downBtn = response.querySelector(".pong-down-btn");
  }
  ctx = canvas.getContext("2d");
  AIscoreNode = response.querySelector(".pong-ai-counter");
  playerScoreNode = response.querySelector(".pong-player-counter");
  restartBtn = response.querySelector(".pong-restart-btn");

  setTimeout(() => {
    canvasWidth = canvas.width = canvas.clientWidth;
    canvasHeight = canvas.height = canvas.clientHeight;
    pongPanel.style.width = `${canvasWidth}px`;
    pongPanel.style.height = `${canvasHeight}px`;
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
  if (window.innerWidth > 650) {
    canvas.addEventListener("keydown", addKeydownListener);
  } else {
    addMobileControlListeners();
  }
}

function frame(timestamp) {
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
  mobileControlHandler();
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
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
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
    upBtnIsDown = false;
    downBtnIsDown = false;
  } else if (ballX >= canvasWidth) {
    isGameOver = true;
    AIscore += 1;
    AIscoreNode.textContent = AIscore;
    restartBtn.style.display = "block";
    canvas.removeEventListener("keydown", addKeydownListener);
    upBtnIsDown = false;
    downBtnIsDown = false;
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

function addMobileControlListeners() {
  upBtn.onpointerdown = () => (upBtnIsDown = true);
  upBtn.onpointerup = () => (upBtnIsDown = false);
  upBtn.onpointerleave = () => (upBtnIsDown = false);
  upBtn.onpointerup = () => (upBtnIsDown = false);
  upBtn.oncontextmenu = (e) => e.preventDefault();
  downBtn.onpointerdown = () => (downBtnIsDown = true);
  downBtn.onpointerup = () => (downBtnIsDown = false);
  downBtn.onpointerleave = () => (downBtnIsDown = false);
  downBtn.oncontextmenu = (e) => e.preventDefault();
}

function mobileControlHandler() {
  if (upBtnIsDown && !isGameOver) {
    if (playerPos <= 0) {
      upBtnIsDown = false;
      return;
    }
    playerPos -= 2;
  }
  if (downBtnIsDown && !isGameOver) {
    if (playerPos >= canvasHeight - paddleH) {
      downBtnIsDown = false;
      return;
    }
    playerPos += 2;
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
