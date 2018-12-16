//Board
var canvas = window.document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var blue = "#0095DD";

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

draw = function () {
    clearCanvas();
    paddle.draw();
    drawBall();
    updateBallPosition();
    adjustBallDirection();
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
        if (x > paddle.x && x < paddle.x + paddle.width) {
            dy = -dy;
        }
        else {
            alert("GAME OVER");
            document.location.reload();
        }
    }
}

// Paddle

function Paddle(board_width, board_height) {
    this.width = 75;
    this.height = 10;
    this.x = (board_width - this.width) / 2;
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

    this.draw = function () {
        ctx.beginPath();
        ctx.rect(this.x, board_height - this.height, this.width, this.height);
        ctx.fillStyle = blue;
        ctx.fill();
        ctx.closePath();
        this.updatePaddlePosition();

    }

    this.updatePaddlePosition = function () {
        var dx = 7;
        if (leftPressed && this.x >= 0)
            this.x -= dx;
        if (rightPressed && this.x <= (board_width - this.width))
            this.x += dx;
    }
}





// Main
var paddle = new Paddle(canvas.width, canvas.height);
setInterval(draw, 15);