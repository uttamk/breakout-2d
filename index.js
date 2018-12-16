//Board
var canvas = window.document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var blue = "#0095DD";

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    clearCanvas();
    drawPaddle();
    drawBall();
    updateBallPosition();
    adjustBallDirection();
    updatePaddlePosition();
}


// Ball
var x = canvas.width / 2;
var y = canvas.height - 30;
var ballRadius = 10;
var dx = 2;
var dy = -2;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = blue;
    ctx.fill();
    ctx.closePath();
}

function updateBallPosition() {
    x += dx;
    y += dy;
}

function adjustBallDirection() {
    if (x + dx < 0 || x + dx > canvas.width - ballRadius) {
        dx = -dx;
    }
    if (y + dy < 0) {
        dy = -dy;
    } if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            alert("GAME OVER");
            document.location.reload();
        }
    }
}

// Paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }

}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = blue;
    ctx.fill();
    ctx.closePath();
}

function updatePaddlePosition() {
    var dx = 7;
    if (leftPressed && paddleX >= 0)
        paddleX -= dx;
    if (rightPressed && paddleX <= (canvas.width - paddleWidth))
        paddleX += dx;
}




// Main
setInterval(draw, 15);