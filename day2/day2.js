const fs = require('fs');

const file = fs.readFileSync('day2.input', 'utf-8');

const Moves = [
    {
        id: 'Rock',
        opponentSymbol: 'A',
        playerSymbol: 'X',
        scoreValue: 1,
        beats: 'Scissors',
        losesTo: 'Paper',
    },
    {
        id: 'Paper',
        opponentSymbol: 'B',
        playerSymbol: 'Y',
        scoreValue: 2,
        beats: 'Rock',
        losesTo: 'Scissors',
    },
    {
        id: 'Scissors',
        opponentSymbol: 'C',
        playerSymbol: 'Z',
        scoreValue: 3,
        beats: 'Paper',
        losesTo: 'Rock',
    },
];

const Score = (opponentMove, playerMove) => {
    if (opponentMove == playerMove) {
        return 3 + playerMove.scoreValue;
    } else if (opponentMove.beats === playerMove.id) {
        return playerMove.scoreValue;
    } else {
        return 6 + playerMove.scoreValue;
    }
};

let moveScore = 0;
let outcomeScore = 0;

file.split(/\n/).forEach((line) => {
    var [opponentMove, playerMove] = line
        .split(' ')
        .map((x) =>
            Moves.find((y) => y.opponentSymbol === x || y.playerSymbol === x)
        );

    moveScore += Score(opponentMove, playerMove);

    switch (playerMove.playerSymbol) {
        case 'X': // Player Loss
            newPlayerMove = Moves.find((x) => x.losesTo === opponentMove.id);
            break;
        case 'Y': // Player Draw
            newPlayerMove = Moves.find((x) => x.id === opponentMove.id);
            break;
        case 'Z': // Player Win
            newPlayerMove = Moves.find((x) => x.beats === opponentMove.id);
            break;
    }
    outcomeScore += Score(opponentMove, newPlayerMove);
});

console.log(`Score with column B as moves: ${moveScore}`);
console.log(`Score with column B as outcome: ${outcomeScore}`);
