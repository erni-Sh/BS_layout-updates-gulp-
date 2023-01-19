window.onload = () => {
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
      e.isIntersecting ?
        e.target.classList.add('js_isVisible') :
        e.target.classList.remove('js_isVisible');
    })
  };

  const observer = new IntersectionObserver(startAnimation, options);

  targets.forEach((e) => {
    observer.observe(e);
  })

  // ---- SWIPER ------

  new Swiper('.ColLP__comments__cards', {
    centeredSlides: 'true',
    loop: 'true',
    slidesPerView: 'auto',
    spaceBetween: 20,
    direction: 'horizontal',
    mousewheel: true,
    autoplay: {
      delay: 8000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".ColLP__comments__cards__pagination",
      clickable: true,
    },
  });


};
