const rules_btn = document.querySelector("#rules-btn")
const close_btn = document.querySelector("#close-btn")
const rules_ele = document.querySelector("#rules")
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

let score = 0

const brickRowCount = 9;
const brickColCount = 5;
// Ball properties
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
}

// paddle properties
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  width: 80,
  height: 10,
  speed: 8,
  dx: 0
}

// Brick Props
const brickInfo = {
  width: 70,
  height: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true
}

//make individual bricks array
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColCount; j++) {
    const x = i * (brickInfo.width + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.height + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo }
    // console.log(bricks[i][j])
  }

}

// draw bricks
function drawBricks() {
  bricks.forEach(colum => {
    colum.forEach(brick => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.width, brick.height);
      ctx.fillStyle = brick.visible ? '#3a7f96' : 'transparent';
      ctx.fill();
      ctx.closePath();
    })
  })
}

// draw ball on canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = '#3a7f96'
  ctx.fill()
  ctx.closePath
}

// Draw paddle
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height)
  ctx.fillStyle = '#3a7f96'
  ctx.fill()
  ctx.closePath();
}

//Move paddle on canvas

function movePaddle() {
  paddle.x += paddle.dx;
  // wall dectection
  if (paddle.x + paddle.width > canvas.width) {
    paddle.x = canvas.width - paddle.width
  }
  if (paddle.x < 0) {
    paddle.x = 0;
  }
}


//Draw everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawPaddle()
  drawBall()
  drawScore()
  drawBricks()
}

// draw score
function drawScore() {
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, canvas.width - 95, 30)
}

//call request animation frame
function update() {
  movePaddle();
  //draw
  draw();

  requestAnimationFrame(update)
}

update();

// Keyboard event functions
function keyDown(e) {
  // console.log(e.key);
  if (e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'd') {
    paddle.dx = paddle.speed;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft' || e.key === 'a') {
    paddle.dx = -paddle.speed;
  }
}
function keyup(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'd') {
    paddle.dx = 0;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft' || e.key === 'a') {
    paddle.dx = 0;
  }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyup);

// Rules and close handles
rules_btn.addEventListener('click', () => {
  rules_ele.classList.add('show')
})
close_btn.addEventListener('click', () => {
  rules_ele.classList.remove('show')
})