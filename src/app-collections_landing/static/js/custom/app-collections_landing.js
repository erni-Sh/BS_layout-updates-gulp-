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
      e.isIntersecting ?
        e.target.classList.add('js_isVisible') :
        e.target.classList.remove('js_isVisible');
    })
  };

  const observer = new IntersectionObserver(startAnimation, options);

  targets.forEach((e) => {
    observer.observe(e);
  })

  // ---- ALERT ----
  const alert = {
    listener: document.getElementsByClassName('ColLP__promocode__button')[0],
    dom: document.getElementsByClassName('ColLP__promocode__alert')[0],
    promocode: document.querySelectorAll('.ColLP__promocode__desk span')[1].innerHTML,
    timer: null,

    init() {
      this.listener.addEventListener('click', () => {
        navigator.clipboard.writeText(alert.promocode);
        alert.dom.classList.add('ColLP__promocode__alert_isVisible');
        alert.timer = !alert.timer ? setTimeout(() => {
          alert.dom.classList.remove('ColLP__promocode__alert_isVisible');
          alert.timer = null;
        }, 4000) : alert.timer;
      })
    }
  };
  alert.init();

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

  // ---- GA SENDER ------
  const eventCat = window.location.pathname.slice(1, -1).replaceAll('/', '_');
  ga('send', 'event', eventCat, 'user_page_load', `{"timestamp":"${getTimestamp()}"}`); // page is loaded

  // scroll events
  const sendScrollAnalitics = (entries) => {
    entries.forEach((e) => {
      if(e.isIntersecting) {
        const timestamp = getTimestamp();
        const scrollDepth = e.target.dataset.scrolldepth;
        if(scrollDepth != 0) {
          ga('send', 'event', eventCat, 'user_scroll_page',
            `{"timestamp":"${timestamp}", "scroll_depth":"${scrollDepth}"}`
          );
          e.target.dataset.scrolldepth = 0;
        };
      }
    })
  };

  const GAobserver = new IntersectionObserver(sendScrollAnalitics);

  [...document.getElementsByClassName('js-gaScrollEvent')].forEach(e => {
    GAobserver.observe(e);
  });

  // tap events
  [...document.getElementsByClassName('js-gaEvent')].forEach(e => {
    const eventName = e.dataset.eventName;
    const appName = e.dataset.appName;
    e.addEventListener('click', () => {
      if(appName) {
        ga('send', 'event', eventCat, eventName, `{"timestamp":"${getTimestamp()}", "application":"${appName}"}`)
      } else {
        ga('send', 'event', eventCat, eventName, `{"timestamp":"${getTimestamp()}"}`)
      }
    })
  });
});
