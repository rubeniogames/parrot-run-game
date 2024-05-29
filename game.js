const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let platform = {
    width: 150,
    height: 20,
    x: canvas.width / 2 - 75,
    y: canvas.height - 30,
    dx: 0
};

let ball = {
    radius: 15,
    x: canvas.width / 2,
    y: canvas.height / 2,
    dx: 4,
    dy: 4
};

// Обработчики клавиатуры
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

// Обработчики сенсорного экрана
canvas.addEventListener('touchstart', touchStartHandler);
canvas.addEventListener('touchmove', touchMoveHandler);
canvas.addEventListener('touchend', touchEndHandler);

function keyDownHandler(e) {
    if (e.key === 'ArrowRight') {
        platform.dx = 7;
    } else if (e.key === 'ArrowLeft') {
        platform.dx = -7;
    }
}

function keyUpHandler(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        platform.dx = 0;
    }
}

function touchStartHandler(e) {
    e.preventDefault();
    const touchX = e.touches[0].clientX;
    if (touchX > platform.x + platform.width / 2) {
        platform.dx = 7;
    } else {
        platform.dx = -7;
    }
}

function touchMoveHandler(e) {
    e.preventDefault();
    const touchX = e.touches[0].clientX;
    if (touchX > platform.x + platform.width / 2) {
        platform.dx = 7;
    } else {
        platform.dx = -7;
    }
}

function touchEndHandler(e) {
    e.preventDefault();
    platform.dx = 0;
}

function drawPlatform() {
    ctx.fillStyle = '#0095DD';
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function movePlatform() {
    platform.x += platform.dx;
    if (platform.x < 0) {
        platform.x = 0;
    } else if (platform.x + platform.width > canvas.width) {
        platform.x = canvas.width - platform.width;
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }

    if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    } else if (ball.y + ball.radius > canvas.height) {
        if (ball.x > platform.x && ball.x < platform.x + platform.width) {
            ball.dy = -ball.dy;
        } else {
            // Логика конца игры
            document.location.reload();
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlatform();
    drawBall();
    movePlatform();
    moveBall();
    requestAnimationFrame(draw);
}

draw();
