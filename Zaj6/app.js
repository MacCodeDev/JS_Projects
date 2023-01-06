const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const numBallsInput = document.querySelector("#num-balls");
const startButton = document.querySelector("#start");
const resetButton = document.querySelector("#reset");
const minDistanceInput = document.querySelector("#min-distance");
let balls = []
let interval;

startButton.addEventListener("click",() => start())
resetButton.addEventListener("click",() => reset())

function Ball(x,y) {
    this.x = x;
    this.y = y;

    this.randomize = function() {
        this.radius = getRandomArbitrary(5,8);
        this.speedx = getRandomArbitrary(-1,1);
        this.speedy = getRandomArbitrary(-1,1);
    };
    this.changeSpeedX = function() {
        this.speedx = -(this.speedx);
    };
    this.changeSpeedY = function() {
        this.speedy = -(this.speedy);
    };
    this.updatePosition = function() {
        this.x += this.speedx;
        this.y += this.speedy;
    };
}

function start(){
    reset()
    console.log('test')
    for (let i = 0; i<numBallsInput.value; i++) {
        let ball = new Ball(getRandomArbitrary(30,canvas.width - 30),getRandomArbitrary(30,canvas.height - 30));
        ball.randomize();
        balls.push(ball)
    }
    interval=setInterval(ballAnimate, 50);
}

function ballAnimate() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    for(let i=0;i<balls.length;i++){
        if(((balls[i].x + balls[i].radius) >= canvas.width) || (balls[i].x - balls[i].radius < 0)) {
            balls[i].changeSpeedX();
        }
        if(((balls[i].y + balls[i].radius) >= canvas.height) || (balls[i].y - balls[i].radius < 0)) {
            balls[i].changeSpeedY();
        }

        balls[i].updatePosition();
        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, balls[i].radius, 0, 2 * Math.PI, false);
        ctx.lineWidth = 1
        ctx.stroke();
        ctx.closePath();
    }
    const lineArr = []
    balls.forEach((ball) => {
        balls.forEach((newBall) => {
            if (ball === newBall) return
            const distance = getDistance(ball,newBall)
            if (distance < minDistanceInput.value){
                lineArr.push({ball1:ball,ball2:newBall})
            }
        })
    })
    lineArr.forEach((line) =>{
        ctx.beginPath();
        ctx.moveTo(line.ball1.x, line.ball1.y);
        ctx.lineTo(line.ball2.x, line.ball2.y);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
    })
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function reset(){
    clearInterval(interval)
    balls = []
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function getDistance(ball1,ball2){
    const a = ball2.x - ball1.x;
    const b = ball2.y - ball1.y;
    return Math.sqrt(a * a + b * b );
}