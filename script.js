const helloKitty = document.getElementById('helloKitty');
const obstacle = document.getElementById('obstacle');
const scoreBoard = document.getElementById('score');
const levelBoard = document.getElementById('level');

let score = 0;
let level = 1;
let jumping = false;
let gameSpeed = 1200;

function jump() {
    if (jumping) return;
    jumping = true;
    helloKitty.classList.add('jump');
    setTimeout(() => {
        helloKitty.classList.remove('jump');
        jumping = false;
    }, 500);
}

function checkCollision() {
    const kittyRect = helloKitty.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        kittyRect.right > obstacleRect.left &&
        kittyRect.left < obstacleRect.right &&
        kittyRect.bottom > obstacleRect.top &&
        kittyRect.top < obstacleRect.bottom
    ) {
        alert('perdiste! tu puntaje :): ' + score);
        resetGame();
    }
}

function resetGame() {
    score = 0;
    level = 1;
    gameSpeed = 2000;
    scoreBoard.textContent = score;
    levelBoard.textContent = level;
    obstacle.style.animationDuration = `${gameSpeed / 1000}s`;
}

function updateGame() {
    score++;
    scoreBoard.textContent = score;
    if (score % 10 === 0) {
        level++;
        levelBoard.textContent = level;
        gameSpeed *= 0.9;
        obstacle.style.animationDuration = `${gameSpeed / 1000}s`;
    }
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' || event.code === 'ArrowUp') {
        jump();
    }
});

document.addEventListener('touchstart', () => {
    jump();
});

setInterval(checkCollision, 10);
setInterval(updateGame, 1000);