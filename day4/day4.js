const fs = require('fs');
const _ = require('lodash');

const between = (number, a, b) => {
    var min = Math.min.apply(Math, [a, b]),
        max = Math.max.apply(Math, [a, b]);
    return number >= min && number <= max;
};

const file = fs.readFileSync('day4.input', 'utf-8');

let completeOverlap = 0;
let partialOverlap = 0;
let totalLines = 0;

file.split(/\n/).forEach((line) => {
    const [firstElf, secondElf] = line.split(',').map((elf) => {
        let [lower, upper] = elf.split('-').map((y) => parseInt(y));
        return { lower, upper };
    });

    if (
        (firstElf.lower <= secondElf.lower &&
            firstElf.upper >= secondElf.upper) ||
        (secondElf.lower <= firstElf.lower && secondElf.upper >= firstElf.upper)
    ) {
        completeOverlap++;
    }

    if (
        between(firstElf.lower, secondElf.lower, secondElf.upper) ||
        between(firstElf.upper, secondElf.lower, secondElf.upper) ||
        between(secondElf.lower, firstElf.lower, firstElf.upper) ||
        between(secondElf.lower, firstElf.loser, firstElf.upper)
    ) {
        partialOverlap++;
    }
});

console.log(`totalLines: ${totalLines}`);
console.log(`completeOverlap: ${completeOverlap}`);
console.log(`partialOverlap: ${partialOverlap}`);
