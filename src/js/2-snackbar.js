import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';

const delayInput = document.querySelector('[name="delay"]');
const form = document.querySelector('form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const stateInput = document.querySelector('[name="state"]:checked');

  const delay = parseInt(delayInput.value, 10);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stateInput.value === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
});
