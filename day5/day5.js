const fs = require('fs');
const _ = require('lodash');

const file = fs.readFileSync('day5.input', 'utf-8');

let firstStacks = [[], [], [], [], [], [], [], [], []];
let secondStacks = [[], [], [], [], [], [], [], [], []];
let currentLine = 0;

file.split(/\n/).forEach((line) => {
    if (currentLine < 8) {
        const stackItems = line.match(/.{1,4}/g);

        stackItems.forEach((stack, index) => {
            const value = stack.substring(2, 1);
            if (value.trim() != '') {
                firstStacks[index] = [value, ...firstStacks[index]];
                secondStacks[index] = [value, ...secondStacks[index]];
            }
        });
    }

    if (currentLine >= 10) {
        const [, count, from, to] = line.match(/move (.+) from (.+) to (.+)/);

        let firstMovingBox,
            secondMovingBox = '';

        for (let index = 0; index < count; index++) {
            firstMovingBox = firstStacks[from - 1].pop();
            firstStacks[to - 1].push(firstMovingBox);

            secondMovingBox += secondStacks[from - 1].pop();
        }
        _.reverse(secondMovingBox.split('')).forEach((letter) => {
            secondStacks[to - 1].push(letter);
        });
    }
    currentLine++;
});

console.log(firstStacks.map((stack) => stack.reverse()[0]).join(''));
console.log(secondStacks.map((stack) => stack.reverse()[0]).join(''));
