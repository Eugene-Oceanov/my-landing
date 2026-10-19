const pathString = "guest-user@my-site.com:~$";
import { gameInit } from "./snake.js";
import { playerInit } from "./player.js";
import playerPlayBtn from "../assets/img/play-btn.png";
import playerPauseBtn from "../assets/img/pause-btn.png";
import playerNextBtn from "../assets/img/next-btn.png";

const commandsText = [
  {
    "Информационные команды": [
      { "about me": 'Введите "about me" что бы получить информацию обо мне.' },
      { skills: 'Введите "skills" что бы получить информацию о моих навыках.' },
      { resume: 'Введите "resume" что бы скачать мое резюме.' },
      {
        contacts:
          'Введите "contacts" что бы увидеть узнать о способах связи со мной.',
      },
      { banner: 'Введите "banner" что бы увидеть старторвое сообщение.' },
    ],
  },
  {
    "Системные команды": [
      { help: 'Введите "help" что бы увидеть доступные команды.' },
      { clear: 'Введите "clear" для очистки экрана.' },
      { date: 'Введите "date" для получения текущих даты и времени.' },
    ],
  },
];

function getResponseItem(command, date) {
  const responseItem = document.createElement("DIV");
  responseItem.classList.add("response-item");
  responseItem.innerHTML = `<p class="response-head">${date} ${pathString} <span class="yellow-text">${command}</span></p>
                              <div class="response-body"></div>`;
  return responseItem;
}

const layoutLib = {
  getSkillsResponse: function (date) {
    const responseItem = getResponseItem("skills", date);
    responseItem.querySelector(".response-body").innerHTML = `
    <table>
      <tr>
        <td class="yellow-text">HTML</td>
        <td>[█████████_] 90%</td>
      </tr>
      <tr>
        <td class="yellow-text">CSS</td>
        <td>[█████████_] 90%</td>
      </tr>
      <tr>
        <td class="yellow-text">SASS</td>
        <td>[███████___] 70%</td>
      </tr>
      <tr>
        <td class="yellow-text">JavaScript</td>
        <td>[████████__] 80%</td>
      </tr>
      <tr>
        <td class="yellow-text">TypeScript</td>
        <td>[█████_____] 50%</td>
      </tr>
      <tr>
        <td class="yellow-text">React</td>
        <td>[███_______] 30%</td>
      </tr>
      <tr>
        <td class="yellow-text">Vue.js</td>
        <td>[█████_____] 50%</td>
      </tr>
      <tr>
        <td class="yellow-text">Git</td>
        <td>[████████__] 80%</td>
      </tr>
    </table>
    `;
    return responseItem;
  },

  getHelpResponse: function (date) {
    const responseItem = getResponseItem("help", date);
    responseItem.querySelector(".response-body").innerHTML = `
        <table class="help-table">
            <tr><td colspan="2">Информационные команды</td></tr>
            <tr>
                <td class="yellow-text">aboutme</td>
                <td>Введите "aboutme" что бы получить информацию обо мне.</td>
            </tr>
            <tr>
                <td class="yellow-text">skills</td>
                <td>Введите "skills" что бы получить информацию о моих навыках.</td>
            </tr>
            <tr>
                <td class="yellow-text">resume</td>
                <td>Введите "resume" что бы скачать мое резюме.</td>
            </tr>
            <tr>
                <td class="yellow-text">contacts</td>
                <td>Введите "contacts" что бы увидеть узнать о способах связи со мной.</td>
            </tr>
            <tr>
                <td class="yellow-text">banner</td>
                <td>Введите "banner" что бы увидеть старторвое сообщение.</td>
            </tr>
            <tr><td colspan="2">Системные команды</td></tr>
            <tr>
                <td class="yellow-text">help</td>
                <td>Введите "help" что бы увидеть доступные команды.</td>
            </tr>
            <tr>
                <td class="yellow-text">date</td>
                <td>Введите "date" для получения текущих даты и времени</td>
            </tr>
            <tr>
                <td class="yellow-text">theme</td>
                <td>Введите "theme" для смены темы приложения на светлую/темную.</td>
            </tr>
            <tr>
                <td class="yellow-text">list</td>
                <td>Введите "list" для доступа к текущей директории.</td>
            </tr>
            <tr>
                <td class="yellow-text">cd</td>
                <td>Введите "cd" для смены текущей директории.</td>
            </tr>
            <tr>
                <td class="yellow-text">sudo rm -rf /</td>
                <td>Введите "sudo" для ██████ ███ ██████.</td>
            </tr>
            <tr>
                <td class="yellow-text">whoami</td>
                <td>Введите "whoami" для получения логина текущего пользователя.</td>
            </tr>
            <tr>
                <td class="yellow-text">clear</td>
                <td>Введите "clear" для очистки экрана</td>
            </tr>
            <tr><td colspan="2">Развлекательные команд</td></tr>
            <tr>
                <td class="yellow-text">doom</td>
                <td>Введите "doom" что бы сыграть в Doom.</td>
            </tr>
            <tr>
                <td class="yellow-text">pong</td>
                <td>Введите "pong" что бы сыграть в Понг.</td>
            </tr>
            <tr>
                <td class="yellow-text">snake</td>
                <td>Введите "snake" что бы сыграть в Змейку.</td>
            </tr>
            <tr>
                <td class="yellow-text">quest</td>
                <td>Введите "quest" что бы сыграть в текстовый квест.</td>
            </tr>
            <tr>
                <td class="yellow-text">music</td>
                <td>Введите "music" что бы послушать музыку, которая мне нравится.</td>
            </tr>
        </table>`;
    return responseItem;
  },

  getBannerResponse: function (date) {
    const responseItem = getResponseItem("banner", date);
    responseItem.querySelector(".response-body").innerHTML = `
    <p class="yellow-text">#===========================================#
#     ______                                #
#    / ____/_  ______ ____  ____  ___       #
#   / __/ / / / / __ \\/ _ \\/ __ \\/ _ \\      #
#  / /___/ /_/ / /_/ /  __/ / / /  __/      #
# /_____/\\____/\\__, /\\___/_/ /_/\\___/       #
#   / __ \\____/____/____ _____  ____ _   __ #
#  / / / / ___/ _ \\/ __ \\/ __ \\/ __ \\ | / / #
# / /_/ / /__/  __/ /_/ / / / / /_/ / |/ /  #
# \\____/\\___/\\___/\\____/_/ /_/\\____/|___/   #
#                                           #
#===========================================#</p>
    <p># Фронтенд разработчик</p>
    <p>my-site.com Все права защищены (c)</p>
    <p>Введите "<span class="yellow-text">help</span>" что бы увидеть доступные команды.</p>
  `;
    return responseItem;
  },

  getDateResponse: function (date) {
    const responseItem = getResponseItem("whoami", date);
    responseItem.querySelector(".response-body").innerHTML = `<p>${date}</p>`;
    return responseItem;
  },

  getThemeResponse: function (flag, date) {
    const responseItem = getResponseItem("theme", date);
    const themeIs = flag ? "темную" : "светлую";
    responseItem.querySelector(".response-body").innerHTML =
      `<p>Тема изменена на ${themeIs}</p>`;
    return responseItem;
  },

  getListresponse: function (command, date) {
    const responseItem = getResponseItem(command, date);
  },

  getSudoResponse: function (date) {
    const responseItem = getResponseItem("sudo", date);
    responseItem.querySelector(".response-body").innerHTML =
      `<p>Хорошая попытка))) Об этом будет доложено.</p>`;
    return responseItem;
  },

  getWhoamiResponse: function (date) {
    const responseItem = getResponseItem("whoami", date);
    responseItem.querySelector(".response-body").innerHTML =
      `<p>guest-user@my-site.com</p>`;
    return responseItem;
  },

  getClearResponse: function (output, storage) {
    output.innerHTML = "";
    storage.length = 0;
    localStorage.removeItem("commandsHistory");
  },

  getSnakeResponse: function (date) {
    const responseItem = getResponseItem("snake", date);
    let bestResult = localStorage.getItem("snakeBest")
      ? localStorage.getItem("snakeBest")
      : 0;
    if (document.querySelector("#snake-canvas")) {
      responseItem.querySelector(".response-body").innerHTML =
        "<p>Вы уже играете в змейку</p>";
    } else {
      responseItem.querySelector(".response-body").innerHTML = `
        <p class="snake-score">Счет: 0. Лучший результат: ${bestResult}.</p>
        <canvas id="snake-canvas" width="500" height="500"></canvas>
        `;
      gameInit(responseItem);
    }
    return responseItem;
  },

  getMusicResponse: function (date) {
    const responseItem = getResponseItem("music", date);
    responseItem.querySelector(".response-body").innerHTML = `
    <audio id="audio" preload="metadata"></audio>
    <div class="player">
      <p class="song-info"><span class="song-author">The Police</span> - <span class="song-title yellow-text">Every Breath You Take</span></p>
      <div class="progress-bar-outer">
        <div class="progress-bar-inner"></div>
      </div>
      <div class="player-time-info">
        <p class="song-timer">0:00</p>
        <p class="song-duration">0:00</p>
      </div>
      <div class="player-bottom-block">
        <div class="player-controls">
          <img src="${playerNextBtn}" alt="prev" class="player-control-btn player-prev-btn">
          <img src="${playerPlayBtn}" alt="play" class="player-control-btn player-play-btn">
          <img src="${playerPauseBtn}" alt="play" class="player-control-btn player-pause-btn" style="display: none">
          <img src="${playerNextBtn}" alt="prev" class="player-control-btn player-next-btn">
        </div>
        <canvas id="player-canvas"></canvas>
      </div>
    </div>
    `;
    playerInit(responseItem);
    return responseItem;
  },

  getInvalidResponse: function (command, date) {
    const responseItem = getResponseItem(command, date);
    responseItem.querySelector("span").textContent +=
      " не является исполняемой командой.";
    return responseItem;
  },
};

export default layoutLib;
