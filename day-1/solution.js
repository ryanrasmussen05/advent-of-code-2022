import { getInput } from '../util/file-reader.js';

const input = await getInput('./day-1/input.txt');

const calorieCounts = [];
let currentCount = 0;
let elfIndex = 0;

for (let i = 0; i < input.length; i++) {
  if (!!input[i]) {
    const calorieValue = Number(input[i]);
    currentCount += calorieValue;
  } else {
    calorieCounts.push(currentCount);
    currentCount = 0;
    elfIndex++;
  }
}
calorieCounts.sort((a, b) => b - a);

// part 1
console.log(calorieCounts[0]);

// part 2
console.log(calorieCounts[0] + calorieCounts[1] + calorieCounts[2]);
