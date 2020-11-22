const fontColors = [
  '#351f39', // dark purple
  '#726a95', // light purple
  '#709fb0', // teal
  '#a0c1b8', // light teal
  '#f4e8c1', // peach
  '#bbbbbb', // gray
  '#aaaaaa', // dark gray
  '#f7dad9', // pink
  '#968c83', // brown
  '#cbaf87', // dark brown
  '#abc2e8', // blue
];

// https://timonweb.com/javascript/how-to-get-a-random-value-from-a-javascript-array/
function getRandomItemFromArray(arr) {
   return arr[Math.floor(Math.random() * arr.length)];
}

export function randomColor() {
  return getRandomItemFromArray(fontColors);
}
