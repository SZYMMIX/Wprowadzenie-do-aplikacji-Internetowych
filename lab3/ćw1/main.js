const display = document.getElementById('time-text');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');

let seconds = 0;
let interval = null;

function updateDisplay() {
    const minutes = Math.floor(seconds/60);
    const remainingSeconds = seconds % 60;

    if (minutes === 0){
        display.innerText = `${remainingSeconds}s`;
    } 
    else {
        display.innerText = `${minutes}min ${remainingSeconds}s`;
    }
}

function startTimer(){
    if (interval){
        return
    }

    interval = setInterval(() => {
        seconds++;
        updateDisplay();
    }, 1000);
}

function stopTimer(){
    clearInterval(interval)
    interval = null
}

function resetTimer(){
    stopTimer()
    seconds = 0
    updateDisplay()
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();