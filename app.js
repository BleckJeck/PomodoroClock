/* jshint esversion: 6 */

// grabs the play and pause buttons
const play = document.getElementById('play');
const pause = document.getElementById('pause');

// grabs the outer circle for colour fill animation
const outerCircle = document.getElementById('outer');

// grabs the minutes and seconds on the clock
let min = document.getElementById('min');
let sec = document.getElementById('sec');

// adds event listeners to the buttons
play.addEventListener('click', setTimer);
pause.addEventListener('click', stopCountdown);

// the timer needs to a global variable to be accessed by clearInterval
let timer;
let colourFill;

let minutes;
let seconds;

let step;
let deg;

let activeCycle;

function setTimer() {
  // grabs the input values
  minutes = document.getElementById('work').value;
  seconds = 0;

  step = minutes * 60 / 360;
  deg = 0;

  activeCycle = true;

  // sets the starting time on the clock
  min.innerHTML = minutes.toString().padStart(2, '0');
  sec.innerHTML = seconds.toString().padStart(2, '0');

  outer.style.backgroundImage = 'linear-gradient(' + (deg+90) +'deg, transparent 50%, #123776 50%), linear-gradient(90deg, #123776 50%, #4F8438 50%)';
  deg++;

  startCountdown();
}

function startCountdown() {
  timer = setInterval(countdown, 1000);
  colourFill = setInterval(fillArea, step*1000);
  play.style.display = 'none';
  pause.style.display = 'block';
  document.getElementById('work').setAttribute("disabled","disabled");
  document.getElementById('break').setAttribute("disabled","disabled");
}

function stopCountdown() {
  clearInterval(timer);
  clearInterval(colourFill);
  play.style.display = 'block';
  pause.style.display = 'none';
  document.getElementById('work').removeAttribute("disabled");
  document.getElementById('break').removeAttribute("disabled");
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
    clearInterval(timer);
    clearInterval(colourFill);
    activeCycle = !activeCycle;
    if (activeCycle) {
      minutes = document.getElementById('work').value;
      min.innerHTML = minutes.toString().padStart(2, '0');
    } else {
      minutes = document.getElementById('break').value;
      min.innerHTML = minutes.toString().padStart(2, '0');
    }
    step = minutes * 60 / 360;
    deg = 0;
    timer = setInterval(countdown, 1000);
    colourFill = setInterval(fillArea, step*1000);
  }
}

function fillArea() {
  if (activeCycle) {
    if (deg > 360) {
      clearInterval(colourFill);
      deg = 0;
    }
    else if (deg <= 180) {
      outer.style.backgroundImage = 'linear-gradient(' + (deg+90) +'deg, transparent 50%, #123776 50%), linear-gradient(90deg, #123776 50%, #4F8438 50%)';
      deg++;
    } else {
      outer.style.backgroundImage = 'linear-gradient(' + (deg+90) +'deg, #4F8438 50%, transparent 50%), linear-gradient(90deg, #123776 50%, #4F8438 50%)';
      deg++;
    }
  } else {
    if (deg > 360) {
      clearInterval(colourFill);
      deg = 0;
    }
    else if (deg <= 180) {
      outer.style.backgroundImage = 'linear-gradient(' + (deg+90) +'deg, transparent 50%, #123776 50%), linear-gradient(90deg, #123776 50%, #BE1A1B 50%)';
      deg++;
    } else {
      outer.style.backgroundImage = 'linear-gradient(' + (deg+90) +'deg, #BE1A1B 50%, transparent 50%), linear-gradient(90deg, #123776 50%, #BE1A1B 50%)';
      deg++;
    }
  }
}
