var canvas = document.getElementById('mCanvas')
var ctx = canvas.getContext('2d')

var w = canvas.width
var h = canvas.height
var x = w/2
var y = h-40
var ballRad = 10
var dx = 2
var dy = -2

var pw = 100
var ph = 15
var px = (w-pw)/2
var py = h-ph
var rightPress = false
var leftPress = false

var brickColumnCount = 5
var brickRowCount = 3
var brickWidth = 90
var brickHeight = 20
var brickPadding = 10
var brickOffsetLeft = 30
var brickOffsetTop = 30
var bricks = []
var lives = 3
let clr

document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)

for(var i=0; i<brickColumnCount; i++) {
    bricks[i] = []
    for(var j=0; j<brickRowCount; j++) {
        var random = parseInt(Math.floor(Math.random() * 11))
        if(random > 0 && random <= 4) {
            clr = 'red'
        }
        if(random > 4 && random <= 7) {
            clr = 'green'
        }
        if(random > 7 && random <= 12) {
            clr = 'blue'
        }
        bricks[i][j] = {
            x: 0,
            y: 0,
            color: clr,
            status: 1
        }
    }
}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPress = true
    }
    if(e.ke == "Left" || e.key == "ArrowLeft") {
        leftPress = true
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPress = false
    }
    if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPress = false
    }
}

function drawBall() {
    ctx.beginPath()
    ctx.arc(x,y,ballRad,0,Math.PI*2,false)
    ctx.fillStyle = 'yellow'
    ctx.fill()
    ctx.closePath()
}

function drawPaddle() {
    ctx.beginPath()
    ctx.rect(px,py,pw,ph)
    ctx.fillStyle = 'white'
    ctx.fill()
    ctx.closePath()
}

function drawBricks() {
    for(var i=0; i<brickColumnCount; i++) {
        for(var j=0; j<brickRowCount; j++) {
            if(bricks[i][j].status == 1) {
                var brickX = (i*(brickWidth+brickPadding))+brickOffsetLeft
                var brickY = (j*(brickHeight+brickPadding))+brickOffsetTop
                var mClr = bricks[i][j].color
                bricks[i][j].x = brickX
                bricks[i][j].y = brickY
                ctx.beginPath()
                ctx.rect(brickX, brickY, brickWidth, brickHeight)
                ctx.fillStyle = mClr
                ctx.fill()
                ctx.closePath()
            }
        }
    } 
}

function collision() {
    for(var i=0; i<brickColumnCount; i++) {
        for(var j=0; j<brickRowCount; j++) {
            var b = bricks[i][j]
            if(b.status == 1) {
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    b.status = 0
                    dy = -dy
                }
            }
        }
    }
}

function draw() {
    ctx.clearRect(0,0,w,h)
    drawBall()
    drawBricks()
    drawPaddle()
    collision()
    if(rightPress) {
        px += 7 
        if(px + pw > w) {
            px = w - pw
        }
    }
    if(leftPress) {
        px -= 7
        if(px < 0) {
            px = 0
        }
    }
    if(x + dx > w - ballRad || x + dx < ballRad) {
        dx = -dx
    }
    if(y + dy < ballRad) {
        dy = -dy
    }
    if(y + dy > h - ballRad) {
        if(x > px && x < px + pw) {
            dy = -dy
        }
        else {
            if(lives > 0) {
                lives--
                x = w/2
                y = w-40
                px = (w-pw)/2
                py = h-ph
            }
            else {
                alert('GameOver')
                clearInterval(interval)
                window.location.reload()
            }
        }
    }
    y += dy
    x += dx
}

var interval = setInterval(draw, 10)