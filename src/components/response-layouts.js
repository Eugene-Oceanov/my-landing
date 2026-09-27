const pathString = "my-site.com/guest-user >";

function getResponseItem(command) {
  const responseItem = document.createElement("DIV");
  responseItem.classList.add("response-item");
  responseItem.innerHTML = `<p class="response-head">${getDate()} ${pathString} <span class="yellow-text">${command}</span></p>
                              <div class="response-body"></div>`;
  return responseItem;
}

function getDate() {
  const date = new Date();
  return date.toLocaleString("ru-RU");
}

export function getBannerResponse() {
  const responseItem = getResponseItem("banner");
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
    <p>Введите "help" что бы увидеть доступные команды.</p>
  `;
  return responseItem;
}

export function getHelpResponse() {
  const responseItem = getResponseItem("help");
  responseItem.querySelector(".response-body").innerHTML = `
        <table class="help-table">
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
                <td class="yellow-text">banner</td>
                <td>Введите "banner" что бы увидеть старторвое сообщение.</td>
            </tr>
        </table>`;
  return responseItem;
}
