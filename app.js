// Get canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Circle (bubble) object
let circle = {
  x: 100,
  y: 150,
  radius: 40,
  color: getRandomColor()
};

// Arrow object
let arrow = {
  x: 500,
  y: 145,
  width: 30,
  height: 10,
  speed: 2
};

let animationId = null;
let isHit = false;

// Generate a random color
function getRandomColor() {
  return `hsl(${Math.random() * 360}, 100%, 50%)`;
}

// Draw the circle
function drawCircle() {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
  ctx.fillStyle = circle.color;  // Fill the inside
  ctx.fill();

  // Now add black border
  ctx.lineWidth = 3;
  ctx.strokeStyle = "black";     // Border color
  ctx.stroke();

  ctx.closePath();
}

// Draw the arrow
function drawArrow() {
  ctx.beginPath();
  ctx.moveTo(arrow.x, arrow.y + 10);
  ctx.lineTo(arrow.x - 30, arrow.y + 10);
  ctx.lineTo(arrow.x - 25, arrow.y);
  ctx.moveTo(arrow.x - 30, arrow.y + 10);
  ctx.lineTo(arrow.x - 25, arrow.y + 20);
  ctx.stroke();
  ctx.closePath();
}

// Clear and draw everything
function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCircle();
  drawArrow();
}

// Move arrow and check for hit
function moveArrow() {
  if (arrow.x > circle.x + circle.radius + 30)
    {
    arrow.x -= arrow.speed;
    drawScene();
    animationId = requestAnimationFrame(moveArrow);
  } else {
    cancelAnimationFrame(animationId);
    isHit = true;
    circle.color = "yellow"; // Change color when hit
    drawScene();
  }
}

// Reset everything
function resetGame() {
  arrow.x = 500;
  circle.color = getRandomColor();
  isHit = false;
  drawScene();
}

// Button events
document.getElementById("hitBtn").addEventListener("click", () => {
  if (!isHit) moveArrow();
});

document.getElementById("resetBtn").addEventListener("click", () => {
  cancelAnimationFrame(animationId);
  resetGame();
});

// Initial drawing
drawScene();
