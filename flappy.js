let board;
let boardWidth =360;
let boardHeight = 640;
let context ;


let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth/2;
let birdY = boardWidth/2;
let birdImg;
let bird ={
    x:birdX,
    y:birdY,
    width:birdWidth,
    height:birdHeight
}
//pips
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;
let toppipeImg;
let bottompipeImg;

//physics
let velocityX = -2; //pipe moving left
let velocityY = 0;
let gravity = 0.4;

let gameOver = false;
window.onload = function(){
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");
    //draw the flappy brd
    // context.fillStyle ="green";
    // context.fillRect(bird.x,bird.y,bird.width,bird.height);

    //load image
birdImg = new Image();
birdImg.src = "./flappybird.png";
birdImg.onload = function(){
context.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height);
}

toppipeImg = new Image();
toppipeImg.src = "./toppipe.png"

bottompipeImg = new Image();
bottompipeImg.src = "./bottompipe.png"

requestAnimationFrame(update);
setInterval(placePipes,1500); 
document.addEventListener("keydown",moveBird);
}
// 
//bottom pipe
//update or main 
function update(){
requestAnimationFrame(update);
if(gameOver){
    return ;
}
context.clearRect(0,0,board.width,board.height);

//bird
velocityY += gravity;
bird.y = Math.max(bird.y + velocityY, 0);
context.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height);
//pipes
for(let i=0 ; i<pipeArray.length; i++){
    let pipe = pipeArray[i];
    pipe.x += velocityX;
    context.drawImage(pipe.img,pipe.x,pipe.y,pipe.width,pipe.height);
if(detectCollision(bird , pipe)){
    gameOver = true;
}
}
}
function placePipes(){
    if(gameOver){
        return ;
    }
    let randompipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openingSpace = board.height/4;
    let toppipe = {
        img:toppipeImg,
        x: pipeX,
        y: randompipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }
    pipeArray.push(toppipe);

    let bottompipe = {
        img:bottompipeImg,
        x: pipeX,
        y: randompipeY + pipeHeight + openingSpace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }
    pipeArray.push(bottompipe);
}

function moveBird(e){
    if(e.code == "Space" || e.code == "ArrowUp" || e.code == "keyX"){
        velocityY = -6;
    }
}

function detectCollision(a,b){
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height >b.y;
}

