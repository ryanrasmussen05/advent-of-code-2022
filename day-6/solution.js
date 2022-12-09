import { getInput } from '../util/file-reader.js';

let input = await getInput('./day-6/input.txt');
input = input[0];

console.log(findFirstString(4));
console.log(findFirstString(14));

function findFirstString(size) {
  for(let index = 0; index < input.length; index++) {
    const substring = input.substring(index, index + size);
    if (_.uniq(substring).length === size) {
      return index + size;
    }
  }
}