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
function update() {
    context.clearRect(0, 0, c.width, c.height);  
    for (let i = 0; i < boxes.length; i++) {
        move(boxes[i]);  
        boxes[i].draw(); 
    }
    requestAnimationFrame(update);
}
update();
