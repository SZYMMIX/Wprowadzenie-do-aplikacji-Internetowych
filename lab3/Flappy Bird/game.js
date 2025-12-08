const canvas = document.getElementById("bird-game");
const ctx = canvas.getContext("2d");

let frames = 0;
let lastTime = 0;
const targetFPS = 60; 
const frameDelay = 1000 / targetFPS; 

const DEGREE = Math.PI / 180;

const bgImg = new Image();
bgImg.src = "assets/Flappy Bird/background-day.png";

const fgImg = new Image();
fgImg.src = "assets/Flappy Bird/base.png";

const birdImages = [new Image(), new Image(), new Image()];
birdImages[0].src = "assets/Flappy Bird/yellowbird-downflap.png";
birdImages[1].src = "assets/Flappy Bird/yellowbird-midflap.png";
birdImages[2].src = "assets/Flappy Bird/yellowbird-upflap.png";

const pipeNorthImg = new Image();
pipeNorthImg.src = "assets/Flappy Bird/pipe-green.png";

const pipeSouthImg = new Image();
pipeSouthImg.src = "assets/Flappy Bird/pipe-green.png";

const getReadyImg = new Image();
getReadyImg.src = "assets/UI/message.png";

const gameOverImg = new Image();
gameOverImg.src = "assets/UI/gameover.png";

const scoreImages = [];
for(let i = 0; i < 10; i++) {
    scoreImages[i] = new Image();
    scoreImages[i].src = `assets/UI/Numbers/${i}.png`;
}

const SOUNDS = {
    SCORE: new Audio("assets/sounds/point.wav"),
    FLAP: new Audio("assets/sounds/wing.wav"),
    HIT: new Audio("assets/sounds/hit.wav"),
    DIE: new Audio("assets/sounds/die.wav"),
    SWOOSH: new Audio("assets/sounds/swoosh.wav")
};

function playSound(sound) {
    if (!sound) return;
    try {
        sound.currentTime = 0;
        sound.play().catch(e => {});
    } catch (e) {}
}

const state = {
    current: 0,
    getReady: 0,
    game: 1,
    falling: 2,
    newBest: 3,
    over: 4,
    scoreboard: 5
}

let spinTimer = 0;
const SPIN_DURATION = 180;

const UI = {
    btnW: 80, btnH: 28,
    okBtn: {x:0, y:0, w:80, h:28},
    rankBtn: {x:0, y:0, w:80, h:28},
    backBtn: {x:0, y:0, w:80, h:28}
};

const boost = {
    active: false,
    x: 0, y: 0, radius: 15, timer: 0,
    
    spawn: function() {
        if (!this.active && frames % 500 === 0 && state.current === state.game) {
            this.active = true;
            this.x = canvas.width;
            this.y = Math.random() * (canvas.height - fg.h - 100) + 50;
        }
    },
    update: function() {
        if (this.timer > 0) this.timer--;
        if (this.active && state.current === state.game) {
            this.x -= 2.3;
            let dx = bird.x - this.x;
            let dy = bird.y - this.y;
            let distance = Math.sqrt(dx*dx + dy*dy);

            if (distance < bird.radius + this.radius) {
                this.active = false;
                this.timer = 300; 
                playSound(SOUNDS.SCORE); 
            }
            if (this.x + this.radius < 0) this.active = false;
        }
    },
    draw: function() {
        if (this.active && state.current === state.game) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 0, 0, 0.7)"; 
            ctx.fill();
            ctx.strokeStyle = "#FFF";
            ctx.lineWidth = 2;
            ctx.stroke();
            
            ctx.fillStyle = "#FFF";
            ctx.font = "bold 16px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("B", this.x, this.y);
            ctx.textAlign = "left"; 
            ctx.textBaseline = "alphabetic";
        }
        if (this.timer > 0 && state.current === state.game) {
            ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
            ctx.fillRect(10, 10, (this.timer / 300) * 100, 10);
            ctx.strokeStyle = "#000";
            ctx.strokeRect(10, 10, 100, 10);
            ctx.fillStyle = "#FFF";
            ctx.font = "10px Arial";
            ctx.fillText("GHOST MODE", 15, 32);
        }
    },
    reset: function() {
        this.active = false;
        this.timer = 0;
    }
}

function getMousePos(evt) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
        x: (evt.clientX - rect.left) * scaleX,
        y: (evt.clientY - rect.top) * scaleY
    };
}

function handleInput(evt) {
    if (evt.type === 'keydown') {
        if (state.current == state.getReady) {
            state.current = state.game;
            playSound(SOUNDS.SWOOSH);
        } else if (state.current == state.game) {
            bird.flap();
            playSound(SOUNDS.FLAP);
        }
        return;
    }

    const pos = getMousePos(evt);

    switch(state.current) {
        case state.getReady:
            state.current = state.game;
            playSound(SOUNDS.SWOOSH);
            break;
        case state.game:
            bird.flap();
            playSound(SOUNDS.FLAP);
            break;
        case state.over:
            if (pos.x >= UI.okBtn.x && pos.x <= UI.okBtn.x + UI.okBtn.w &&
                pos.y >= UI.okBtn.y && pos.y <= UI.okBtn.y + UI.okBtn.h) {
                resetGame();
                playSound(SOUNDS.SWOOSH);
                state.current = state.getReady;
            } else if (pos.x >= UI.rankBtn.x && pos.x <= UI.rankBtn.x + UI.rankBtn.w &&
                       pos.y >= UI.rankBtn.y && pos.y <= UI.rankBtn.y + UI.rankBtn.h) {
                state.current = state.scoreboard;
                playSound(SOUNDS.SWOOSH);
            }
            break;
        case state.scoreboard:
            if (pos.x >= UI.backBtn.x && pos.x <= UI.backBtn.x + UI.backBtn.w &&
                pos.y >= UI.backBtn.y && pos.y <= UI.backBtn.y + UI.backBtn.h) {
                state.current = state.over;
                playSound(SOUNDS.SWOOSH);
            }
            break;
    }
}

document.addEventListener("keydown", (evt) => { if (evt.code === "Space") handleInput(evt); });
canvas.addEventListener("click", (evt) => { handleInput(evt); });

const bg = {
    draw: function() { ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height); }
}

const fg = {
    h: 112, x: 0, dx: 2.3,
    draw: function() {
        ctx.drawImage(fgImg, this.x, canvas.height - this.h, canvas.width, this.h);
        ctx.drawImage(fgImg, this.x + canvas.width, canvas.height - this.h, canvas.width, this.h);
    },
    update: function() {
        if (state.current == state.game) this.x = (this.x - this.dx) % (canvas.width / 2);
    }
}

const bird = {
    x: 50, y: 150, w: 34, h: 24, radius: 12,
    gravity: 0.25, jump: 4.6, speed: 0, rotation: 0,
    
    draw: function() {
        let birdC = birdImages[1]; 
        
        if (state.current == state.getReady || state.current == state.game) {
            let period = state.current == state.getReady ? 10 : 5;
            let sequence = [0, 1, 2, 1];
            let index = sequence[Math.floor(frames / period) % 4];
            birdC = birdImages[index];
        } 
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        if (boost.timer > 0) ctx.globalAlpha = 0.5;
        
        ctx.drawImage(birdC, -this.w/2, -this.h/2, this.w, this.h);
        
        ctx.globalAlpha = 1.0;
        ctx.restore();
    },
    
    flap: function() {
        this.speed = -this.jump;
        this.rotation = -25 * DEGREE;
    },
    
    update: function() {
        if (state.current == state.getReady) {
            this.y = 150 - 10 * Math.cos(frames/15);
            this.rotation = 0;
            return;
        }

        if (state.current == state.game || state.current == state.falling) {
            this.speed += this.gravity;
            this.y += this.speed;

            if (this.speed < 2.5) {
                if(state.current != state.falling) this.rotation = -25 * DEGREE;
            } else {
                this.rotation += 4 * DEGREE;
                if (this.rotation > 90 * DEGREE) this.rotation = 90 * DEGREE;
            }

            if (this.y + this.h/2 >= canvas.height - fg.h) {
                this.y = canvas.height - fg.h - this.h/2;
                if (state.current == state.game || state.current == state.falling) {
                    finalizeGameOver();
                }
            }
        }
        
        if (state.current == state.newBest) {
            this.x = canvas.width / 2;
            this.y = canvas.height / 2 - 50;
            this.rotation += 15 * DEGREE; 
            spinTimer++;
            if (spinTimer >= SPIN_DURATION) state.current = state.over;
        }
    },
    
    reset: function() {
        this.speed = 0; this.rotation = 0; this.y = 150; this.x = 50;
    }
}

const pipes = {
    position: [], w: 53, h: 400, gap: 100, dx: 2.3,
    
    draw: function() {
        for(let i = 0; i < this.position.length; i++) {
            let p = this.position[i];
            let topY = p.y;
            let bottomY = p.y + this.h + this.gap;
            
            ctx.save();
            ctx.translate(p.x + this.w/2, topY + this.h/2); 
            ctx.rotate(Math.PI);
            ctx.drawImage(pipeNorthImg, -this.w/2, -this.h/2, this.w, this.h);
            ctx.restore();
            ctx.drawImage(pipeSouthImg, p.x, bottomY, this.w, this.h);
        }
    },
    update: function() {
        if(state.current !== state.game) return;
        
        if(frames % 90 == 0) {
            this.position.push({ x: canvas.width, y: -150 * (Math.random() + 1), passed: false });
        }
        
        for(let i = 0; i < this.position.length; i++) {
            let p = this.position[i];
            p.x -= this.dx;
            
            let bottomPipeY = p.y + this.h + this.gap;
            
            if (boost.timer <= 0) {
                if(bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w) {
                    if(bird.y - bird.radius < p.y + this.h || bird.y + bird.radius > bottomPipeY) {
                        triggerFall(); 
                    }
                }
            }
            
            if((p.x + this.w < bird.x) && !p.passed) {
                score.value += 1;
                p.passed = true;
                playSound(SOUNDS.SCORE);
            }
            if(p.x + this.w <= 0) this.position.shift();
        }
    },
    reset: function() { this.position = []; }
}

const score = {
    best: parseInt(localStorage.getItem("flappy_best")) || 0,
    value: 0,
    draw: function() {
        if (state.current == state.game || state.current == state.falling) {
            this.drawBigNumbers(this.value, canvas.width/2, 50, true);
        }
    },
    drawBigNumbers: function(val, x, y, centered = false) {
        let s = val.toString();
        let w = 24; 
        let totalW = s.length * w;
        let startX = centered ? x - totalW/2 : x;
        for(let i=0; i<s.length; i++) {
            let digit = s[i];
            if(scoreImages[digit]) ctx.drawImage(scoreImages[digit], startX + (i*w), y);
        }
    },
    reset: function() { this.value = 0; }
}

function triggerFall() {
    state.current = state.falling;
    playSound(SOUNDS.HIT);
}

function finalizeGameOver() {
    playSound(SOUNDS.DIE);
    if (score.value > score.best) {
        score.best = score.value;
        localStorage.setItem("flappy_best", score.best);
        state.current = state.newBest;
        spinTimer = 0;
    } else {
        state.current = state.over;
    }
    let top5 = JSON.parse(localStorage.getItem("flappy_top5")) || [];
    top5.push(score.value);
    top5.sort((a, b) => b - a);
    top5 = top5.slice(0, 5);
    localStorage.setItem("flappy_top5", JSON.stringify(top5));
}

function drawButton(text, x, y, w, h) {
    ctx.fillStyle = "#E76316"; 
    ctx.fillRect(x, y + 2, w, h); 
    ctx.fillStyle = "#E76316"; 
    ctx.fillRect(x, y, w, h);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#FFF";
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = "#FFF";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x + w/2, y + h/2);
    ctx.textAlign = "left"; 
    ctx.textBaseline = "alphabetic";
}

function drawScoreBoard() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.drawImage(gameOverImg, centerX - 96, centerY - 160);

    const boardW = 260;
    const boardH = 150;
    const boardX = centerX - boardW / 2;
    const boardY = centerY - 70;

    ctx.fillStyle = "#DED895";
    ctx.fillRect(boardX, boardY, boardW, boardH);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#E98D37";
    ctx.strokeRect(boardX + 2, boardY + 2, boardW - 4, boardH - 4);
    ctx.strokeStyle = "#543847";
    ctx.strokeRect(boardX, boardY, boardW, boardH);

    ctx.fillStyle = "#E57A44";
    ctx.font = "bold 14px Arial"; 
    ctx.fillText("MEDAL", boardX + 30, boardY + 30);
    ctx.fillText("SCORE", boardX + 150, boardY + 30);
    ctx.fillText("BEST", boardX + 150, boardY + 80);

    score.drawBigNumbers(score.value, boardX + 230 - (score.value.toString().length * 15), boardY + 35); 
    score.drawBigNumbers(score.best, boardX + 230 - (score.best.toString().length * 15), boardY + 85);

    const medalX = boardX + 53;
    const medalY = boardY + 75;
    const medalR = 25;

    ctx.beginPath();
    ctx.arc(medalX, medalY, medalR, 0, Math.PI * 2);
    ctx.fillStyle = "#938576"; 
    if (score.value >= 10) ctx.fillStyle = "#D7D7D7"; 
    if (score.value >= 20) ctx.fillStyle = "#E6B847"; 
    if (score.value >= 40) ctx.fillStyle = "#E2F0F9"; 
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#543847";
    ctx.stroke();

    const btnY = boardY + boardH + 15;
    const gap = 15;
    UI.okBtn.x = centerX - UI.btnW - gap/2;
    UI.okBtn.y = btnY;
    UI.rankBtn.x = centerX + gap/2;
    UI.rankBtn.y = btnY;
    
    drawButton("PLAY", UI.okBtn.x, UI.okBtn.y, UI.okBtn.w, UI.okBtn.h);
    drawButton("RANK", UI.rankBtn.x, UI.rankBtn.y, UI.rankBtn.w, UI.rankBtn.h);
}

function drawHighScoresList() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    const panelW = 260;
    const panelH = 280;
    const panelX = centerX - panelW/2;
    const panelY = centerY - panelH/2;
    
    ctx.fillStyle = "#DED895";
    ctx.fillRect(panelX, panelY, panelW, panelH);
    ctx.strokeStyle = "#543847";
    ctx.lineWidth = 3;
    ctx.strokeRect(panelX, panelY, panelW, panelH);
    
    ctx.fillStyle = "#E57A44";
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "center";
    ctx.fillText("TOP 5 SCORES", centerX, panelY + 40);
    
    const top5 = JSON.parse(localStorage.getItem("flappy_top5")) || [];
    ctx.fillStyle = "#543847";
    ctx.font = "bold 20px Arial";
    
    for(let i=0; i<5; i++) {
        let scoreVal = top5[i] !== undefined ? top5[i] : "-";
        ctx.fillText(`${i+1}.   ${scoreVal}`, centerX, panelY + 90 + (i*30));
    }
    
    UI.backBtn.x = centerX - UI.btnW/2;
    UI.backBtn.y = panelY + panelH - 50;
    ctx.textAlign = "left"; 
    
    drawButton("BACK", UI.backBtn.x, UI.backBtn.y, UI.backBtn.w, UI.backBtn.h);
}

function resetGame() {
    bird.reset();
    pipes.reset();
    score.reset();
    boost.reset();
    frames = 0;
    spinTimer = 0;
}

function update() {
    boost.spawn();
    boost.update();
    bird.update();
    fg.update();
    pipes.update();
}

function draw() {
    bg.draw();
    pipes.draw();
    boost.draw();
    fg.draw();
    bird.draw();
    
    if (state.current == state.getReady) {
        ctx.drawImage(getReadyImg, canvas.width/2 - 92, 100);
    } 
    else if (state.current == state.over) {
        drawScoreBoard();
    } 
    else if (state.current == state.game || state.current == state.falling) {
        score.draw();
    }
    else if (state.current == state.scoreboard) {
        drawHighScoresList();
    }
}

function loop(timestamp) {
    const deltaTime = timestamp - lastTime;
    if (deltaTime >= frameDelay) {
        update();
        draw();
        frames++;
        lastTime = timestamp - (deltaTime % frameDelay);
    }
    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);