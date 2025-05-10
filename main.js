const c = document.getElementById('canvas');
const context = c.getContext('2d');
c.width = 500;
c.height = 500;
colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
let canmove = true;
let boxes = [];
let isRunning = true;
health = 3;  
function drawbackground() {
    context.fillStyle = 'green'
    context.fillRect(0, 480, 500, 20)
    context.fillRect(0, 0, 500, 20)
}
drawbackground()
function drawbox(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x, y, 10, 10);
}
function move(box) {
    box.x += 3;
}
let player = {
    x: c.width / 2 - 10,
    y: 481,
    width: 20,
    height: 20,
    color: 'black',
    speed: 5,
    draw: function() {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
};
function createlog(){
    const minInclusive = 1;
    const maxInclusive = 23;
    const randomNumber = Math.floor(Math.random() * (maxInclusive - minInclusive + 1));
    let row1box = {
        x: -10,
        y: 30+ 20 *randomNumber,
        width: 10,
        height: 10,
        maxInclusive:  6,
        color: colors[ Math.floor(Math.random() * (maxInclusive - minInclusive + 1))],
        draw: function() {
            drawbox(this.x, this.y, this.color);
        }
    };
    boxes.push(row1box);
}
let keys = {};
document.addEventListener('keydown', function(e) {
    keys[e.key] = true;
});
document.addEventListener('keyup', function(e) {
    keys[e.key] = false;
});
const blockSize = 20.1;
const framerate = 10;
let counter = 0;
function collision(player, box) {
    if (player.x + player.width < box.x) {
        return false;
    }
    if (player.x > box.x + box.width) {
        return false;
    }
    if (player.y + player.height < box.y) {
        return false;
    }
    if (player.y > box.y + box.height) {
        return false;
    }
    return true;
}

function stopGame() {
    if (health == 0){
        isRunning = false
    };
}

function update() {
    if (!isRunning) return;

    context.clearRect(0, 0, c.width, c.height);
    for (let i = 0; i < boxes.length; i++) {
        move(boxes[i]);
        boxes[i].draw();
        if (collision(player, boxes[i])) {
            health -= 1
            stopGame();
            player.color = 'yellow';
        } else {
             player.color = 'black';
        }
        if (boxes[i].x > c.width) {
            boxes.splice(i, 1);
            i--;
        }
    }
    drawbackground()
    let intendedX = player.x;
    let intendedY = player.y;
    if (canmove) {
        if (keys['ArrowLeft'] || keys['a']) {
            intendedX -= blockSize;
            canmove = false;
        }
        if (keys['ArrowRight'] || keys['d']) {
            intendedX += blockSize;
            canmove = false;
        }
        if (keys['ArrowUp'] || keys['w']) {
            intendedY -= blockSize;
            canmove = false;
        }
        if (keys['ArrowDown'] || keys['s']) {
            intendedY += blockSize;
            canmove = false;
        }
    }
    intendedX = Math.max(0, Math.min(intendedX, c.width - player.width));
    player.x = intendedX;
    player.y = intendedY;
    player.draw();
    counter++;
    if (counter >= framerate){
        createlog();
        counter = 0;
    }
    if (player.y <= 10){
        player.color = 'red'
        return;
    }
    requestAnimationFrame(update);
}
document.addEventListener('keyup', function(e) {
    canmove = true;
});

isRunning = true;
update();
