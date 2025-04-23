const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let playerX = 175;
let playerWidth = 50;
let playerHeight = 20;
let stars = [];
let score = 0;

function drawPlayer() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(playerX, canvas.height - playerHeight - 10, playerWidth, playerHeight);
}

function drawStar(star) {
  ctx.beginPath();
  ctx.arc(star.x, star.y, 10, 0, Math.PI * 2);
  ctx.fillStyle = 'gold';
  ctx.fill();
  ctx.closePath();
}

function updateStars() {
  for (let i = stars.length - 1; i >= 0; i--) {
    stars[i].y += 2;

    // Check if star is caught
    if (
      stars[i].y > canvas.height - playerHeight - 10 &&
      stars[i].x > playerX &&
      stars[i].x < playerX + playerWidth
    ) {
      stars.splice(i, 1);
      score++;
    } else if (stars[i].y > canvas.height) {
      stars.splice(i, 1); // Remove stars that fall off the screen
    }
  }

  if (Math.random() < 0.02) {
    stars.push({ x: Math.random() * canvas.width, y: 0 });
  }
}

function drawScore() {
  ctx.font = '20px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText(`Score: ${score}`, 10, 30);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  stars.forEach(drawStar);
  updateStars();
  drawScore();
  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' && playerX > 0) {
    playerX -= 15;
  } else if (event.key === 'ArrowRight' && playerX < canvas.width - playerWidth) {
    playerX += 15;
  }
});

gameLoop();