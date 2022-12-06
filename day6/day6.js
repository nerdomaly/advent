const fs = require('fs');
const _ = require('lodash');

const signal = fs.readFileSync('day6.input', 'utf-8').split('');

const findFirstUniqRun = (input, length) => {
    let buffer = '';

    for (let position = 0; position < input.length; position++) {
        buffer += input[position];

        if (buffer.length > length) {
            buffer = buffer.substring(1);
        }

        if (
            buffer.length === length &&
            _.uniq(buffer.split('')).length === length
        ) {
            return { buffer, position: ++position };
        }
    }
};

console.log(findFirstUniqRun(signal, 4));
console.log(findFirstUniqRun(signal, 14));
