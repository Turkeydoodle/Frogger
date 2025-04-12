const c = document.getElementById('canvas');
const context = c.getContext('2d');
c.width = 500;
c.height = 500;
let canmove = true;
let boxes = [];
function drawbox(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x, y, 10, 10);
}
function move(box) {
    box.x += 1;
}
function createlog(){
    const minInclusive = 1;
    const maxInclusive = 5;
    const randomNumber = Math.floor(Math.random() * (maxInclusive - minInclusive + 1));
    let row1box = {
        x: 20,
        y: 10+ 20 *randomNumber,
        color: 'red',
        draw: function() {
            drawbox(this.x, this.y, this.color);
        }
    };
    boxes.push(row1box);
}
let player = {
    x: c.width / 2 - 10,
    y: c.height - 30,
    width: 20,
    height: 20,
    color: 'blue',
    speed: 5,
    draw: function() {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
};
let keys = {};
document.addEventListener('keydown', function(e) {
    keys[e.key] = true;
});
document.addEventListener('keyup', function(e) {
    keys[e.key] = false;
});
const blockSize = 10;
function update() {
    context.clearRect(0, 0, c.width, c.height);
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
    if (intendedX >= 0 && intendedX <= c.width - player.width) {
        player.x = intendedX;
    }
    if (intendedY >= 0 && intendedY <= c.height - player.height) {
        player.y = intendedY;
    }
    player.draw();
    for (let i = 0; i < boxes.length; i++) {
        move(boxes[i]);
        boxes[i].draw();
    }
    createlog(); 
    requestAnimationFrame(update);
}
document.addEventListener('keyup', function(e) {
    canmove = true;
});
update();