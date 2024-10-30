// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Ball {
    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        if (this.x + this.size >= width || this.x - this.size <= 0) {
            this.velX *= -1;
        }
        if (this.y + this.size >= height || this.y - this.size <= 0) {
            this.velY *= -1;
        }
        this.x += this.velX;
        this.y += this.velY;
    }

    collisionDetect() {
        for (const ball of balls) { if (this !== ball) {
            const dx = this.x - ball.x;
            const dy = this.y - ball.y;
            const dist = Math.sqrt(dx ** 2 + dy ** 2);
            if (dist < this.size + ball.size) {
                /* ball.color = this.color =  randomRGB(); */
                /* colorAverage(this, ball); */
                const oldColor = this.color;
                this.color = ball.color;
                ball.color = oldColor;
            }
        }}
    }
}

function colorAverage(ball1, ball2) {
    const colors1 = ball1.color.split(',');
    const colors2 = ball2.color.split(',');
    colors1[0] = colors1[0].substring(4);
    colors2[0] = colors2[0].substring(4);
    colors1[2] = colors1[2].substring(0, colors1[2].indexOf(')'));
    colors2[2] = colors2[2].substring(0, colors2[2].indexOf(')'));
    const colors3 = [
        (Number(colors1[0]) + Number(colors2[0])) / 2,
        (Number(colors1[1]) + Number(colors2[1])) / 2,
        (Number(colors1[2]) + Number(colors2[2])) / 2,
    ]
    return `rgb(${colors3[0]},${colors3[1]},${colors3[2]})`
}

// Make an array of balls
const balls = [];
while (balls.length < 10) {
    const size = random(10, 20);
    balls.push(new Ball(
        // ball position always drawn at least one ball width
        // away from the edge of the canvas, to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        randomRGB(),
        size,
    ));
}

function loop() {
    ctx.fillStyle = "rgb(0 0 0 / 25%)";
    ctx.fillRect(0, 0, width, height);
    for (const ball of balls) {
        ball.draw();
        ball.update();
        ball.collisionDetect();
    }
    requestAnimationFrame(loop);
}

loop();