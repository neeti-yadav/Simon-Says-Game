let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highestScore = 0;

let h2 = document.querySelector("h2");

let startBtn = document.querySelector("#startBtn");
let restartBtn = document.querySelector("#restartBtn");

startBtn.addEventListener("click", startGame);

restartBtn.addEventListener("click", function () {
    reset();
    startGame();
});

function startGame() {
    if (started == false) {
        console.log("game is started");
        started = true;

        startBtn.style.display = "none";
        restartBtn.style.display = "inline-block";

        levelUp();
    }
}

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function (){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function (){
        btn.classList.remove("userflash");
    },250);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random() * btns.length);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);

    gameSeq.push(randomColor);

    gameFlash(randomBtn);
}

function checkAns(idx){

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else{

        let score = level;

        if(score > highestScore){
            highestScore = score;
        }

        h2.innerHTML = `Game Over! Your score was <b>${score}</b><br>Highest Score : <b>${highestScore}</b><br>Click Restart Game to play again.`;

        document.body.classList.add("game-over");

        setTimeout(function(){
        document.body.classList.remove("game-over");
         },400);

        reset();

        restartBtn.style.display = "inline-block";
    }
}

function btnPress() {

    if(!started) return;

    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");

for(let btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}