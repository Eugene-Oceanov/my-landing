const pathString = "guest-user@my-site.com:~$";
import { gameInit } from "./snake.js";

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
                <td>Введите "sudo rm -rf /" для ██████ ███ ██████.</td>
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
#   / __/ / / / / __ '/ _ \\/ __ \\/ _ \\      #
#  / /___/ /_/ / /_/ /  __/ / / /  __/      #
# /_____/\\__,_/\\__, /\\___/_/ /_/\\___/       #
#   / __ \\____/____/____ _____  ____ _   __ #
#  / / / / ___/ _ \\/ __ '/ __ \\/ __ \\ | / / #
# / /_/ / /__/  __/ /_/ / / / / /_/ / |/ /  #
# \\____/\\___/\\___/\\__,_/_/ /_/\\____/|___/   #
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
    const responseItem = getResponseItem("whoami", date);
    responseItem.querySelector(".response-body").innerHTML = `
        <p class="snake-score">Счет: 0</p>
        <canvas id="snake-canvas" width="500" height="500"></canvas>
        `;
    gameInit(responseItem);
    return responseItem;
  },

  getMusicResponse: function (date) {
    const responseItem = getResponseItem("music", date);
    responseItem.querySelector(".response-body").innerHTML = `
    <div class="player">
      <img class="play" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAVklEQVR4nO3WQQoAIAgAQf//6e0edCtXyQXvA5EVMU3F4zD/AfbSMFQFpGHoAHiKoRvgOobOgCsYOgOwjwADgH0NMQDYqxgDgP0ckw3A/pJhAaYpXrcApPFxj702i18AAAAASUVORK5CYII=" alt="play">
    </div>
    `;
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
