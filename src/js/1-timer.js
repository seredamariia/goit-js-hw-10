import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');
const button = document.querySelector('button');
const selector = document.querySelector('#datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < Date.now()) {
      button.disabled = true;
      iziToast.show({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    } else {
      button.disabled = false;
      userSelectedDate = selectedDate;
    }
  },
};

flatpickr(selector, options);

let userSelectedDate;
let intervalId;

button.disabled = true;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

button.addEventListener('click', () => {
  button.disabled = true;
  selector.disabled = true;

  intervalId = setInterval(() => {
    const remainingTime = userSelectedDate - Date.now();

    if (remainingTime <= 0) {
      clearInterval(intervalId);
    } else {
      const { days, hours, minutes, seconds } = convertMs(remainingTime);
      daysValue.textContent = addLeadingZero(days);
      hoursValue.textContent = addLeadingZero(hours);
      minutesValue.textContent = addLeadingZero(minutes);
      secondsValue.textContent = addLeadingZero(seconds);
    }
  }, 1000);
});

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
