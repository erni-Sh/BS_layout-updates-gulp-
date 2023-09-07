window.addEventListener('DOMContentLoaded', () => {
  // ------ FIX PORT VIEW -----
  function calculateVh() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  }
  calculateVh();

  window.addEventListener('resize', calculateVh);
  window.addEventListener('orientationchange', calculateVh);

  // ------ on Screen hook -----
  const targets = document.querySelectorAll('.js-observer');
  const options = {
    rootMargin: '0px',
    threshold: 0.5,
  };

  const startAnimation = (entries, observer) => {
    entries.forEach((e) => {
      e.target.dataset.src && (e.target.src = e.target.dataset.src);
      e.isIntersecting ?
        e.target.classList.add('js_isVisible') : undefined
        // e.target.classList.remove('js_isVisible');
    })
  };

  const observer = new IntersectionObserver(startAnimation, options);

  targets.forEach((e) => {
    observer.observe(e);
  })

  console.log('i am here!');
});