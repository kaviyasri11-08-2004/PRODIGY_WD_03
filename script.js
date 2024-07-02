let startTime, updatedTime, difference;
let timerInterval;
let running = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const laps = document.getElementById('laps');

startStopBtn.addEventListener('click', function() {
    if (!running) {
        startTime = Date.now() - (difference || 0);
        timerInterval = setInterval(updateTime, 1000);
        startStopBtn.textContent = 'Stop';
        running = true;
    } else {
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
        running = false;
    }
});

resetBtn.addEventListener('click', function() {
    clearInterval(timerInterval);
    difference = 0;
    display.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    running = false;
    laps.innerHTML = '';
});

lapBtn.addEventListener('click', function() {
    if (running) {
        const lapTime = display.textContent;
        const li = document.createElement('li');
        li.textContent = lapTime;
        laps.appendChild(li);
    }
});

function updateTime() {
    updatedTime = Date.now();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    display.textContent = ${pad(hours)}:${pad(minutes)}:${pad(seconds)};
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}