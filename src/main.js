import "./style.scss";
import layoutLib from "./components/response-layouts.js";
import logicLib from "./components/library.js";

const output = document.querySelector("#output");
const input = document.querySelector(".input_field");
const storage = new Array();
const commands = {
  help: layoutLib.getHelpResponse,
  banner: layoutLib.getBannerResponse,
  clear: layoutLib.getClearResponse,
  date: layoutLib.getDateResponse,
};
let commandCounter = null;

input.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
    const validCommand = input.textContent.toLowerCase();
    const date = logicLib.getDate();
    if (validCommand === "clear") {
      commands.clear(output, storage);
      input.textContent = "";
      return;
    }
    let responseItem;
    if (!commands[validCommand]) {
      responseItem = layoutLib.getInvalidResponse(validCommand, date);
      output.append(responseItem);
    } else {
      responseItem = commands[validCommand](date);
      output.append(responseItem);
    }
    responseItem.scrollIntoView({ behavior: "auto", block: "end" });
    const storageItem = {
      command: validCommand,
      response: responseItem.innerHTML,
      date: date,
    };
    storage.push(storageItem);
    localStorage.setItem("commandsHistory", JSON.stringify(storage));
    commandCounter = storage.length;
    input.textContent = "";
  }
  if (e.key === "ArrowUp") {
    e.preventDefault();
    if (commandCounter === 0) return;
    commandCounter--;
    input.textContent = storage[commandCounter].command;
    logicLib.cursorToTheEnd();
  }
  if (e.key === "ArrowDown") {
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
  if (localStorage.getItem("commandsHistory")) {
    const LS = JSON.parse(localStorage.getItem("commandsHistory"));
    LS.forEach((item) => {
      let responseItem;
      if (!commands[item.command]) {
        responseItem = layoutLib.getInvalidResponse(item.command, item.date);
        output.append(responseItem);
      } else {
        responseItem = commands[item.command](item.date);
        output.append(responseItem);
      }
      responseItem.scrollIntoView({ behavior: "auto", block: "end" });
      storage.push(item);
    });
    commandCounter = storage.length - 1;
    input.textContent = storage[commandCounter].command;
  }
  logicLib.cursorToTheEnd();
});
