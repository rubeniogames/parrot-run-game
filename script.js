document.addEventListener('DOMContentLoaded', (event) => {
    const gameBoard = document.getElementById('game-board');
    const rollDiceButton = document.getElementById('roll-dice');
    const diceResult = document.getElementById('dice-result');
    const currentPlayerDisplay = document.getElementById('current-player');
    
    let currentPlayer = 'white';
    let dice = [];

    // Create triangles for the board
    for (let i = 0; i < 24; i++) {
        const triangle = document.createElement('div');
        triangle.classList.add('triangle');
        if (i % 2 === 0) {
            triangle.classList.add('white');
        } else {
            triangle.classList.add('black');
        }
        triangle.dataset.index = i;
        gameBoard.appendChild(triangle);
    }

    // Add checkers to the board
    addCheckers();

    rollDiceButton.addEventListener('click', () => {
        dice = rollDice();
        diceResult.textContent = `Dice Result: ${dice[0]}, ${dice[1]}`;
        // Enable movement logic based on dice result
        enableMovement();
        switchPlayer();
        currentPlayerDisplay.textContent = `Current Player: ${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}`;
    });
});

function addCheckers() {
    const positions = [
        { pos: 0, color: 'white', count: 2 },
        { pos: 11, color: 'white', count: 5 },
        { pos: 16, color: 'white', count: 3 },
        { pos: 18, color: 'white', count: 5 },
        { pos: 23, color: 'black', count: 2 },
        { pos: 12, color: 'black', count: 5 },
        { pos: 7, color: 'black', count: 3 },
        { pos: 5, color: 'black', count: 5 }
    ];

    positions.forEach((item) => {
        for (let i = 0; i < item.count; i++) {
            const checker = document.createElement('div');
            checker.classList.add('checker', item.color);
            document.getElementsByClassName('triangle')[item.pos].appendChild(checker);
        }
    });
}

function rollDice() {
    return [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
}

function enableMovement() {
    const triangles = document.querySelectorAll('.triangle');
    
    triangles.forEach(triangle => {
        triangle.addEventListener('click', function() {
            const checkers = this.querySelectorAll('.checker');
            if (checkers.length > 0 && checkers[0].classList.contains(currentPlayer)) {
                const targetIndex1 = parseInt(this.dataset.index) + dice[0]; // Move by first dice value
                const targetIndex2 = parseInt(this.dataset.index) + dice[1]; // Move by second dice value

                if (targetIndex1 < triangles.length) {
                    const targetTriangle1 = triangles[targetIndex1];
                    targetTriangle1.appendChild(checkers[checkers.length - 1]);
                }

                if (targetIndex2 < triangles.length) {
                    const targetTriangle2 = triangles[targetIndex2];
                    targetTriangle2.appendChild(checkers[checkers.length - 1]);
                }
            }
        });
    });
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
}
