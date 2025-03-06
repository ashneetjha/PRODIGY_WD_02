let timer;
let isRunning = false;
let seconds = 0, minutes = 0, hours = 0;
let lapCounter = 1;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapsList = document.getElementById("laps");

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        startStopBtn.textContent = "Start";
    } else {
        timer = setInterval(updateTime, 1000);
        startStopBtn.textContent = "Pause";
    }
    isRunning = !isRunning;
}

function updateTime() {
    seconds++;
    if (seconds == 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes == 60) {
        minutes = 0;
        hours++;
    }

    let formattedTime = 
        (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds);
    
    display.textContent = formattedTime;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    seconds = 0;
    minutes = 0;
    hours = 0;
    lapCounter = 1;
    display.textContent = "00:00:00";
    startStopBtn.textContent = "Start";
    lapsList.innerHTML = "";
}

function addLap() {
    if (isRunning) {
        let lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapCounter}: ${display.textContent}`;
        lapsList.appendChild(lapItem);
        lapCounter++;
    }
}

startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", addLap);
