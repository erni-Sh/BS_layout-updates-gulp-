window.addEventListener('DOMContentLoaded', () => {
  // ------ SPOILER -----------
  const spoilers = document.getElementsByClassName('faq__spoiler');
  const titles = document.getElementsByClassName('faq__spoiler__title');
  [...titles].map(e => {
    e.addEventListener('click', () => {
      [...spoilers].map(e => e.classList.remove('faq__spoiler_isOpened'));
      e.parentElement.classList.add('faq__spoiler_isOpened')
    })
  })
});