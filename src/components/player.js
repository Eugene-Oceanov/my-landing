import futureClubPerturbator from "../assets/music/Perturbator - Future Club.mp3";
import otelPacificSmertKotardy from "../assets/music/котарды-Отель Пацифик-Смерть.mp3";

let audio;
let songInfo;
let progressBarOuter;
let progressBarInner;
let timer;
let fullDuration;
let playBtn;
let pauseBtn;
let prevBtn;
let nextBtn;
let canvas;
let ctx;
let audioCtx;
let analyser;
let bufferLength;
let dataArray;
let source;
let isPause = true;
let songIndex = 0;
let currentSong;
let animationID;
const musicBase = [
  {
    id: 0,
    songTitle: "Future Club",
    songAuthor: "Perturbator",
    file: futureClubPerturbator,
  },
  {
    id: 1,
    songTitle: "Отель Пацифик-смерть",
    songAuthor: "котарды",
    file: otelPacificSmertKotardy,
  },
];

export async function playerInit(response) {
  response.onload = () => {};
  const audio = response.querySelector("#audio");
  const songInfo = response.querySelector(".song-info");
  const progressBarOuter = response.querySelector(".progress-bar-outer");
  const progressBarInner = response.querySelector(".progress-bar-inner");
  const timer = response.querySelector(".song-timer");
  const fullDuration = response.querySelector(".song-duration");
  const bottomBlock = response.querySelector(".player-bottom-block");
  const controlsBlock = response.querySelector(".player-controls");
  const playBtn = response.querySelector(".player-play-btn");
  const pauseBtn = response.querySelector(".player-pause-btn");
  const prevBtn = response.querySelector(".player-prev-btn");
  const nextBtn = response.querySelector(".player-next-btn");
  const canvas = response.querySelector("#player-canvas");
  const ctx = canvas.getContext("2d");
  let currentSong = musicBase[0];
  audio.crossOrigin = "anonymous";
  audio.src = currentSong.file;
  songInfo.innerHTML = getSongInfo();
  audio.load();
  audio.onloadeddata = () => {
    fullDuration.textContent = songTimeToString(audio.duration);
  };
  audio.onended = () => nextMusic();
  progressBarOuter.onclick = (e) => setProgress(e);
  playBtn.onclick = () => playMusic();
  pauseBtn.onclick = () => pauseMusic();
  prevBtn.onclick = () => prevMusic();
  nextBtn.onclick = () => nextMusic();
  canvas.height = 32;
  setTimeout(() => {
    canvas.width = bottomBlock.offsetWidth - controlsBlock.offsetWidth - 30;
  }, 0);
  equalizerInit();
}

async function playMusic() {
  if (audioCtx && audioCtx.state === "suspended") {
    await audioCtx.resume();
  }
  try {
    await audio.play();
    isPause = false;
    playBtn.style.display = "none";
    pauseBtn.style.display = "inline-block";
    audio.ontimeupdate = (e) => {
      getProgress(e);
      timer.textContent = songTimeToString(audio.currentTime);
    };
    if (!animationID) drawEqualizer();
  } catch {
    console.error("Воспроизведение аудио завершилось ошибкой.");
  }
}

function pauseMusic() {
  audio.pause();
  isPause = true;
  playBtn.style.display = "inline-block";
  pauseBtn.style.display = "none";
  if (animationID) {
    cancelAnimationFrame(animationID);
    animationID = null;
  }
}

function changeTrack() {
  audio.src = currentSong.file;
  songInfo.innerHTML = getSongInfo();
  audio.load();
  if (!isPause) {
    audio.play();
  }
}

function prevMusic() {
  songIndex === 0 ? (songIndex = musicBase.length - 1) : songIndex--;
  currentSong = musicBase[songIndex];
  changeTrack();
}

function nextMusic() {
  songIndex === musicBase.length - 1 ? (songIndex = 0) : songIndex++;
  currentSong = musicBase[songIndex];
  changeTrack();
}

function getSongInfo() {
  return `${currentSong.songAuthor} - <span class="song-title yellow-text">${currentSong.songTitle}</span>`;
}

function getProgress() {
  if (isPause) return;
  progressBarInner.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
}

function setProgress(e) {
  const offsetX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (offsetX / e.currentTarget.clientWidth) * duration;
  getProgress();
}

function songTimeToString(timestamp) {
  let minutes = Math.floor(timestamp / 60);
  let seconds = Math.floor(timestamp - minutes * 60);
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${seconds}`;
}

function equalizerInit() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 32;
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
  source = audioCtx.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioCtx.destination);
}

function drawEqualizer() {
  animationID = requestAnimationFrame(drawEqualizer);
  let backgroundColor;
  let barColor;
  if (document.getElementById("app").classList.contains("light")) {
    backgroundColor = "#f1f1f1";
    barColor = "#000000";
  } else {
    backgroundColor = "#000000";
    barColor = "#ffffff";
  }
  analyser.getByteFrequencyData(dataArray);
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const barWidth = canvas.width / bufferLength - 1;
  let barHeight;
  let x = 0;
  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i] - 1;
    ctx.fillStyle = barColor;
    ctx.fillRect(x, canvas.height - barHeight / 9, barWidth, barHeight / 9);
    x += barWidth + 1;
  }
}

export function stopPlayer() {
  if (document.querySelector(".player")) {
    audio.stop();
    isPause = true;
    cancelAnimationFrame(animationID);
    animationID = null;
  }
}
