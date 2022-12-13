import { getInput } from '../util/file-reader.js';

const input = await getInput('./day-13/input.txt');
const packets = [];

getPackets();
const dividerPacketA = [[2]];
const dividerPacketB = [[6]];
packets.push(dividerPacketA, dividerPacketB);

// part 2
packets.sort((a,b) => {
  const compareResult = compare(a, b);
  if (compareResult === 'true') return -1;
  if (compareResult === 'false') return 1;
  return 0;
});
const decoderKey = (packets.indexOf(dividerPacketA) + 1) * (packets.indexOf(dividerPacketB) + 1);
console.log(decoderKey);


function getPackets() {
  while (input[0]) {
    const firstPart = JSON.parse(input.shift());
    const secondPart = JSON.parse(input.shift());
    input.shift();
    packets.push(firstPart, secondPart);
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