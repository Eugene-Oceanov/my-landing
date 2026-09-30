const library = {
  getDate: () => {
    const date = new Date();
    return date.toLocaleString("ru-RU");
  },

  cursorToTheEnd: () => {
    const input = document.querySelector(".input_field");
    const range = document.createRange();
    range.selectNodeContents(input);
    range.collapse(false);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  },
};

export default library;
