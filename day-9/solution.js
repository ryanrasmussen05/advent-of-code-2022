import { getInput } from '../util/file-reader.js';

const input = await getInput('./day-9/input.txt');
let visitedCoords = { '0': [0] };

const headKnotPartOne = {
  x: 0, y: 0, childKnot: {
    x: 0, y: 0
  }
}

const headKnotPartTwo = {
  x: 0, y: 0, childKnot: {
    x: 0, y: 0, childKnot: {
      x: 0, y: 0, childKnot: {
        x: 0, y: 0, childKnot: {
          x: 0, y: 0, childKnot: {
            x: 0, y: 0, childKnot: {
              x: 0, y: 0, childKnot: {
                x: 0, y: 0, childKnot: {
                  x: 0, y: 0, childKnot: {
                    x: 0, y: 0
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

simulateMotions(headKnotPartOne);
console.log(countTotalVisitedCoords());

visitedCoords = { '0': [0] };
simulateMotions(headKnotPartTwo);
console.log(countTotalVisitedCoords())

function simulateMotions(headKnot) {
  for (let motion of input) {
    const motionParts = motion.split(' ');
    const direction = motionParts[0];
    const times = Number(motionParts[1]);

    for (let i = 0; i < times; i++) {
      switch (direction) {
        case 'U': moveUp(headKnot); break;
        case 'D': moveDown(headKnot); break;
        case 'L': moveLeft(headKnot); break;
        case 'R': moveRight(headKnot);
      }
    }
  }
}

function moveUp(knot) {
  knot.y += 1;
  if (!areKnotsTouching(knot, knot.childKnot)) moveChild(knot, knot.childKnot);
}

function moveDown(knot) {
  knot.y -= 1;
  if (!areKnotsTouching(knot, knot.childKnot)) moveChild(knot, knot.childKnot);
}

function moveLeft(knot) {
  knot.x -= 1;
  if (!areKnotsTouching(knot, knot.childKnot)) moveChild(knot, knot.childKnot);
}

function moveRight(knot) {
  knot.x += 1;
  if (!areKnotsTouching(knot, knot.childKnot)) moveChild(knot, knot.childKnot);
}

function areKnotsTouching(knot1, knot2) {
  const xDiff = Math.abs(knot1.x - knot2.x);
  const yDiff = Math.abs(knot1.y - knot2.y);
  return xDiff <= 1 && yDiff <= 1;
}

function moveChild(parentKnot, childKnot) {
  if (parentKnot.x - childKnot.x == 2 && parentKnot.y - childKnot.y == 2) {
    childKnot.x = parentKnot.x - 1; childKnot.y = parentKnot.y - 1;
  } else if (parentKnot.x - childKnot.x == 2 && parentKnot.y - childKnot.y == -2) {
    childKnot.x = parentKnot.x - 1; childKnot.y = parentKnot.y + 1;
  } else if (parentKnot.x - childKnot.x == -2 && parentKnot.y - childKnot.y == -2) {
    childKnot.x = parentKnot.x + 1; childKnot.y = parentKnot.y + 1;
  } else if (parentKnot.x - childKnot.x == -2 && parentKnot.y - childKnot.y == 2) {
    childKnot.x = parentKnot.x + 1; childKnot.y = parentKnot.y - 1;
  } else if (parentKnot.x - childKnot.x == 2) {
    childKnot.y = parentKnot.y; childKnot.x = parentKnot.x - 1;
  } else if (parentKnot.x - childKnot.x == -2) {
    childKnot.y = parentKnot.y; childKnot.x = parentKnot.x + 1;
  } else if (parentKnot.y - childKnot.y == 2) {
    childKnot.y = parentKnot.y - 1; childKnot.x = parentKnot.x;
  } else if (parentKnot.y - childKnot.y == -2) {
    childKnot.y = parentKnot.y + 1; childKnot.x = parentKnot.x;
  }

  if (childKnot.childKnot) {
    if (!areKnotsTouching(childKnot, childKnot.childKnot)) moveChild(childKnot, childKnot.childKnot);
  } else {
    const xKey = childKnot.x.toString();
    const yValue = childKnot.y;
    if (!visitedCoords[xKey]) visitedCoords[xKey] = [];
    if (!visitedCoords[xKey].includes(yValue)) visitedCoords[xKey].push(yValue);
  }
}

function countTotalVisitedCoords() {
  let total = 0;
  Object.values(visitedCoords).forEach(coordSet => total += coordSet.length);
  return total;
}
