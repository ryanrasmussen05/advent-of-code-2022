import { getInput } from '../util/file-reader.js';

const input = await getInput('./day-3/input.txt');

const scoreMap = '-abcdefghijklmnopqrstuvwqyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

let total = 0;
for (let rucksack of input) {
  const compartments = getRucksackCompartments(rucksack);
  const duplicateItem = getDuplicateItem(compartments[0], compartments[1]);
  total += scoreMap.indexOf(duplicateItem);
}
console.log(total);

function getRucksackCompartments(rucksack) {
  const size = rucksack.length;
  return [rucksack.substring(0, size / 2), rucksack.substring(size / 2, size)];
}

function getDuplicateItem(rucksackA, rucksackB) {
  for (let i = 0; i < rucksackA.length; i++) {
    const currentChar = rucksackA[i];
    if (rucksackB.includes(currentChar)) {
      return currentChar;
    }
  }
}

total = 0;
for (let i = 0; i < input.length; i += 3) {
  const rucksackA = input[i];
  const rucksackB = input[i + 1];
  const rucksackC = input[i + 2];

  let commonItem;
  for (let j = 0; j < rucksackA.length; j++) {
    const currentChar = rucksackA[j];
    if (rucksackB.includes(currentChar) && rucksackC.includes(currentChar)) {
      commonItem = currentChar;
      break;
    }
  }
  total += scoreMap.indexOf(commonItem);
}
console.log(total);