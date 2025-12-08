const canvas = document.getElementById("bird-game");
const ctx = canvas.getContext("2d");

let frames = 0;
const DEGREE = Math.PI / 180;

const sprite = new Image();

const bgImg = new Image();
bgImg.src = "assets/Flappy Bird/background-day.png";

const fgImg = new Image();
fgImg.src = "assets/Flappy Bird/base.png";

const birdImg = new Image();
birdImg.src = "assets/Flappy Bird/yellowbird-midflap.png"; 

const pipeNorthImg = new Image();
pipeNorthImg.src = "assets/Flappy Bird/pipe-green.png"; 

const SCORE_S = new Audio();
SCORE_S.src = "assets/Sound Effects/point.wav";

const FLAP_S = new Audio();
FLAP_S.src = "assets/Sound Effects/wing.wav";

const HIT_S = new Audio();
HIT_S.src = "assets/Sound Effects/hit.wav";

const DIE_S = new Audio();
DIE_S.src = "assets/Sound Effects/die.wav";

const state = {
    current: 0,
    getReady: 0,
    game: 1,
    over: 2
}

document.addEventListener("keydown", function(evt) {
    if (evt.code === "Space") {
        handleInput();
    }
});

canvas.addEventListener("click", handleInput);

function handleInput() {
    switch(state.current) {
        case state.getReady:
            state.current = state.game;
            FLAP_S.play();
            break;
        case state.game:
            bird.flap();
            FLAP_S.play();
            break;
        case state.over:
            resetGame();
            state.current = state.getReady;
            break;
    }
}