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
      if(e.isIntersecting) {
        e.target.dataset.src && (e.target.src = e.target.dataset.src);
        e.target.classList.add('js_isVisible')
      }
      // e.target.classList.remove('js_isVisible');
    })
  };

  const observer = new IntersectionObserver(startAnimation, options);

  targets.forEach((e) => {
    observer.observe(e);
  })

  // ---- GA SENDER ------
  // let eventCategory = window.location.pathname.slice(1, -1).replaceAll('/', '_');
  // sendLegacyGAEventWithGtag(eventCategory, 'user_page_load'); // page is loaded

  // scroll events
  // const sendScrollAnalytics = (entries) => {
  //   entries.forEach((e) => {
  //     if (e.isIntersecting) {
  //       const timestamp = getTimestamp();
  //       const scrollDepth = e.target.dataset.scrolldepth;
  //
  //       if (scrollDepth !== 0) {
  //         sendLegacyGAEventWithGtag(eventCategory, 'user_scroll_page', {
  //           scroll_depth: scrollDepth
  //         });
  //         e.target.dataset.scrolldepth = 0;
  //       }
  //     }
  //   })
  // };
  //
  // const GAObserver = new IntersectionObserver(sendScrollAnalytics);
  //
  // [...document.getElementsByClassName('js-gaScrollEvent')].forEach(e => {
  //   GAObserver.observe(e);
  // });

  // tap events
  // [...document.getElementsByClassName('js-gaEvent')].forEach(e => {
  //   const eventName = e.dataset.eventName;
  //   const appName = e.dataset.appName;
  //
  //   e.addEventListener('click', () => {
  //     if (appName) {
  //       sendLegacyGAEventWithGtag(eventCategory, eventName, {
  //         application: appName
  //       });
  //     } else {
  //       sendLegacyGAEventWithGtag(eventCategory, eventName);
  //     }
  //   })
  // });
});