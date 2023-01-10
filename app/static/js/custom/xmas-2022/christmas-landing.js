window.onload = () => {
  // ga("send", "event", "User", "user_page_load", "Christmas Landing");

  const MODAL = {
    body: document.getElementsByTagName('body')[0],
    modalWrapper: document.getElementsByClassName('xmasModal__wrapper')[0],
    modalInner: document.getElementsByClassName('xmasModal__inner')[0],

    alertCopied: document.getElementsByClassName('xmasModal__promocode__copied')[0],
    copyPromocode: document.getElementsByClassName('xmasModal__promocode')[0],
    promocodeTitle: document.getElementsByClassName('xmasModal__title')[0],
    promocodeValue: document.getElementsByClassName('xmasModal__promocode')[0].children[0],

    btnUsePromocode: document.getElementsByClassName('xmasModal__button')[0],

    promocodes: [
      ['40% OFF', 'NUTCRK40'],
      ['10% OFF', 'NAUGHTY10'],
      ['80% OFF', 'NICEPLAY80'],
      ['60% OFF', 'SLAYED60'],
      ['20% OFF', 'CHRM20'],
    ],

    init() {
      this.modalWrapper.addEventListener('click', this.closeModal);
      this.modalInner.addEventListener('click', e => e.stopPropagation());
    },
    setPromocode(section) {
      [ this.promocodeTitle.innerHTML, this.promocodeValue.innerHTML ] = this.promocodes[section];

      this.copyPromocode.addEventListener('click', () => {
        this.copyToClipboard(this.promocodes[section][1]);
      });

      this.btnUsePromocode.addEventListener('click', () => {
        this.copyToClipboard(this.promocodes[section][1]);
        setTimeout(() => window.open('https://builds.io/accounts/register', '_self'), 1500);
      });
    },
    openModal() {
      window.scrollTo({top: 0});
      MODAL.modalWrapper.classList.add('xmasModal__wrapper_visible');
      MODAL.body.style.overflow = 'hidden';
    },
    closeModal() {
      MODAL.modalWrapper.classList.remove('xmasModal__wrapper_visible');
      MODAL.body.style.overflow = '';
    },
    copyToClipboard(text) {
      navigator.clipboard.writeText(text);
      MODAL.alertCopied.classList.add('xmasModal__promocode__copied_visible');
      setTimeout(() => MODAL.alertCopied.classList.remove('xmasModal__promocode__copied_visible'), 1000);
    },
  }
  MODAL.init();

  const WHEEL = {
    rouletteWrapper: document.getElementsByClassName("landing-header__roulette")[0],
    drum: document.getElementsByClassName("landing-header__drum")[0].children[0],
    runners: document.getElementsByClassName("js-spin-wheel"),
    curRotate: 0,
    timer: null,

    init() {
      this.spin(this.curRotate);

      [...this.runners].forEach(e => {
        e.style.opacity = '1';
        e.addEventListener('click', () => this.spinWheel())
      });
    },

    spinWheel() {
      clearTimeout(this.timer);
      // window.scrollTo({top: 0});

      const random = Math.floor(Math.random() * 360) + 4000;
      const newRotate = this.curRotate + random;
      const section = Math.floor((newRotate - 21) % 360 / 72); // 21 - shift, 72 - one of 5 sections

      this.spin(newRotate)
      this.curRotate = newRotate;
      this.rouletteWrapper.classList.add('landing-header__roulette_animated');

      this.timer = setTimeout(() => {
        this.rouletteWrapper.classList.remove('landing-header__roulette_animated');
        MODAL.setPromocode(section);
        MODAL.openModal();
      }, 13000);
    },

    spin(deg) {
      WHEEL.drum.style.transform = `rotate(${deg}deg)`;
    },
  }
  WHEEL.init();
};