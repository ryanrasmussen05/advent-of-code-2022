import { getInput } from '../util/file-reader.js';

const input = await getInput('./day-12/input.txt');
const elevationLevels = 'abcdefghijklmnopqrstuvwxyz';
const grid = []; // [row][column]

const visitedPoints = [];
let unvisitedPoints = [];
let endPoint;
buildGrid();

while (!visitNextPoint()){}
console.log(endPoint);

function buildGrid() {
  input.forEach((line, row) => {
    grid[row] = [];
    line.split('').forEach((character, col) => {
      const isStart = character === 'S';
      const isEnd = character === 'E';
      grid[row][col] = { row, col, elevation: getElevation(character), distance: isStart ? 0 : Number.MAX_SAFE_INTEGER, isStart, isEnd };
      unvisitedPoints.push(grid[row][col]);
      if (isEnd) endPoint = grid[row][col];
    });
  })
}

function visitNextPoint() {
  let point = findClosestUnvisitedPoint();
  markPointAsVisited(point);

  if (point.isEnd) return point;

  const topNeighbor = point.row > 0 ? grid[point.row - 1][point.col] : undefined;
  const bottomNeighbor = point.row < grid.length - 1 ? grid[point.row + 1][point.col] : undefined;
  const leftNeighbor = point.col > 0 ? grid[point.row][point.col - 1] : undefined;
  const rightNeighbor = point.col < grid[0].length - 1 ? grid[point.row][point.col + 1] : undefined;
  
  if (topNeighbor && isPointVisitable(point, topNeighbor)) topNeighbor.distance = point.distance + 1;
  if (bottomNeighbor && isPointVisitable(point, bottomNeighbor)) bottomNeighbor.distance = point.distance + 1;
  if (leftNeighbor && isPointVisitable(point, leftNeighbor)) leftNeighbor.distance = point.distance + 1;
  if (rightNeighbor && isPointVisitable(point, rightNeighbor)) rightNeighbor.distance = point.distance + 1;
}

function getElevation(character) {
  character = character === 'S' ? 'a' : character;
  character = character === 'E' ? 'z' : character;

  return elevationLevels.indexOf(character);
}

function findClosestUnvisitedPoint() {
  let currentClosest = { distance: Number.MAX_SAFE_INTEGER };

  unvisitedPoints.forEach(point => {
    if (point.distance < currentClosest.distance) currentClosest = point;
  });
  return currentClosest;
}

function markPointAsVisited(point) {
  unvisitedPoints = unvisitedPoints.filter(curPoint => curPoint !== point);
  visitedPoints.push(point);
}

function isPointVisitable(currentPoint, nextPoint) {
  const isAlreadyVisited = visitedPoints.includes(nextPoint);
  const isReachable = nextPoint.elevation <= currentPoint.elevation + 1;
  return !isAlreadyVisited && isReachable;
}