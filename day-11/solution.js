import { getInput } from '../util/file-reader.js';

class Monkey {
  constructor(num) {
    this.number = num;
  }
  items = [];
  operation;
  test;
  trueTarget;
  falseTarget;
  inspectionCount = 0;
}

class Item {
  mods = [2,3,5,7,11,13,17,19,23];
  modValues = [];
  constructor(itemValue) {
    this.mods.forEach(mod => {
      this.modValues[mod] = itemValue % mod;
    });
  }
}

const input = await getInput('./day-11/input.txt');
const monkeys = [];
createMonkeys();

for (let i = 0; i < 10000; i++) runRound();
console.log(monkeys);

function createMonkeys() {
  while(typeof(input[0]) === 'string') {
    createNextMonkey();
  }
}

function createNextMonkey() {
  while (typeof(input[0]) === 'string' && !input[0].includes('Monkey')) {
    input.shift();
  }

  if (typeof(input[0]) !== 'string') return;

  const monkeyLine = input.shift();
  const monkeyNumber = parseInt(monkeyLine.split(' ')[1]);
  const startingItemsString = input.shift().split('Starting items:')[1];
  const startingItems = startingItemsString.split(',').map(item => new Item(parseInt(item)));
  const operationString = input.shift().split('Operation: new = ')[1];
  const testString = input.shift().split('Test: divisible by ')[1];
  const test = parseInt(testString);
  const trueString = input.shift().split('If true: throw to monkey ')[1];
  const trueTarget = parseInt(trueString);
  const falseString = input.shift().split('If false: throw to monkey ')[1];
  const falseTarget = parseInt(falseString);

  const monkey = new Monkey(monkeyNumber);
  monkey.items = startingItems;
  monkey.operation = operationString;
  monkey.test = test;
  monkey.trueTarget = trueTarget;
  monkey.falseTarget = falseTarget;

  monkeys.push(monkey);
  return monkey;
}

function runRound() {
  for(const monkey of monkeys) {
    const numberOfItems = monkey.items.length;
    for(let i = 0; i < numberOfItems; i++) {
      let itemBeingInspected = monkey.items.shift();
      runOperation(monkey.operation, itemBeingInspected);
      const testResult = runTest(monkey.test, itemBeingInspected);
      if (testResult) monkeys[monkey.trueTarget].items.push(itemBeingInspected);
      else monkeys[monkey.falseTarget].items.push(itemBeingInspected);
      monkey.inspectionCount++;
    }
  }
}

function runOperation(operationString, item) {
  const operationParts = operationString.split(' ');
  const firstPart = operationParts[0];
  const lastPart = operationParts[2];
  const operand = operationParts[1];

  item.mods.forEach(mod => {
    const firstNum = firstPart === 'old' ? item.modValues[mod] : parseInt(firstPart);
    const lastNum = lastPart === 'old' ? item.modValues[mod] : parseInt(lastPart);

    if (operand === '+') {
      item.modValues[mod] = (firstNum + lastNum) % mod;
    } else if (operand === '*') {
      item.modValues[mod] = (firstNum * lastNum) % mod;
    }
  });
}

function runTest(testValue, item) {
  return item.modValues[testValue] === 0;
}

