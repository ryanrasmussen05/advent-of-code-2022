import { getInput } from '../util/file-reader.js';

const input = await getInput('./day-14/input.txt');
let dimensions;
const grid = [];

buildGrid();

let sandCount = 0;
while (true) {
  const result = addSand();
  sandCount++;
  if (result === 'complete') break;
}
console.log(sandCount);

function getGridDimensions() {
  let minX = Number.MAX_SAFE_INTEGER;
  let minY = 0;
  let maxX = 0;
  let maxY = 0;
  input.forEach(line => {
    line.split('->').forEach(coordinates => {
      const x = parseInt(coordinates.split(',')[0].trim());
      const y = parseInt(coordinates.split(',')[1].trim());
      if ( x < minX ) minX = x;
      if ( x > maxX ) maxX = x;
      if ( y > maxY ) maxY = y;
    });
  });
  return { minX: minX - maxY, minY, maxX: maxX + maxY, maxY: maxY + 2 };
}

function buildGrid() {
  dimensions = getGridDimensions();
  const totalRows = dimensions.maxY;
  const totalColumns = dimensions.maxX - dimensions.minX + 1;
  
  for (let i = 0; i < totalRows; i++) {
    grid.push(Array(totalColumns).fill('.'));
  }
  grid.push(Array(totalColumns).fill('#'));

  input.forEach(line => {
    const coordsStrings = line.split('->').map(coordString => coordString.split(','));
    const coords = coordsStrings.map(coordString => [parseInt(coordString[0]), parseInt(coordString[1])]);
    
    for (let i = 1; i < coords.length; i++) {
      const firstCoord = coords[i - 1];
      const secondCoord = coords[i];

      if (firstCoord[0] === secondCoord[0]) {
        const startIndex = firstCoord[1] < secondCoord[1] ? firstCoord[1] : secondCoord[1];
        const endIndex = firstCoord[1] < secondCoord[1] ? secondCoord[1] : firstCoord[1];

        for (let j = startIndex; j <= endIndex; j++) {
          addToGrid(firstCoord[0], j, '#');
        }
      } else if (firstCoord[1] === secondCoord[1]) {
        const startIndex = firstCoord[0] < secondCoord[0] ? firstCoord[0] : secondCoord[0];
        const endIndex = firstCoord[0] < secondCoord[0] ? secondCoord[0] : firstCoord[0];

        for (let j = startIndex; j <= endIndex; j++) {
          addToGrid(j, firstCoord[1], '#');
        }
      }
    }
  });
}

function addToGrid(x, y, value) {
  const modifiedX = x - dimensions.minX;
  grid[y][modifiedX] = value;
}

function getGridItem(x, y) {
  const modifiedX = x - dimensions.minX;
  return grid[y][modifiedX];
}

function addSand() {
  let isSettled = false;
  let sandLocation = [500, 0];

  while (!isSettled) {
    // move down
    if (getGridItem(sandLocation[0], sandLocation[1] + 1) === '.') {
      sandLocation[1] += 1;
    }
    // move left
    else if (getGridItem(sandLocation[0] - 1, sandLocation[1] + 1) === '.') {
      sandLocation[0] -= 1;
      sandLocation[1] += 1;
    }
    // move right
    else if (getGridItem(sandLocation[0] + 1, sandLocation[1] + 1) === '.') {
      sandLocation[0] += 1;
      sandLocation[1] += 1;
    }
    // blocked
    else {
      addToGrid(sandLocation[0], sandLocation[1], 'O');
      isSettled = true;
    }
  }

  return (sandLocation[0] === 500 && sandLocation[1] === 0) ? 'complete' : 'settled';
}

// const input = await getInput('./day-14/input.txt');
// let dimensions;
// const grid = [];

// buildGrid();

// let sandCount = 0;
// while (true) {
//   const result = addSand();
//   if (result === 'settled') sandCount++;
//   else break;
// }
// console.log(sandCount);

// function getGridDimensions() {
//   let minX = Number.MAX_SAFE_INTEGER;
//   let minY = 0;
//   let maxX = 0;
//   let maxY = 0;
//   input.forEach(line => {
//     line.split('->').forEach(coordinates => {
//       const x = parseInt(coordinates.split(',')[0].trim());
//       const y = parseInt(coordinates.split(',')[1].trim());
//       if ( x < minX ) minX = x;
//       if ( x > maxX ) maxX = x;
//       if ( y > maxY ) maxY = y;
//     });
//   });
//   return { minX, minY, maxX, maxY };
// }

// function buildGrid() {
//   dimensions = getGridDimensions();
//   const totalRows = dimensions.maxY;
//   const totalColumns = dimensions.maxX - dimensions.minX + 1;
  
//   for (let i = 0; i <= totalRows; i++) {
//     grid.push(Array(totalColumns).fill('.'));
//   }

//   input.forEach(line => {
//     const coordsStrings = line.split('->').map(coordString => coordString.split(','));
//     const coords = coordsStrings.map(coordString => [parseInt(coordString[0]), parseInt(coordString[1])]);
    
//     for (let i = 1; i < coords.length; i++) {
//       const firstCoord = coords[i - 1];
//       const secondCoord = coords[i];

//       if (firstCoord[0] === secondCoord[0]) {
//         const startIndex = firstCoord[1] < secondCoord[1] ? firstCoord[1] : secondCoord[1];
//         const endIndex = firstCoord[1] < secondCoord[1] ? secondCoord[1] : firstCoord[1];

//         for (let j = startIndex; j <= endIndex; j++) {
//           addToGrid(firstCoord[0], j, '#');
//         }
//       } else if (firstCoord[1] === secondCoord[1]) {
//         const startIndex = firstCoord[0] < secondCoord[0] ? firstCoord[0] : secondCoord[0];
//         const endIndex = firstCoord[0] < secondCoord[0] ? secondCoord[0] : firstCoord[0];

//         for (let j = startIndex; j <= endIndex; j++) {
//           addToGrid(j, firstCoord[1], '#');
//         }
//       }
//     }
//   });
// }

// function addToGrid(x, y, value) {
//   const modifiedX = x - dimensions.minX;
//   grid[y][modifiedX] = value;
// }

// function getGridItem(x, y) {
//   const modifiedX = x - dimensions.minX;
//   return grid[y][modifiedX];
// }

// function addSand() {
//   let isSettled = false;
//   let isInAbyss = false;
//   let sandLocation = [500, 0];

//   while (!isSettled && !isInAbyss) {
//     // check if down is in abyss
//     if (sandLocation[1] + 1 > dimensions.maxY) {
//       isInAbyss = true;
//     }
//     // move down
//     else if (getGridItem(sandLocation[0], sandLocation[1] + 1) === '.') {
//       sandLocation[1] += 1;
//     }
//     // check if left diagonal is in abyss
//     else if ((sandLocation[0] - 1 - dimensions.minX < 0) || (sandLocation[1] + 1 > dimensions.maxY)) {
//       isInAbyss = true;
//     }
//     // move left
//     else if (getGridItem(sandLocation[0] - 1, sandLocation[1] + 1) === '.') {
//       sandLocation[0] -= 1;
//       sandLocation[1] += 1;
//     }
//     // check if right is in abyss
//     else if ((sandLocation[0] + 1 > dimensions.maxX) || (sandLocation[1] + 1 > dimensions.maxY)) {
//       isInAbyss = true;
//     }
//     // move right
//     else if (getGridItem(sandLocation[0] + 1, sandLocation[1] + 1) === '.') {
//       sandLocation[0] += 1;
//       sandLocation[1] += 1;
//     }
//     // blocked
//     else {
//       addToGrid(sandLocation[0], sandLocation[1], 'O');
//       isSettled = true;
//     }
//   }

//   return isSettled ? 'settled' : 'abyss';
// }