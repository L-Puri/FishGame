//getElement from HTML file
const startButton = document.querySelector('#start-button');
const canvas = document.querySelector('#my-canvas');
const startScreen = document.querySelector('#start-screen');
const gameBoard = document.querySelector('#game-board');
const reStartButton = document.querySelector('#gameOverButton');
const gameOversScreen = document.querySelector('#game-over');

//DISPLAY WINNING SCREEN
const gameWinningScreen = new Image();
gameWinningScreen.src = "./images/winner.jpg";
const body = document.body

//SCORE
let score = 0;
let gameFrame = 0;

//BACKGROUND IMAGE
const bgImg = new Image();
bgImg.src = "./images/background.jpg";

//PLAYER FISH IMAGE
const playerImg = new Image();
playerImg.src = "./images/fish.gif";

//JELLY FISH IMAGES
const jellyImg = new Image();
jellyImg.src = "./images/enemy-jellyfish.gif";

//BUBBLES IMAGES
const bubblesImg = new Image();
bubblesImg.src = "./images/bubbleOne.png";

//SMALL BUBBLES IMAGES
const smallBubblesImg = new Image();
smallBubblesImg.src = "./images/bubbles.png";


let bubblesArray = [
    {
        img: bubblesImg,
        x: 200,
        y: canvas.height + 500
    },

    {
        img: bubblesImg,
        x: 600,
        y: canvas.height + 400
    },

    {
        img: bubblesImg,
        x: 1000,
        y: canvas.height + 600
    }
];


let jellyArray = [
    {
        img: jellyImg,
        x: 100,
        y: canvas.height + 300
    },

    {
        img: jellyImg,
        x: 600,
        y: canvas.height + 400
    },

    {
        img: jellyImg,
        x: 800,
        y: canvas.height + 600
    },

    {
        img: jellyImg,
        x: 1000,
        y: canvas.height + 800
    }
];


let bubblesSmallArray = [
    {
        img: smallBubblesImg,
        x: 200,
        y: canvas.height + 200
    },

    {
        img: smallBubblesImg,
        x: 400,
        y: canvas.height + 300
    },

    {
        img: smallBubblesImg,
        x: 600,
        y: canvas.height + 500
    },

    {
        img: smallBubblesImg,
        x: 700,
        y: canvas.height + 700
    }
];


//Varaible for fish image
let playerX = 600;
let playerY = 400;
const playerWidth = 200;
const playerHeight = 170;
const waterSpeed = 0.5;
const playerSpeed = 40;


//CANVAS SETUP
const ctx = canvas.getContext('2d');

function drawBg() {
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
}
// canvas.style.backgroundColor = '#1e81b0';


//GLOBAL VARIABLES
let animationId = 0;
let gameOver = false;
let canvasWidth = 1200;
let canvasHeight = 800;


//FISH
function drawFish() {
    ctx.drawImage(playerImg, playerX, playerY, playerWidth, playerHeight);
    fishGravity();
}


//FISH GRAVITY
function fishGravity() {
    const downPos = playerY + waterSpeed;
    const upPos = playerY + waterSpeed;
    if (downPos <= 660) {
        playerY = downPos;
    } else if (upPos <= 660) {
        playerY = upPos;
    }
}


//Player moving only inside of canvas and also player does not overflow
function fishMovement(event) {
    if (event.key === 'ArrowRight') {
        if (playerX < canvas.width - playerWidth) {
            playerX = playerX + playerSpeed;
        }
    }
    if (event.key === 'ArrowLeft') {
        if (playerX > 0) {
            playerX = playerX - playerSpeed;
        }
    }
    if (event.key === 'ArrowDown') {
        if (playerY < canvas.height - playerHeight) {
            playerY = playerY + playerSpeed;
        }
    }
    if (event.key === 'ArrowUp') {
        if (playerY > 0) {
            playerY = playerY - playerSpeed;
        }
    }
}


//WINNING SCREEN
function loadWinningScreen() {
    canvas.classList.add('visibility');
    body.append(gameWinningScreen);
}


//Animation Loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBg();
    //SCORE TEXT
    ctx.font = '24px Verdana';
    ctx.fillText (`Your Score is: ${score}`, 30, 30);
    ctx.fillStyle = 'white';
    //ENDS SCORE TEXT
    drawFish();
    drawBubbles();
    drawJelly();
    drawSmallBubbles();
    //START SCORE
    if(score === 150 || gameOver) {
        cancelAnimationFrame(animationId);
        loadWinningScreen();
    }
    //CLOSE SCORE
    else {
        animationId = requestAnimationFrame(animate)
    }
}


// CLICK START BUTTON AND ENTER TO THE GAME PLATFORM
function startGame() {
    startScreen.style.display = 'none';
    gameBoard.style.display = 'block';
    gameOversScreen.style.display = 'none';
    animate();
}


// ADDEVENTLISTENER
window.addEventListener("load", () => {
    startScreen.style.display = 'block';
    gameBoard.style.display = 'none';
    gameOversScreen.style.display = 'none';
    startButton.addEventListener("click", () => {
        startGame();
    })
    
    reStartButton.addEventListener("click", () => {
        gameOver = false;
        jellyArray = [
            {
                img: jellyImg,
                x: 100,
                y: canvas.height + 300
            },
        
            {
                img: jellyImg,
                x: 600,
                y: canvas.height + 400
            },
        
            {
                img: jellyImg,
                x: 800,
                y: canvas.height + 600
            },
        
            {
                img: jellyImg,
                x: 1000,
                y: canvas.height + 800
            }
        ];

        bubblesArray = [
            {
                img: bubblesImg,
                x: 200,
                y: canvas.height + 500
            },
        
            {
                img: bubblesImg,
                x: 600,
                y: canvas.height + 400
            },
        
            {
                img: bubblesImg,
                x: 1000,
                y: canvas.height + 600
            }        
        ];
        startGame();
    })
})


document.addEventListener('keydown', fishMovement)
document.addEventListener('keyup', fishMovement)


//WATER BUBBLES
function drawBubbles() {
    for (let i = 0; i < bubblesArray.length; i += 1) {
        ctx.drawImage(bubblesArray[i].img, bubblesArray[i].x, bubblesArray[i].y, 100, 100)
        bubblesArray[i].y -= 2;
        if(bubblesArray[i].y < 0) {
            bubblesArray[i].y = canvas.height + 200;
        } 
        //BUBBLE COLLISION
                if (playerX < bubblesArray[i].x + 100 &&
                    playerX + playerWidth > bubblesArray[i].x &&
                    playerY < bubblesArray[i].y + 40 &&
                    playerHeight + playerY > bubblesArray[i].y) {
                        bubblesArray[i].y = canvas.height + 200;
                        score += 1;
                        console.log(score);
                    } 
    }
}


//JELLY FISH
function drawJelly() {
    for (let i = 0; i < jellyArray.length; i += 1) {
        ctx.drawImage(jellyArray[i].img, jellyArray[i].x, jellyArray[i].y, 120, 120)
        jellyArray[i].y -= 2;
        if(jellyArray[i].y < 0) {
            jellyArray[i].y = canvas.height + 300;
        }

        //FISH COLLISION 
        if (playerX < jellyArray[i].x + 120 &&
                    playerX + playerWidth > jellyArray[i].x &&
                    playerY < jellyArray[i].y + 50 &&
                    playerHeight + playerY > jellyArray[i].y) {
                    gameBoard.style.display = 'none';
                    gameOversScreen.style.display = 'block';
                    startScreen.style.display = 'none';
                    console.log('collision')
                    gameOver = true;
                }                
    }
}


//JELLY FISH
function drawSmallBubbles() {
    for (let i = 0; i < bubblesSmallArray.length; i += 1) {
        ctx.drawImage(bubblesSmallArray[i].img, bubblesSmallArray[i].x, bubblesSmallArray[i].y, 100, 100)
        bubblesSmallArray[i].y -= 1.5;
        if(bubblesSmallArray[i].y < 0) {
            bubblesSmallArray[i].y = canvas.height + 300;
        }
    }
}

