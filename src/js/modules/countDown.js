const daysElement = document.getElementById('days')
const hoursElement = document.getElementById('hours')
const minutesElement = document.getElementById('minutes')
const secondsElement = document.getElementById('seconds')

const expirationDate = new Date(new Date().setDate(new Date().getDate() + 65)).getTime();

setInterval(() => {

  const now = new Date().getTime();

  const distance = expirationDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daysElement.innerHTML = days
  hoursElement.innerHTML = hours
  minutesElement.innerHTML = minutes
  secondsElement.innerHTML = seconds
}, 1000)
