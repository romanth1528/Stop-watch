let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let intervalId;

const display = document.getElementById("display");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

function formatTime(milliseconds) {
    const date = new Date(milliseconds);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");
    const ms = date.getUTCMilliseconds().toString().padStart(3, "0");
    return `${hours}:${minutes}:${seconds}.${ms}`;
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

function start() {
    if (!isRunning) {
        isRunning = true;
        startButton.textContent = "Pause";
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(function () {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
    } else {
        isRunning = false;
        startButton.textContent = "Resume";
        clearInterval(intervalId);
    }
}

function stop() {
    if (isRunning) {
        isRunning = false;
        startButton.textContent = "Resume";
        clearInterval(intervalId);
    }
}

function reset() {
    if (!isRunning) {
        elapsedTime = 0;
        updateDisplay();
    }
}

startButton.addEventListener("click", start);
stopButton.addEventListener("click", stop);
resetButton.addEventListener("click", reset);
