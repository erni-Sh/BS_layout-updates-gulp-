document.addEventListener('DOMContentLoaded', () => {
  Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
  };

  let deadline;
  try {
    deadline = JSON.parse(localStorage.getItem('storedTime'));
  } catch (e) {};

  if(!deadline) {
    deadline = new Date().addHours(24);
    localStorage.setItem('storedTime', JSON.stringify(deadline));
  }

  const [hoursElem, minutesElem] = document.querySelectorAll('.rGame__counter__item');

  const updateClock = () => {
    const {hours, minutes} = getTimeRemaining(deadline);
    hoursElem.innerHTML = hours;
    minutesElem.innerHTML = minutes;
  }

  setInterval(updateClock, 1000);

  function getTimeRemaining(endtime) {
    var time = Date.parse(endtime) - Date.parse(new Date());
    if (time < 0) {
      var seconds = 0;
      var minutes = 0;
      var hours = 0;
      var days = 0;
    } else {
      var seconds = Math.floor((time / 1000) % 60);
      var minutes = Math.floor((time / 1000 / 60) % 60);
      var hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      var days = Math.floor(time / (1000 * 60 * 60 * 24));
    }
    return {
      total: time,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

})