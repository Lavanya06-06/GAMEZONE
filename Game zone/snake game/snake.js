const startButton = document.querySelector("#start");
const beginScreen = document.querySelector(".begin");
const gameBoard = document.querySelector(".game");
const scorebox = document.querySelector("#scorebox");
const gameover = new Audio("gameover.mp3");
const foodsound = new Audio("food.mp3");



startButton.addEventListener("click", () => {
    console.log("clicked start");
    beginScreen.style.display = "none"; // hide intro
    gameBoard.style.display = "grid";
    scorebox.style.display = "block";// show game grid
    window.requestAnimationFrame(main); // start game loop
});

let score = 0;
let lastPaintTime = 0;
let speed = 4;
let snakeArr = [
    { x: 10, y: 15 }
];
food = { x: 13, y: 7 };
inputdir = { x: 0, y: 0 };


//for animation(loops runs again and again),lastpainttime is millisecons so t it divide by 1000
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return; //don't execute
    }
    lastPaintTime = ctime;
    gameEngine();
}

//Main function of the game
function iscollide(sarr) {
    for (let i = 1; i < sarr.length; i++) {
        if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) {
            return true;
        }
    }

    if (sarr[0].x <= 0 || sarr[0].x >= 18 || sarr[0].y >= 18 || sarr[0].y <= 0) {
        return true;
    }
}


window.addEventListener("keydown", e => {
    switch (e.key) {
        case "ArrowUp":
            inputdir.x = 0;
            inputdir.y = -1;
            break;
        case "ArrowDown":
            inputdir.x = 0;
            inputdir.y = 1;
            break;
        case "ArrowLeft":
            inputdir.x = -1;
            inputdir.y = 0;
            break;
        case "ArrowRight":
            inputdir.x = 1;
            inputdir.y = 0;
            break;
        default:
            break;
    }
});


function gameEngine() {
    //part1:Updating the snake array and food
    if (iscollide(snakeArr)) {
        gameover.play();
        alert("GAME OVER,PRESS OK TO PLAY AGAIN");
        inputdir = { x: 0, y: 0 };
        snakeArr = [{ x: 10, y: 15 }];
        score=0;
        scorebox.innerHTML="Score:"+score;
    }

    //if eaten the food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        foodsound.play();
        score += 1;
        scorebox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputdir.x, y: snakeArr[0].y + inputdir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.floor(a + (b - a) * Math.random()), y: Math.floor(a + (b - a) * Math.random()) };

    }

    //moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputdir.x;
    snakeArr[0].y += inputdir.y;





    //part2:displaying the snake and food
    gameBoard.innerHTML = "";
    snakeArr.forEach((e, index) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add(index === 0 ? 'snake-head' : 'snake');//start of the array it will select head or else snake
        gameBoard.appendChild(snakeElement);
    });

    //display snake
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);





}
