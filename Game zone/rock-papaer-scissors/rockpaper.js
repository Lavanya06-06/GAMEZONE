var youscroe = 0;
var compscore = 0;

var choose = document.querySelectorAll(".option");
var choices = ["rock", "paper", "scissors"];

choose.forEach(box => {
    box.addEventListener("click", () => {
        var player = box.getAttribute("id");
        //console.log(player);
        winner(player);
    });
});

function light(event) {
    event.style = "box-shadow: 0 0 7px lightskyblue,0 0 7px lightskyblue;"
}
var game = document.querySelector(".game");
var you = document.getElementById("you");
var comp = document.getElementById("comp");
var h1 = document.getElementById("heading");

function winner(play) {
    let computer = choices[Math.floor(Math.random() * choices.length)];
    //console.log(computer);
    if (play === computer) {
        h1.innerText = "The match is draw";
    }
    else if ((play === "rock" && computer === "scissors") || (play === "scissors" && computer === "paper") || (play === "paper" && computer === "rock")){
        youscroe = youscroe + 1;
        h1.innerText = "congragulations, You won";
        you.innerText = youscroe;
    }
    else {
        compscore = compscore + 1;
        h1.innerText = "try again,You lost";
        comp.innerText = compscore;
    }

}
function rematch(){
    youscroe=0;
    compscore=0;
    you.innerText = youscroe;
    comp.innerText = compscore;
    h1.innerText="Welcome";

}
