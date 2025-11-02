var boxes = document.querySelectorAll(".box");
var btn = document.querySelector("#reset-button");
//player X is first
var turnX = true;
const win_pattern = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
       // console.log("clicked");
        if (turnX) {
            box.innerText = "X";
            turnX = false;
        }
        else {
            box.innerText = "O";
            turnX = true;
        }
        box.disabled = true;
        checkwinner();//checks for the winner or search for the pattern
        count=count+1;//if winner not found it counts the disabled box
        console.log(count);
    });
});

var count=0;
var msg = document.querySelector(".msg");
var play = document.querySelector("#msgprint");


function checkwinner() {
    for (let pattern of win_pattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                show_win(pos1);
            }
        }
    };
    if(count===9){
        play.innerText = "The match is a Draw";
       //console.log(play.innerText);
       msg.style.display = "block";
    }
    //if all the boxs are disabled it print a message that the match is drawn
}

function show_win(winner) {
    play.innerText = `Conargulations winner ${winner}`;
    //console.log(play.innerText);
    msg.style.display = "block";
    disableboxes();
    count=0;
}

function disableboxes(){
    for(let box of boxes){
        box.disabled=true;
        turnX=true;
    }
}

btn.addEventListener("click", function (){
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
        msg.style.display="none";
    }
})//if this btn is clicked it enables all the boxes for playing the game again
    
