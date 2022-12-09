import { getInput } from '../util/file-reader.js';

const input = await getInput('./day-8/input.txt');
const grid = []; // grid[row][column]

buildGrid();
console.log(findVisibleTrees());
console.log(findHighestScenicScore());

function buildGrid() {
  input.forEach(row => {
    grid.push(row.split('').map(tree => Number(tree)));
  })
}

function findVisibleTrees() {
  let visibleTreeCount = 0;
  grid.forEach((row, i) => {
    row.forEach((tree, j) => {
      if (isVisibleFromLeft(tree, i, j)) visibleTreeCount++;
      else if (isVisibleFromRight(tree, i, j)) visibleTreeCount++;
      else if (isVisibleFromTop(tree, i, j)) visibleTreeCount++;
      else if (isVisibleFromBottom(tree, i, j)) visibleTreeCount++;
    });
  })
  return visibleTreeCount;
}

function findHighestScenicScore() {
  let currentHigh = 0;

  grid.forEach((row, i) => {
    row.forEach((tree, j) => {
      const left = getLeftVisibleTrees(tree, i, j);
      const right = getRightVisibleTrees(tree, i, j);
      const top = getTopVisibleTrees(tree, i, j);
      const bottom = getBottomVisibleTrees(tree, i, j);
      const score = left * right * top * bottom;
      if (score > currentHigh) currentHigh = score;
    });
  })

  return currentHigh;
}

function isVisibleFromLeft(height, row, col) {
  for (let colIndex = col - 1; colIndex >= 0; colIndex--) {
    const compareHeight = grid[row][colIndex];
    if (compareHeight >= height) return false;
  }
  return true;
}

function isVisibleFromRight(height, row, col) {
  for (let colIndex = col + 1; colIndex < grid.length; colIndex++) {
    const compareHeight = grid[row][colIndex];
    if (compareHeight >= height) return false;
  }
  return true;
}

function isVisibleFromTop(height, row, col) {
  for (let rowIndex = row - 1; rowIndex >= 0; rowIndex--) {
    const compareHeight = grid[rowIndex][col];
    if (compareHeight >= height) return false;
  }
  return true;
}

function isVisibleFromBottom(height, row, col) {
  for (let rowIndex = row + 1; rowIndex < grid.length; rowIndex++) {
    const compareHeight = grid[rowIndex][col];
    if (compareHeight >= height) return false;
  }
  return true;
}

function getLeftVisibleTrees(height, row, col) {
  let visibleTreeCount = 0;
  for (let colIndex = col - 1; colIndex >= 0; colIndex--) {
    const compareHeight = grid[row][colIndex];
    visibleTreeCount++;
    if (compareHeight >= height) break;
  }
  return visibleTreeCount;
}

function getRightVisibleTrees(height, row, col) {
  let visibleTreeCount = 0;
  for (let colIndex = col + 1; colIndex < grid.length; colIndex++) {
    const compareHeight = grid[row][colIndex];
    visibleTreeCount++;
    if (compareHeight >= height) break;
  }
  return visibleTreeCount;
}

function getTopVisibleTrees(height, row, col) {
  let visibleTreeCount = 0;
  for (let rowIndex = row - 1; rowIndex >= 0; rowIndex--) {
    const compareHeight = grid[rowIndex][col];
    visibleTreeCount++;
    if (compareHeight >= height) break;
  }
  return visibleTreeCount;
}

function getBottomVisibleTrees(height, row, col) {
  let visibleTreeCount = 0;
  for (let rowIndex = row + 1; rowIndex < grid.length; rowIndex++) {
    const compareHeight = grid[rowIndex][col];
    visibleTreeCount++;
    if (compareHeight >= height) break;
  }
  return visibleTreeCount;
}
