/* jshint esversion: 6 */

// grabs the play and pause buttons
const play = document.getElementById('play');
const pause = document.getElementById('pause');

// grabs the minutes and seconds on the clock
let min = document.getElementById('min');
let sec = document.getElementById('sec');

// adds event listeners to the buttons
play.addEventListener('click', setTimer);
play.addEventListener('click', startCountdown);
pause.addEventListener('click', stopCountdown);

// the timer needs to a global variable to be accessed by clearInterval
let timer;
let seconds;
let minutes;
let activeCycle = true;

function setTimer() {
  // grabs the input values
  minutes = document.getElementById('work').value;
  seconds = 0;

  // sets the starting time on the clock
  min.innerHTML = minutes.toString().padStart(2, '0');
  sec.innerHTML = seconds.toString().padStart(2, '0');
}

function stopCountdown() {
  clearInterval(timer);
  play.style.display = 'block';
  pause.style.display = 'none';
}

function startCountdown() {
  timer = setInterval(countdown, 1000);
  play.style.display = 'none';
  pause.style.display = 'block';
}

function countdown() {
  if (seconds != 0) {
    seconds--;
    sec.innerHTML = seconds.toString().padStart(2, '0');
  } else if (seconds == 0 && minutes != 0){
    seconds = 59;
    minutes--;
    sec.innerHTML = seconds.toString().padStart(2, '0');
    min.innerHTML = minutes.toString().padStart(2, '0');
  } else if (sec.innerHTML == 0 && min.innerHTML == 0) {
    activeCycle = !activeCycle;
    if (activeCycle) {
      minutes = document.getElementById('work').value;
      min.innerHTML = minutes.toString().padStart(2, '0');
    } else {
      minutes = document.getElementById('break').value;
      min.innerHTML = minutes.toString().padStart(2, '0');
    }
  }
}
