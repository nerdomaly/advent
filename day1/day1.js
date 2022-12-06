const fs = require('fs');
const _ = require('lodash');

const file = fs.readFileSync('day1.input', 'utf-8');
let elves = [];
let currentElf = 0;

file.split(/\n/).forEach((line) => {
    if (line.trim() != '') {
        if (!elves[currentElf]) {
            elves[currentElf] = { id: currentElf, totalCals: 0, cals: [] };
        }
        elves[currentElf].cals.push(parseInt(line));
        elves[currentElf].totalCals += parseInt(line);
    } else {
        currentElf++;
    }
});

elves = _.sortBy(elves, ['totalCals']).reverse();

console.log(`Number of Elves: ${currentElf}`);
console.log(
    `Most cals held by one Elf (id: ${elves[0].id}): ${elves[0].totalCals}`
);
console.log(
    `Cals held by top three Elves: ${_(elves)
        .take(3)
        .map((x) => x.totalCals)
        .sum()}`
);
console.log(
    `Total Cals: ${_(elves)
        .map((x) => x.totalCals)
        .sum()}`
);
