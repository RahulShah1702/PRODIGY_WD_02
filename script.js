let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCounter = 1;

const display = document.getElementById('display');
const lapsContainer = document.getElementById('laps');

function formatTime(time) {
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((time % 1000));
    return (
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds + ":" +
        (milliseconds < 100 ? "0" : "") + (milliseconds < 10 ? "0" : "") + milliseconds
    );
}

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10); 
        running = true;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.innerHTML = formatTime(difference);
    display.classList.add('animate');
    setTimeout(() => {
        display.classList.remove('animate');
    }, 1000);
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        running = false;
    }
}

function resetTimer() {
    pauseTimer();
    difference = 0;
    display.innerHTML = "00:00:00:000";
    lapsContainer.innerHTML = '';
    lapCounter = 1;
}

function lapTimer() {
    if (running) {
        const lapTime = formatTime(difference);
        const lapElement = document.createElement('div');
        lapElement.className = 'lap';
        lapElement.innerText = `Lap ${lapCounter++}: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
        
       
        setTimeout(() => {
            lapElement.classList.add('animate');
        }, 10);
        setTimeout(() => {
            lapElement.classList.remove('animate');
        }, 500);
    }
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', lapTimer);
