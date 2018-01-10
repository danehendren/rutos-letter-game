
const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");

//create the unit
const box = 33;

//load images
const ground = new Image();
ground.src = "images/zora.jpg"

const foodImg = new Image();
foodImg.src = "images/bottle.png"

//audio files

const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "audio/error.wav";
eat.src = "audio/eat.wav";
up.src = "audio/a.wav";
left.src = "audio/b.wav";
right.src = "audio/d.wav";
down.src = "audio/f.wav";

//create snake

let snake = [];
snake[0] = {
    x : 9 * box,
    y : 10 * box
}
 // create food

 let food = {
     x : Math.floor(Math.random()*17+1) * box,
     y : Math.floor(Math.random()*15+3) * box
 }

//create the score
//
let score = 0;

//control the snake
 let d;

 document.addEventListener("keydown", direction );


     function direction(event) {
         let key = event.keyCode;
         if(key == 37 && d != "RIGHT") {
             left.play();
             d = "LEFT";
         } else if (key == 38 && d != "DOWN") {
             up.play();
             d = "UP";
         } else if (key == 39 && d != "LEFT")  {
             right.play();
             d = "RIGHT";
         } else if (key == 40 && d != "UP") {
             down.play();
             d = "DOWN";
         }
     }

     //check collision function
     function collision(head, array) {
         for( let i = 0; i < array.length; i++){
             if(head.x == array[i].x && head.y == array[i].y) {
                 return true;
             }
         }
         return false;
     }



function draw() {

    context.drawImage(ground, 0, 0);

    for( let i = 0; i< snake.length ; i++) {
        context.fillStyle = (i == 0)? "green" : "white";
        context.fillRect(snake[i].x, snake[i].y,box,box);

        context.fillStyle = "#009B43";
        context.fillRect(snake[i].x, snake[i].y,box,box);
    }

    context.drawImage(foodImg, food.x, food.y)

    //old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    //which direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakeY += box;


    // when snake eats
    if(snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
    } else {
        //remove the tail
        snake.pop();
    }

    //add new head
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    //game over
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead, snake)) {
        clearInterval(game);
        dead.play();
    }



    snake.unshift(newHead);

    context.fillStyle = "white";
    context.font = "45px Helvetica";
    context.fillText( score, 2*box, 1.6*box);
}
    // //add new head
    //
    // let newHead = {
    //     x : snakeX,
    //     y : snakeY
    // }
    //
    //
    //
    //
    let game = setInterval(draw, 100);

    // draw everything to canvas
