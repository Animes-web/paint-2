const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;
let brushColor = '#000000';
let brushThickness = 5; 
let brushType = 'round';
let actions = [];
let shapeMode = null; 
let startX, startY;

ctx.strokeStyle = brushColor; 
ctx.lineWidth = brushThickness;


canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});


canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
});


canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    ctx.closePath();
});


canvas.addEventListener('mouseout', () => {
    isDrawing = false;
});


document.getElementById('clearCanvas').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});


document.getElementById('brushColor').addEventListener('input', (event) => {
    brushColor = event.target.value;
    ctx.strokeStyle = brushColor; 
});


document.getElementById('brushThickness').addEventListener('change', (event) => {
    brushThickness = event.target.value;
    ctx.lineWidth = brushThickness; 
});


document.getElementById('eraserThickness').addEventListener('change', (event) => {
    ctx.lineWidth = event.target.value; 
});


document.getElementById('brushType').addEventListener('change', (event) => {
    brushType = event.target.value;
    ctx.lineCap = brushType; 
});


document.getElementById('eraser').addEventListener('click', () => {
    brushColor = '#FFFFFF'; 
    ctx.lineWidth = 10; 
});


document.getElementById('saveImage').addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL();
    link.click();
});


document.getElementById('backgroundColor').addEventListener('input', (event) => {
    canvas.style.backgroundColor = event.target.value;
});


document.getElementById('drawRectangle').addEventListener('click', () => {
    shapeMode = 'rectangle';
});

document.getElementById('drawCircle').addEventListener('click', () => {
    shapeMode = 'circle';
});

canvas.addEventListener('mouseup', (event) => {
    if (shapeMode === 'rectangle') {
        const width = event.clientX - canvas.offsetLeft - startX;
        const height = event.clientY - canvas.offsetTop - startY;
        ctx.strokeStyle = brushColor;
        ctx.strokeRect(startX, startY, width, height);
    } else if (shapeMode === 'circle') {
        const radius = Math.sqrt(Math.pow(event.clientX - canvas.offsetLeft - startX, 2) + Math.pow(event.clientY - canvas.offsetTop - startY, 2));
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = brushColor;
        ctx.stroke();
    }
    shapeMode = null; 
});


document.getElementById('addText').addEventListener('click', () => {
    const text = document.getElementById('textInput').value;
    ctx.fillStyle = brushColor;
    ctx.font = `${brushThickness * 2}px Arial`;
    ctx.fillText(text, startX, startY);
});


canvas.style.cursor = 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhq8Ff-JMgKAAqsHyjTWp5xyM4riBXKrZe7g&s"), auto'; 
