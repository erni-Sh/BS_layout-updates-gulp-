window.onload = () => {
  const body = document.getElementsByTagName('body')[0];

  const getElByCl = (className) => {
    return document.getElementsByClassName(className)[0]
  }

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  };

  const lovelyHeader = {
    modal: getElByCl('landingModal'),
    modalInner: getElByCl('landingModal__inner'),
    opener: getElByCl('landingTop__arts__inner'),
    closer: getElByCl('landingModal'),

    modalText: getElByCl('landingModal__descr'),
    modalDiscount: getElByCl('landingModal__discount'),
    modalPromocode: getElByCl('landingModal__promocode__text'),
    modalPrmcCopy: getElByCl('landingModal__promocode'),
    modalPrmcAlert: getElByCl('landingModal__promocode__alertCopied'),

    text_promocode: [
      ['True love is&nbsp;like a&nbsp;great app, more tweaks the better', 'TRULOVE50', '50%'],
      ['When there is&nbsp;love, there is&nbsp;life and BuildStore', 'LBXOXO14', '14%'],
      ['Let’s&nbsp;sideload together. XOXO', 'LBXOXO14', '14%'],
      ['Love and BuildStore are the keys that open doors to&nbsp;happiness', 'LBXOXO1', '14%'],
      ['There is&nbsp;nothing better than a&nbsp;love unless it&nbsp;is&nbsp;a&nbsp;love with great apps', 'TRULOVE50', '50%'],
    ],

    init() {
      this.listeners();
    },

    listeners() {
      this.opener.addEventListener('click', this.openModal);
      this.closer.addEventListener('click', this.closeModal);
      this.modalInner.addEventListener('click', e => e.stopPropagation());
      this.modalPrmcCopy.addEventListener('click', () => this.copyToClipboard(lovelyHeader.modalPromocode.innerHTML))
    },

    openModal() {
      const randomNumber = randomIntFromInterval(0,4);
      lovelyHeader.modalText.innerHTML = lovelyHeader.text_promocode[randomNumber][0];
      lovelyHeader.modalDiscount.innerHTML = lovelyHeader.text_promocode[randomNumber][2];
      lovelyHeader.modalPromocode.innerHTML = lovelyHeader.text_promocode[randomNumber][1];
      lovelyHeader.modal.classList.add('landingModal_isVisible');
      window.scrollTo({top: 0});
      body.style.overflow = 'hidden';
    },

    closeModal() {
      lovelyHeader.modal.classList.remove('landingModal_isVisible');
      body.style.overflow = '';
    },

    copyToClipboard(text) {
      navigator.clipboard.writeText(text);
      lovelyHeader.modalPrmcAlert.classList.add('landingModal__promocode__alertCopied_visible');
      setTimeout(() => lovelyHeader.modalPrmcAlert.classList.remove('landingModal__promocode__alertCopied_visible'), 1000);
    },

  };

  lovelyHeader.init();
}