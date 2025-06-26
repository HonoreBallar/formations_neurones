let start = document.querySelector("#start");
let stopButton = document.querySelector("#stop");
let reset = document.querySelector("#reset");
let timer = document.querySelector("#timer");
let seconde = 1 * 60;
let timerInterval = null;

const convert = ()=>{
    const minutes = Math.floor(seconde / 60);
    const sec = seconde % 60;
    timer.textContent = `${String(minutes).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

function startTimer() {
    if (timerInterval) return;
  
    timerInterval = setInterval(() => {
      if (seconde > 0) {
        seconde--;
        convert();
      } else {
        clearInterval(timerInterval);
        timerInterval = null;

        let endSound = new Audio('son.wav');
        endSound.play();
        
        alert('Temps écoulé ! 🎉, à bientôt');


        seconde = 1 * 60;
        convert();
      }
    }, 1000);
  }
  
  function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  
  function resetTimer() {
    stopTimer();
    seconde = 1 * 60;
    convert();
  }



start.addEventListener('click', startTimer);

stopButton.addEventListener('click', stopTimer);

reset.addEventListener('click', resetTimer);

convert();