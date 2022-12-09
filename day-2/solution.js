import { getInput } from '../util/file-reader.js';

const input = await getInput('./day-2/input.txt');

const scoreMap = { 'rock': 1, 'paper': 2, 'scissors': 3 };
const outcomeScoreMap = { 'win': 6, 'draw': 3, 'lose': 0 };
const winMap = { A: 'paper', B: 'scissors', C: 'rock' };
const drawMap = { A: 'rock', B: 'paper', C: 'scissors' };
const loseMap = { A: 'scissors', B: 'rock', C: 'paper' };

const requiredOutcomeMap = { X: 'lose', Y: 'draw', Z: 'win' };

let totalScore = 0;

for (let round of input) {
  const parts = round.split(' ');
  const opponentChoice = parts[0];
  let myChoice;
  const requiredOutcome = requiredOutcomeMap[parts[1]];

  let roundScore = 0;

  if (requiredOutcome === 'win') {
    myChoice = winMap[opponentChoice];
  } else if (requiredOutcome === 'lose') {
    myChoice = loseMap[opponentChoice];
  } else {
    myChoice = drawMap[opponentChoice];
  }
  

  roundScore += outcomeScoreMap[requiredOutcome];
  roundScore += scoreMap[myChoice];

  totalScore += roundScore;
}

console.log(totalScore);