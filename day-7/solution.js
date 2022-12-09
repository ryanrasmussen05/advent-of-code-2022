import { getInput } from '../util/file-reader.js';

let input = await getInput('./day-7/input.txt');
const tree = { dirs: {}, files: [], size: 0 };
let currentPath = [];

buildTree();
console.log(tree);

// part 1
let directoryList = [];
let solution = 0;
listAllDirectories(tree, directoryList);
directoryList.forEach(directory => {
  if (directory.size <= 100000) solution += directory.size;
});
console.log(solution);

// part 2
directoryList = [];
listAllDirectories(tree, directoryList);
directoryList.sort((a,b) => a.size - b.size);
const dirToDelete = directoryList.find(directory => {
  return 70000000 - tree.size + directory.size >= 30000000;
});
console.log(dirToDelete);


function buildTree() {
  while(input.length > 0) {
    const line = input.shift();
    if (line[0] === '$') processCommand(line);
  }
}

function processCommand(line) {
  const commandParts = line.split(' ');
  const commandName = commandParts[1];
  if (commandName === 'cd') processChangeDirectoryCommand(commandParts[2]);
  if (commandName === 'ls') processListCommand();
}

function processChangeDirectoryCommand(directory) {
  if (directory === '/') {
    currentPath = [];
    return;
  }

  if (directory === '..') {
    currentPath.pop();
    return;
  }

  // find object representing the current directory being viewed
  let currentContext = tree;
  for (let dir of currentPath) {
    currentContext = currentContext.dirs[dir];
  }

  // if directory is not already defined, create empty one in tree
  if (!currentContext.dirs[directory]) {
    currentContext.dirs[directory] = { dirs: {}, files: [], size: 0 }; 
  }

  currentPath.push(directory);
}

function processListCommand() {
  // find object representing the current directory being viewed
  let currentContext = tree;
  for (let dir of currentPath) {
    currentContext = currentContext.dirs[dir];
  }

  while(true) {
    if (input[0] && input[0][0] !== '$') {
      const line = input.shift();
      const listParts = line.split(' ');

      if (listParts[0] === 'dir') {
        // create dir if doesn't exist yet
        const dirName = listParts[1];
        if (!currentContext.dirs[dirName]) {
          currentContext.dirs[dirName] = { dirs: {}, files: [], size: 0 }; 
        }
      } else {
        addFileToDir(listParts[1], Number(listParts[0]));
      }
    } else {
      return;
    }
  }
}

function addFileToDir(name, size) {
  let currentContext = tree;
  currentContext.size += size;

  for (let dir of currentPath) {
    currentContext = currentContext.dirs[dir];
    currentContext.size += size;
  }

  const existingFile = currentContext.files.find(file => file.name === name);
  if (!existingFile) {
    currentContext.files.push({ name, size });
  }
}

function listAllDirectories(tree, directoryList) {
  Object.values(tree.dirs).forEach(dir => {
    directoryList.push(dir);
    listAllDirectories(dir, directoryList);
  });
}