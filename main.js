// Select the canvas element and get its context
const c = document.getElementById('canvas');
const context = c.getContext('2d');

c.width = 500;  // Set canvas width
c.height = 500; // Set canvas height

// Store box objects in an array
let boxes = [];

// Function to draw a box at given x and y coordinates with a specific color
function drawbox(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x, y, 10, 10); // Draw box with size 10x10px
}

// Function to move the box to the right by 10px
function move(box) {
    box.x += 10; // Move box right by 10px
}

// Create the initial boxes and store them in the 'boxes' array
for (let i = 0; i < 10; i++) {
    let box = {
        x: 20 * i,            // Initial x position with horizontal spacing
        y: 10,                // Initial y position
        color: 'red',         // Color of the box
        draw: function() {
            drawbox(this.x, this.y, this.color); // Draw box at current position
        }
    };
    boxes.push(box);  // Push the box object into the array
}

// Function to update the canvas (clear, move, and redraw boxes)
function update() {
    context.clearRect(0, 0, c.width, c.height);  // Clear the canvas
    for (let i = 0; i < boxes.length; i++) {
        move(boxes[i]);  // Move the box to the right
        boxes[i].draw(); // Draw the box at its new position
    }
    requestAnimationFrame(update); // Call update again to continue animation
}

// Start the animation
update();
