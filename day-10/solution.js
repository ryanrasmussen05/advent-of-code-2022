import { getInput } from '../util/file-reader.js';
const input = await getInput('./day-10/input.txt');

let x = 1;
let cycle = 0;
const display = [[],[],[],[],[],[]];
execute();
console.log(display);

function execute() {
  input.forEach(line => {
    const instructionParts = line.split(' ');
    const operation = instructionParts[0];
    const value = Number(instructionParts[1]);

    if (operation === 'noop') executeNoop();
    else if (operation === 'addx') executeAddX(value);
  });
}

function executeNoop() {
  cycle++;
  drawPixel();
}

function executeAddX(amount) {
  cycle++;
  drawPixel();
  cycle++;
  drawPixel();
  x += amount;
}

function drawPixel() {
  const row = Math.floor((cycle - 1) / 40.0);
  const column = ((cycle - 1) % 40);

  let character = '.';
  if (x - 1 <= column && column <= x + 1) character = '#';

  display[row][column] = character;
}