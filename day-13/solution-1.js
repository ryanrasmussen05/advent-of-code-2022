import { getInput } from '../util/file-reader.js';

const input = await getInput('./day-13/input.txt');
const pairs = [];

getPairs();

// part 1
let sum = 0;
for (let i = 0; i < pairs.length; i ++) {
  if (compare(pairs[i][0], pairs[i][1]) === 'true') sum += (i + 1);
}
console.log(sum);


function getPairs() {
  while (input[0]) {
    const firstPart = JSON.parse(input.shift());
    const secondPart = JSON.parse(input.shift());
    input.shift();
    pairs.push([firstPart, secondPart]);
  }
}

function compare(left, right) {
  if (Array.isArray(left) && !Array.isArray(right)) right = [right];
  if (!Array.isArray(left) && Array.isArray(right)) left = [left];

  if (Number.isInteger(left) && Number.isInteger(right)) {
    if (left === right) return 'continue';
    if (left < right) return 'true';
    return 'false';
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    let currentIndex = 0;
    while(true) {
      if (left[currentIndex] === undefined && right[currentIndex] !== undefined) return 'true';
      if (left[currentIndex] !== undefined && right[currentIndex] === undefined) return 'false';
      if (left[currentIndex] === undefined && right[currentIndex] === undefined) return 'continue';
      const compareResult = compare(left[currentIndex], right[currentIndex]);
      if (compareResult === 'continue') {
        currentIndex++;
      } else {
        return compareResult;
      }
    }
  }
}