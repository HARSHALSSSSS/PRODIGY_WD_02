let startTime, elapsedTime = 0, timerInterval;
const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let formattedHH = hh.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");

    return `${formattedHH}:${formattedMM}:${formattedSS}`;
}

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        display.innerHTML = timeToString(elapsedTime);
    }, 1000);
    startStopButton.innerText = 'Pause';
}

function pauseStopwatch() {
    clearInterval(timerInterval);
    startStopButton.innerText = 'Start';
}

function resetStopwatch() {
    clearInterval(timerInterval);
    display.innerHTML = "00:00:00";
    elapsedTime = 0;
    startStopButton.innerText = 'Start';
    lapsContainer.innerHTML = '';
}

function recordLap() {
    const lapTime = timeToString(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.innerText = lapTime;
    lapsContainer.appendChild(lapItem);
}

startStopButton.addEventListener('click', function() {
    if (startStopButton.innerText === 'Start') {
        startStopwatch();
    } else {
        pauseStopwatch();
    }
});

resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);
