import "./style.scss";
import { getHelpResponse } from "./components/response-layouts.js";
import { getBannerResponse } from "./components/response-layouts.js";

const output = document.querySelector("#output");
const input = document.querySelector(".input_field");
const commands = {
  help: getHelpResponse,
  banner: getBannerResponse,
};

input.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  e.preventDefault();
  const response = commands[input.textContent]();
  output.append(response);
  input.textContent = "";
});

window.addEventListener("load", () => {
  input.focus();
  const range = document.createRange();
  range.selectNodeContents(input);
  range.collapse(false);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  const banner = commands.banner();
  output.append(banner);
});

// output.innerHTML = `<h1>
// #     ______
// #    / ____/_  ______ ____  ____  ___
// #   / __/ / / / / __ '/ _ \\/ __ \\/ _ \\
// #  / /___/ /_/ / /_/ /  __/ / / /  __/
// # /_____/\\__,_/\\__, /\\___/_/ /_/\\___/
// #   / __ \\____/____/____ _____  ____ _   __
// #  / / / / ___/ _ \\/ __ '/ __ \\/ __ \\ | / /
// # / /_/ / /__/  __/ /_/ / / / / /_/ / |/ /
// # \\____/\\___/\\___/\\__,_/_/ /_/\\____/|___/
// </h1>
// <p># Frontend Developer</p>`;
