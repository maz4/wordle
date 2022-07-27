export const WORDLE_LENGTH = 5;
export const KEYBOARD_LAYOUT = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
];
export const allowedKeys = KEYBOARD_LAYOUT.reduce((acc, next) => {
  return acc.concat(next);
}, []);
