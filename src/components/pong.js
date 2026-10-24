import logicLib from "./library.js";

let canvas = null;
let ctx = null;
let canvasWidth = null;
let canvasHeight = null;
let playerPos = null;
let AIpos = null;
let ballX = null;
let ballY = null;
const paddleW = 10;
const paddleH = 50;
const ballR = 5;
let dirX = 2;
let dirY = 2;
let maxBounceAngle = 70;
let isGameOver = false;
let animationID;

export function pongInit(response) {
  setTimeout(() => {
    canvas = response.querySelector("#pong-canvas");
    ctx = canvas.getContext("2d");
    canvasWidth = canvas.width = canvas.clientWidth;
    canvasHeight = canvas.height = canvas.clientHeight;
    playerPos = canvasHeight / 2 - paddleH / 2;
    AIpos = canvasHeight / 2 - paddleH / 2;
    ballX = canvasWidth / 2 - ballR;
    ballY = canvasHeight / 2 - ballR;
    requestAnimationFrame(frame);
  }, 0);
}

function frame() {
  if (isGameOver) return;
  ballMove();
  moveAI();
  checkCollision();
  draw();
  animationID = requestAnimationFrame(frame);
}

function draw() {
  ctx.beginPath();
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, AIpos, paddleW, paddleH);
  ctx.fillRect(canvasWidth - paddleW, playerPos, paddleW, paddleH);
  ctx.arc(ballX, ballY, ballR, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

function ballMove() {
  ballX += dirX;
  ballY += dirY;
}

function moveAI() {
  if (ballY - 5 <= AIpos) {
    if (AIpos <= 0) return;
    AIpos -= 10;
  }
  if (ballY + 5 >= AIpos + paddleH) {
    if (AIpos >= canvasHeight - paddleH) return;
    AIpos += 10;
  }
}

function checkCollision() {
  checkWallCollision();
  checkPlayerCollision();
  checkAIcollision();
  if (ballX < 0 || ballX > canvasWidth) isGameOver = true;
}

function checkWallCollision() {
  if (ballY >= canvasHeight - ballR || ballY <= 0 + ballR) {
    if (ballY <= ballR) ballY = ballR;
    if (ballY >= canvasHeight - ballR) ballY = canvasHeight - ballR;
    dirY = -dirY;
  }
}

function checkPlayerCollision() {
  if (
    ballX >= canvasWidth - paddleW - ballR &&
    ballY >= playerPos &&
    ballY <= playerPos + paddleH
  ) {
    ballX = canvasWidth - paddleW - ballR;
    dirX = -dirX;
    calcBounceAngle(playerPos);
  }
}

function checkAIcollision() {
  if (ballX <= paddleW + ballR && ballY >= AIpos && ballY <= AIpos + paddleH) {
    ballX = paddleW + ballR;
    dirX = -dirX;
  }
}

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    if (playerPos <= 0) return;
    playerPos -= 10;
  } else if (e.key === "ArrowDown") {
    if (playerPos >= canvasHeight - paddleH) return;
    playerPos += 10;
  }
});

function calcBounceAngle(pos) {
  let paddleCenter = pos + paddleH / 2; // центр ракетки во время удара
  let ballOffsetFromPaddleCenter = paddleCenter - ballY; // смещение мяча относительно центра ракетки
  let normalizeOffset = ballOffsetFromPaddleCenter / (paddleH / 2);
  let bounceAngleRadian = (normalizeOffset * maxBounceAngle) / (Math.PI / 180);
  dirX = dirX * -Math.cos(bounceAngleRadian);
  dirY = dirY * -Math.sin(bounceAngleRadian);
  console.log(normalizeOffset);
}
