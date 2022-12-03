const fs = require('fs');
const _ = require('lodash');

const file = fs.readFileSync('day3.input', 'utf-8');

const itemTypes = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

let totalPriority = 0;
let ruckSackGroup = [];
let ruckSackGroupPriority = 0;

file.split(/\n/).forEach((line) => {
    let lineLength = line.length;
    let midPoint = lineLength / 2 + (lineLength % 2);
    let [firstSack, secondSack] = [
        line.slice(0, midPoint),
        line.slice(midPoint, line.length),
    ];

    let intersect = _.intersection([...firstSack], [...secondSack]);

    intersect.forEach((x) => (totalPriority += itemTypes.indexOf(x) + 1));

    if (ruckSackGroup.length < 3) {
        ruckSackGroup.push([...line]);

        if (ruckSackGroup.length == 3) {
            let ruckSackIntercept = _.intersection(...ruckSackGroup);
            ruckSackIntercept.forEach(
                (x) => (ruckSackGroupPriority += itemTypes.indexOf(x) + 1)
            );
            if (ruckSackIntercept.length === 0) {
                console.log(ruckSackGroup.map((x) => x.join('')));
                console.log(ruckSackIntercept);
            }
            ruckSackGroup = [];
        }
    }
});

console.log(`totalPriority: ${totalPriority}`);
console.log(`ruckSackGroupPriority: ${ruckSackGroupPriority}`);
