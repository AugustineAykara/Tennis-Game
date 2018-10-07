console.log("hello");

var canvas;
var canvasContext;

var ballX = 400;
var ballY = 300;
var ballSpeedX = 10;
var ballSpeedY = 5;

var paddle1Y = 250;
var paddle2Y = 250;

const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;
const MAX_SCORE = 3;

var player = 0;
var computer = 0;
var showWinner = false;

window.onload = function(){
  console.log('world');
  canvas = document.getElementById('canvas');
  canvasContext = canvas.getContext('2d');

  setInterval(callBoth, 25);  //fn. callBoth would be called after each 25ms

  canvas.addEventListener('mousedown', function(evt){
    if (showWinner == true) {
      player = 0;
      computer = 0;
      showWinner = false;
    }
  });

  canvas.addEventListener('mousemove', function(evt){
    var mousePos = calculateMousePos(evt);
    paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
  });
}

function callBoth() {
  draw();
  motion();
}

// fn. that return mouse pointer (x,y) coordinate
function calculateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;

  return {
    x : mouseX,
    y : mouseY
  };
}

//fn. to reset the balls position
function ballReset() {
  if (player == MAX_SCORE || computer == MAX_SCORE) {
    showWinner = true;
  }

  ballSpeedY = 5;
  ballSpeedX = 8;
  ballX = canvas.width/2;
  ballY = canvas.height/2;
}

function rightPaddleMovement() {
  var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);

  if (paddle2YCenter < ballY - 20) {
    paddle2Y += 10;
  }
  else if (paddle2YCenter > ballY + 20) {
    paddle2Y -= 10;
  }
}

function motion(){
  if (showWinner == true) {
    return ;
  }
  rightPaddleMovement();

  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;

  if (ballX < 0)
  {
    if (ballY > paddle1Y && ballY < (paddle1Y + PADDLE_HEIGHT) ) {
      ballSpeedX = -ballSpeedX;
      var changeSpeed = ballY - (paddle1Y + (PADDLE_HEIGHT/2) )
      ballSpeedY = changeSpeed * .35;
    }
    else {
      computer++;
      ballReset();
    }
  }

  if (ballX > canvas.width) {
    if (ballY > paddle2Y && ballY < (paddle2Y + PADDLE_HEIGHT) ) {
      ballSpeedX = -ballSpeedX;
      changeSpeed = ballY - (paddle2Y + (PADDLE_HEIGHT/2) )
      ballSpeedY = changeSpeed * .37;
    }
    else {
      player++;
      ballReset();
    }
  }

  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
  if (ballY < 0) {
    ballSpeedY = -ballSpeedY;
  }
}

// fn to draw center line
function middleNet() {
  for (var i = 0; i <= canvas.height; i+=40) {
    drawRect(canvas.width/2, i, 1, 20, 'white');
  }
}

// fn. to draw required all shapes in the canvas
function draw(){
// canvas
  drawRect(0, 0, canvas.width, canvas.height, 'black');

  if (showWinner == true) {
    canvasContext.font = "15px Monospace";
    canvasContext.fillStyle = 'lightgreen';
    if (player == MAX_SCORE) {
      canvasContext.fillText("PLAYER WON \t :)", 325, 100);   //(text, x, y)
    }
    else if (computer == MAX_SCORE) {
      canvasContext.fillText("COMPUTER WON \t :(", 325, 100);   //(text, x, y)
    }
    canvasContext.fillText("CLICK to continue...", 300, 135);   //(text, x, y)
    return ;
  }
  middleNet();
//left paddle
  drawRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
//right paddle
  drawRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
//ball
  drawCircle(ballX, ballY, 10, 'orange');
//score
  canvasContext.fillStyle = 'white';
  canvasContext.fillText("PLAYER", 185, 100);   //(text, x, y)
  canvasContext.fillText(player, 200, 125);   //(text, x, y)
  canvasContext.fillText("COMPUTER", canvas.width-225, 100);   //(text, x, y)
  canvasContext.fillText(computer, canvas.width-200, 125);   //(text, x, y)
}



// fn. for the ball positioning and color
function drawCircle(x, y, radius, color){
//ball
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.arc(x, y, radius, 0, Math.PI*2, true);   //(x, y, radius, angles, radians, ?)    Math.PI*2 is circle and Math.PI is semicircle
  canvasContext.fill();
}

// fn. for the paddle positioning and color
function drawRect(x, y, width, height, color) {
//canvas
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);

//paddle
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);
}
