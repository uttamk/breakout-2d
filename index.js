//Board
var blue = "#0095DD";
var canvas = window.document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


var Game = function (canvas, ctx) {
    this.paddle = new Paddle(canvas.width, canvas.height, ctx);
    this.bricks = new Bricks();
    this.ball = new Ball(canvas.width, canvas.height, this.paddle.width, this.bricks.detectCollisions, ctx);

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    this.draw = function () {
        clearCanvas();
        this.paddle.draw();
        this.ball.draw(this.paddle.x);
        this.bricks.draw();
    }
    this.start = function () {
        setInterval(this.draw.bind(this), 15);
    }
}


// Ball

var Ball = function (board_width, board_height, paddleWidth, detectBrickCollisions, ctx) {
    this.x = board_width / 2;
    this.y = board_height - 30;
    var ballRadius = 10;
    var dx = 2;
    var dy = -2;

    this.draw = function (paddleX) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, ballRadius, 0, 2 * Math.PI);
        ctx.fillStyle = blue;
        ctx.fill();
        ctx.closePath();
        this.adjustBallDirection(paddleX);
        this.updateBallPosition();
    }

    this.updateBallPosition = function () {
        this.x += dx;
        this.y += dy;
    }

    this.adjustBallDirection = function (paddleX) {
        if (detectBrickCollisions(this.x, this.y)) {
            dy = -dy;
        }
        if (this.x + dx < 0 || this.x + dx > board_width - ballRadius) {
            dx = -dx;
        }
        if (this.y + dy < 0) {
            dy = -dy;
        }
        if (this.y + dy > board_height - ballRadius) {
            if (this.x > paddleX && this.x < paddleX + paddleWidth) {
                dy = -dy;
            }
            else {
                alert("GAME OVER");
                document.location.reload();
            }
        }
    }

}

// Paddle

function Paddle(board_width, board_height, ctx) {
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
// Brick
var Bricks = function () {
    var brickRowCount = 3;
    var brickColumnCount = 5;
    var brickWidth = 75;
    var brickHeight = 20;
    var brickPadding = 10;
    var brickOffsetTop = 30;
    var brickOffsetLeft = 30;

    var bricks = [];
    for (var c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (var r = 0; r < brickRowCount; r++) {
            bricks[c][r] = {
                x: (c * (brickWidth + brickPadding)) + brickOffsetLeft,
                y: (r * (brickHeight + brickPadding)) + brickOffsetTop,
                active: true
            };
        }
    }
    function hasCollided(brick, ballX, ballY) {
        if (ballX >= brick.x && ballX < brick.x + brickWidth && ballY >= brick.y && ballY < brick.y + brickHeight) {
            return true;
        }
        return false;
    }

    this.detectCollisions = function (ballX, ballY) {
        for (var c = 0; c < brickColumnCount; c++) {
            for (var r = 0; r < brickRowCount; r++) {
                var brick = bricks[c][r];
                if (brick.active && hasCollided(brick, ballX, ballY)) {
                    brick.active = false;
                    return true
                }
            }
        }
        return false;
    }

    this.draw = function () {
        for (var c = 0; c < brickColumnCount; c++) {
            for (var r = 0; r < brickRowCount; r++) {
                var brick = bricks[c][r];
                if (brick.active) {
                    ctx.beginPath();
                    ctx.rect(brick.x, brick.y, brickWidth, brickHeight);
                    ctx.fillStyle = blue;
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }

}


var game = new Game(canvas, ctx)
game.start();