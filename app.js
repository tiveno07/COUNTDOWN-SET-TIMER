let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds) {
  // first clear any existing timer
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - now) / 1000);
    if (secondsLeft <= 0) {
      clearInterval(countdown);
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const mins = Math.floor(seconds / 60);
  const remainedSeconds = seconds % 60;
  const display = `${mins}:${
    remainedSeconds < 10 ? `0` : ""
  }${remainedSeconds}`;
  timerDisplay.textContent = display;
  document.title = display;
}

const displayEndTime = (timeStamp) => {
  const end = new Date(timeStamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const mins = end.getMinutes();
  endTime.textContent = `Be Back At ${adjustedHour}:${
    mins < 10 ? "0" : ""
  }${mins}`;
};

const startsTimer = (e) => {
  const seconds = parseInt(e.currentTarget.dataset.time);
  timer(seconds);
};

buttons.forEach((btns) => btns.addEventListener("click", startsTimer));

document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60);
  this.reset();
});
