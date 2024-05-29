const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const boardWidth = canvas.width;
const boardHeight = canvas.height;

const pointWidth = boardWidth / 15;
const pointHeight = boardHeight / 2;
const checkersRadius = pointWidth / 2.5;

const board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  // top points
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]   // bottom points
];

// Начальная расстановка фишек
const initialSetup = () => {
    board[0][0] = -2; board[1][0] = 2;
    board[0][11] = -5; board[1][11] = 5;
    board[0][16] = -3; board[1][16] = 3;
    board[0][18] = -5; board[1][18] = 5;
};

const drawBoard = () => {
    ctx.clearRect(0, 0, boardWidth, boardHeight);

    // Рисуем точки
    for (let i = 0; i < 15; i++) {
        // Верхние точки
        ctx.fillStyle = (i % 2 === 0) ? 'white' : 'black';
        ctx.beginPath();
        ctx.moveTo(i * pointWidth, 0);
        ctx.lineTo((i + 1) * pointWidth, 0);
        ctx.lineTo((i + 0.5) * pointWidth, pointHeight);
        ctx.fill();

        // Нижние точки
        ctx.beginPath();
        ctx.moveTo(i * pointWidth, boardHeight);
        ctx.lineTo((i + 1) * pointWidth, boardHeight);
        ctx.lineTo((i + 0.5) * pointWidth, boardHeight - pointHeight);
        ctx.fill();
    }

    // Рисуем бар
    ctx.fillStyle = 'gray';
    ctx.fillRect(boardWidth / 2 - pointWidth / 2, 0, pointWidth, boardHeight);
};

const drawCheckers = () => {
    for (let i = 0; i < 15; i++) {
        if (board[0][i] !== 0) {
            drawChecker(i, 0, board[0][i]);
        }
        if (board[1][i] !== 0) {
            drawChecker(i, 1, board[1][i]);
        }
    }
};

const drawChecker = (point, row, count) => {
    const isTop = row === 0;
    const color = count > 0 ? 'black' : 'white';
    const absCount = Math.abs(count);

    for (let i = 0; i < absCount; i++) {
        const x = point * pointWidth + pointWidth / 2;
        const y = isTop ? checkersRadius + i * 2 * checkersRadius : boardHeight - checkersRadius - i * 2 * checkersRadius;

        ctx.beginPath();
        ctx.arc(x, y, checkersRadius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.stroke();
    }
};

// Функции для обработки логики игры

initialSetup();
drawBoard();
drawCheckers();
