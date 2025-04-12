const c = document.getElementById('canvas');
const context = c.getContext('2d');
c.width = 500; 
c.height = 500;
let boxes = [];
function drawbox(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x, y, 10, 10); 
}
function move(box) {
    box.x += 10; }
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 5; j++){
        let row1box = {
            x: 20 * i,
            y: 10+ 20 * j,
            color: 'red',
            draw: function() {
                drawbox(this.x, this.y, this.color); 
            }
        };
        boxes.push(row1box);    
    }
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
const blockSize = 20;

function update() {
    context.clearRect(0, 0, c.width, c.height);
    let intendedX = player.x;
    let intendedY = player.y;
    if (keys['ArrowLeft'] || keys['a']) {
        intendedX -= blockSize; }
    if (keys['ArrowRight'] || keys['d']) {
        intendedX += blockSize; }
    if (keys['ArrowUp'] || keys['w']) {
        intendedY -= blockSize;}
    if (keys['ArrowDown'] || keys['s']) {
        intendedY += blockSize;}
    if (intendedX >= 0 && intendedX <= c.width - player.width) {
        player.x = intendedX;}
    if (intendedY >= 0 && intendedY <= c.height - player.height) {
        player.y = intendedY;}
    player.draw();
    for (let i = 0; i < boxes.length; i++) {
        move(boxes[i]);
        boxes[i].draw();}
    requestAnimationFrame(update);
}
update();
