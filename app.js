let gameSeq = [];
let userseq = [];

let started = false;
let level = 0;

let highscore = 0;

let btns = ["yellow","red","purple","green"];

let head2 = document.querySelector("h2");


document.addEventListener("keypress", function(){
    if(started == false){
        console.log("game started");
        started = true;
    }

    levelUp();
});

function gameFlash(btn){
    btn.classList.add("flash");

    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");

    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelUp(){
    userseq = [];
    level++;
    head2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    gameFlash(randbtn);
    gameSeq.push(randColor);

    if(level>highscore){
        highscore=level;
    }
}

function checkAns(idx){
    if(userseq[idx] === gameSeq[idx]){
        if(userseq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        head2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start <br> Your highscore is ${highscore}`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
}


function btnPress(){
    let btn1 = this;
    userFlash(btn1);

    let userColor = btn1.getAttribute("id");
    userseq.push(userColor);

    checkAns(userseq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userseq = [];
    level = 0;
}

