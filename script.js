//Canvas setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

let score = 0;
let gameFrame = 0;
ctx.font = '50px Georgia';

//Mouse Interactivity Setup
let canvasPosition = canvas.getBoundingClientRect();  //canvas positon - it measures of browser window but not edges of canvas

const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
    click: false
}
canvas.addEventListener('mousedown', function(event) {
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.height;
    conse.log(mouse.x, mouse.y);
});

//Player
class Player {
    construction () {

    }
}
//Bubbles
//Animation Loop