const library = {
  getDate: function () {
    const date = new Date();
    return date.toLocaleString("ru-RU");
  },

  cursorToTheEnd: function () {
    const input = document.querySelector(".input_field");
    const range = document.createRange();
    range.selectNodeContents(input);
    range.collapse(false);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  },

  getRandomInt: function (min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  },
};

export default library;
