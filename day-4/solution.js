import { getInput } from '../util/file-reader.js';

const input = await getInput('./day-4/input.txt');
const parsedAssignments = [];
parseInput();

console.log(getFullOverlaps());
console.log(getAnyOverlaps());

function parseInput() {
  for (let line of input) {
    const assignments = line.split(',');
    const elf1 = assignments[0].split('-');
    const elf2 = assignments[1].split('-');
    parsedAssignments.push({
      elf1: { start: Number(elf1[0]), end: Number(elf1[1]) },
      elf2: { start: Number(elf2[0]), end: Number(elf2[1]) },
    })
  }
}

function getFullOverlaps() {
  let count = 0;

  for (let assignment of parsedAssignments) {
    if (assignment.elf1.start >= assignment.elf2.start && assignment.elf1.end <= assignment.elf2.end) count++;
    else if (assignment.elf2.start >= assignment.elf1.start && assignment.elf2.end <= assignment.elf1.end) count++
  }

  return count;
}

function getAnyOverlaps() {
  let count = 0;

  for (let assignment of parsedAssignments) {
    if (assignment.elf1.start >= assignment.elf2.start && assignment.elf1.start <= assignment.elf2.end) count++
    else if (assignment.elf1.end >= assignment.elf2.start && assignment.elf1.end <= assignment.elf2.end) count++
    else if (assignment.elf2.start >= assignment.elf1.start && assignment.elf2.start <= assignment.elf1.end) count++
    else if (assignment.elf2.end >= assignment.elf1.start && assignment.elf2.end <= assignment.elf1.end) count++
  }

  return count;
}