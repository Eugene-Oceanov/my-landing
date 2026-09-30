import lib from "./library.js";

const pathString = "guest-user@my-site.com:~$";

function getResponseItem(command, date) {
  const responseItem = document.createElement("DIV");
  responseItem.classList.add("response-item");
  responseItem.innerHTML = `<p class="response-head">${date} ${pathString} <span class="yellow-text">${command}</span></p>
                              <div class="response-body"></div>`;
  return responseItem;
}

const layoutLib = {
  getHelpResponse: (date) => {
    const responseItem = getResponseItem("help", date);
    responseItem.querySelector(".response-body").innerHTML = `
        <table class="help-table">
            <tr><td>Информационные команды</td></tr>
            <tr>
                <td class="yellow-text">help</td>
                <td>Введите "help" что бы увидеть доступные команды.</td>
            </tr>
            <tr>
                <td class="yellow-text">about me</td>
                <td>Введите "about me" что бы получить информацию обо мне.</td>
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
            <tr><td>Системные команды</td></tr>
            <tr>
                <td class="yellow-text">clear</td>
                <td>Введите "clear" для очистки экрана</td>
            </tr>
            <tr>
                <td class="yellow-text">date</td>
                <td>Введите "date" для получения текущих даты и времени</td>
            </tr>
        </table>`;
    return responseItem;
  },

  getBannerResponse: (date) => {
    const responseItem = getResponseItem("banner", date);
    responseItem.querySelector(".response-body").innerHTML = `
    <p>#     ______                               
#    / ____/_  ______ ____  ____  ___      
#   / __/ / / / / __ '/ _ \\/ __ \\/ _ \\     
#  / /___/ /_/ / /_/ /  __/ / / /  __/     
# /_____/\\__,_/\\__, /\\___/_/ /_/\\___/      
#   / __ \\____/____/____ _____  ____ _   __
#  / / / / ___/ _ \\/ __ '/ __ \\/ __ \\ | / /
# / /_/ / /__/  __/ /_/ / / / / /_/ / |/ / 
# \\____/\\___/\\___/\\__,_/_/ /_/\\____/|___/</p>
    <p># Фронтенд разработчик</p>
    <p>my-site.com Все права защищены (c)</p>
    <p>Введите "<span class="yellow-text">help</span>" что бы увидеть доступные команды.</p>
  `;
    return responseItem;
  },

  getDateResponse: (date) => {
    const responseItem = getResponseItem("date", date);
    responseItem.querySelector(".response-body").innerHTML = `<p>${date}</p>`;
    return responseItem;
  },

  getClearResponse: (output, storage) => {
    output.innerHTML = "";
    storage.length = 0;
    localStorage.removeItem("commandsHistory");
  },

  getInvalidResponse: (command, date) => {
    const responseItem = getResponseItem(command, date);
    responseItem.querySelector("span").textContent +=
      " не является исполняемой командой.";
    return responseItem;
  },
};

export default layoutLib;
