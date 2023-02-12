window.onload = () => {
  const lovelyHeader = {
    modal: document.getElementsByClassName('landingModal')[0],
    modalInner: document.getElementsByClassName('landingModal__inner')[0],
    opener: document.getElementsByClassName('landingTop__arts__inner')[0],
    closer: document.getElementsByClassName('landingModal')[0],

    init() {
      this.listeners();
    },

    listeners() {
      this.opener.addEventListener('click', this.openModal);
      this.closer.addEventListener('click', this.closeModal);
      this.modalInner.addEventListener('click', e => e.stopPropagation());
    },

    openModal() {
      lovelyHeader.modal.classList.add('landingModal_isVisible');
    },

    closeModal() {
      lovelyHeader.modal.classList.remove('landingModal_isVisible');
    }
  };

  const lovelyModal = {
    promocode: document.getElementsByClassName('landingModal__promocode')[0],
    alert: document.getElementsByClassName('landingModal__promocode__alertCopied')[0],

    init()  {
      this.promocode.addEventListener('click', () => {
        this.copyToClipboard('TRULOVE50');
      })
    },

    copyToClipboard(text) {
      navigator.clipboard.writeText(text);
      lovelyModal.alert.classList.add('landingModal__promocode__alertCopied_visible');
      setTimeout(() => lovelyModal.alert.classList.remove('landingModal__promocode__alertCopied_visible'), 1000);
    },
  }

  lovelyHeader.init();
  lovelyModal.init();
}