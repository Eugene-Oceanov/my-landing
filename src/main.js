import "./style.scss";
import layoutLib from "./components/layouts-library.js";
import logicLib from "./components/library.js";

const app = document.querySelector("#app");
const output = document.querySelector("#output");
const input = document.querySelector(".input_field");
const playBtn = document.querySelector(".play");
const storage = new Array();
const commands = {
  skills: layoutLib.getSkillsResponse,
  banner: layoutLib.getBannerResponse,
  help: layoutLib.getHelpResponse,
  date: layoutLib.getDateResponse,
  theme: layoutLib.getThemeResponse,
  sudo: layoutLib.getSudoResponse,
  whoami: layoutLib.getWhoamiResponse,
  clear: layoutLib.getClearResponse,
  snake: layoutLib.getSnakeResponse,
  music: layoutLib.getMusicResponse,
};
let commandCounter = null;
let lightThemeFlag = false;

input.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
    const validCommand = input.textContent.toLowerCase();
    const date = logicLib.getDate();
    let responseItem;
    if (validCommand === "clear") {
      commands.clear(output, storage);
      input.textContent = "";
      return;
    } else if (validCommand === "theme") {
      !lightThemeFlag
        ? app.classList.add("light")
        : app.classList.remove("light");
      responseItem = commands[validCommand](lightThemeFlag, date);
      lightThemeFlag = lightThemeFlag ? false : true;
      localStorage.setItem("lightThemeFlag", JSON.stringify(lightThemeFlag));
    } else if (!commands[validCommand]) {
      responseItem = layoutLib.getInvalidResponse(validCommand, date);
    } else {
      responseItem = commands[validCommand](date);
    }
    output.append(responseItem);
    responseItem.scrollIntoView({ behavior: "auto", block: "end" });
    input.textContent = "";
    if (validCommand === "snake") return;
    const storageItem = {
      command: validCommand,
      response: responseItem.innerHTML,
      date: date,
    };
    storage.push(storageItem);
    commandCounter = storage.length;
    localStorage.setItem("commandsHistory", JSON.stringify(storage));
  }
  if (e.key === "ArrowUp") {
    e.preventDefault();
    if (commandCounter === 0) return;
    commandCounter--;
    input.textContent = storage[commandCounter].command;
    logicLib.cursorToTheEnd();
  }
  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (commandCounter >= storage.length - 1) return;
    commandCounter++;
    input.textContent = storage[commandCounter].command;
    logicLib.cursorToTheEnd();
  }
});

window.addEventListener("load", () => {
  input.focus();
  const banner = commands.banner(logicLib.getDate());
  output.append(banner);
  if (JSON.parse(localStorage.getItem("lightThemeFlag"))) {
    app.classList.add("light");
    lightThemeFlag = true;
  }
  if (localStorage.getItem("commandsHistory")) {
    const LS = JSON.parse(localStorage.getItem("commandsHistory"));
    LS.forEach((item) => {
      let responseItem;
      if (!commands[item.command]) {
        responseItem = layoutLib.getInvalidResponse(item.command, item.date);
      } else if (commands[item.command] === "theme") {
        responseItem = commands[item.command](lightThemeFlag, item.date);
      } else {
        responseItem = commands[item.command](item.date);
      }
      output.append(responseItem);
      responseItem.scrollIntoView({ behavior: "auto", block: "end" });
      storage.push(item);
    });
    commandCounter = storage.length - 1;
    input.textContent = "";
  }
  logicLib.cursorToTheEnd();
});
