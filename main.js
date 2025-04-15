const c = document.getElementById('canvas');
const context = c.getContext('2d');
c.width = 500;
c.height = 500;
let canmove = true;
let boxes = [];
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
    box.x += 1;
}
let player = {
    x: c.width / 2 - 10,
    y: 480,
    width: 20,
    height: 20,
    color: 'blue',
    speed: 5,
    draw: function() {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
};
function createlog(){
    const minInclusive = 1;
    const maxInclusive = 25;
    const randomNumber = Math.floor(Math.random() * (maxInclusive - minInclusive + 1));
    let row1box = {
        x: 20,
        y: 30+ 20 *randomNumber,
        color: 'red',
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
const blockSize = 10;
const framerate = 20;
let counter = 0;
function update() {
    context.clearRect(0, 0, c.width, c.height);
    for (let i = 0; i < boxes.length; i++) {
        move(boxes[i]);
        boxes[i].draw();
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
    if (intendedX >= 0 && intendedX <= c.width - player.width) {
        player.x = intendedX;
    }
    if (intendedY >= 0 && intendedY <= c.height - player.height) {
        player.y = intendedY;
    }
    player.draw();
    counter++;
    if (counter >= framerate){
        createlog(); 
        counter = 0;
    }
    requestAnimationFrame(update);
}
document.addEventListener('keyup', function(e) {
    canmove = true;
});
update();