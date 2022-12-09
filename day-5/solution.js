import { getInputNoTrim } from '../util/file-reader.js';

const input = await getInputNoTrim('./day-5/input.txt');
const stacks = [[],[],[],[],[],[],[],[],[]];
const instructions = [];

createStacks();
parseInstructions();
runInstructions();
console.log(stacks);

function createStacks() {
  for (let line of input) {
    if (line.includes('[')) {
      for (let i = 0; i <= line.length; i += 4) {
        const currentCrate = line.substring(i, i + 4).trim();
        if (currentCrate) {
          const letter = currentCrate[1];
          const stackNumber = i / 4;
          stacks[stackNumber].unshift(letter);
        }
      }
    }
  }
}

function parseInstructions() {
  for (let line of input) {
    if (line.includes('move')) {
      line = line.split('from');
      const numToMove = Number(line[0].trim().replace('move ', ''));
      const targetStacks = line[1].trim().split(' to ');
      const fromStack = Number(targetStacks[0]) - 1;
      const toStack = Number(targetStacks[1]) - 1;
      instructions.push({ amount: numToMove, fromStack, toStack });
    }
  }
}

function runInstructions() {
  for (const instruction of instructions) {
    const cratesToMove = _.takeRight(stacks[instruction.fromStack], instruction.amount);
    for (let i = 0; i < instruction.amount; i++) {
      stacks[instruction.fromStack].pop();
    }
    stacks[instruction.toStack].push(...cratesToMove);
  }
}