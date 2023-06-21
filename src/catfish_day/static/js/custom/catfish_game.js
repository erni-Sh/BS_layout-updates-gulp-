window.addEventListener('DOMContentLoaded', () => {
  const body = document.getElementsByTagName('body')[0];
  let timer;

  const gameCatfish = {
    clicker:        getElByCl('catfishTop__clicker'),
    weight:         getElByCl('catfishTop__weight'),
    catfishBody:    getElByCl('catfishTop__body'),
    reactions:      getElByCl('catfishTop__reactions'),
    notify:         getElByCl('catfishTop__notify'),

    header:         getElByCl('catfishTop'),
    btnRestart:     getElByCl('catfishTop__button_restart'),
    btnGetPromo:    getElByCl('catfishTop__button_getPromo'),
    codeOnBtn:      getElByCl('catfishTop__button__promocode'),
    promocodes: [
      ['TRULOVE10', '10%'],
      ['LBXOXO14', '20%'],
      ['LBXOXO14', '30%'],
      ['LBXOXO1SS', '40%'],
      ['TRULOVE50', '50%'],
    ],

    modal:          getElByCl('landingModal'),
    // opener:         getElByCl('catfishTop__button'),
    closer:         getElByCl('landingModal__close'),
    modalCount:     getElByCl('landingModal__totalCount').children[0],
    discount:       getElByCl('landingModal__discount'),
    modalPromocode: getElByCl('landingModal__promocode__text'),
    modalPrmcCopy:  getElByCl('landingModal__promocode'),
    modalPrmcAlert: getElByCl('landingModal__promocode__alertCopied'),

    countWeight: 1, // init
    maxWeight: 265, //
    countWidth: 124, // init
    maxWidth: 681,
    clickCounter: 2,

    init() {
      this.restartGame();

      this.clicker.addEventListener('click', () => {
        this.animateFlashScreen();

        !this.clickCounter
          ? this.countWeight < this.maxWeight ? this.growUp() : this.swimAway()
          : this.clickCounter--;
      });
      this.modalPrmcCopy.addEventListener('click', () =>
        this.copyToClipboard(this.modalPromocode.innerHTML));

      this.btnRestart.addEventListener('click', () => this.restartGame());
      this.btnGetPromo.addEventListener('click', this.openModal);
      this.closer.addEventListener('click', this.closeModal);
    },

    restartGame() {
      this.setWeight(1); // init
      this.setWidth(124); // init
      this.setRandomClickCount();
      this.checkPromocode();
      timer = setInterval(() => this.growDown(), 400);
      this.btnRestart.classList.add('catfishTop__button_isHidden');
      this.btnGetPromo.classList.remove('catfishTop__button_isHidden');
      this.clicker.classList.remove('catfishTop__clicker_isBlocked');
      this.notify.classList.remove('isVisible');
      this.catfishBody.classList.remove('catfishTop__body_isSwimAway');
    },

    growUp() {
      this.checkPromocode();

      const randomGrowUpSize = getRandomInt(13, 20);

      this.animateUpdateWeight(randomGrowUpSize);

      this.setWeight(this.countWeight + randomGrowUpSize);
      this.setWidth(this.countWidth + this.getWeightWidth() * randomGrowUpSize);
      this.showReaction();
      this.setRandomClickCount();
    },

    growDown() {
      const growDownSize = 1;
      if(this.countWeight <= growDownSize) return;

      this.checkPromocode();

      this.setWeight(this.countWeight - growDownSize);
      this.setWidth(this.countWidth - this.getWeightWidth() * growDownSize);
    },

    showReaction() {
      const random = getRandomInt(0,4);
      if(!this.reactions.children[random]) return;
      this.reactions.children[random].classList.remove('isVisible');
      setTimeout(() => this.reactions.children[random].classList.add('isVisible'), 1);
    },

    checkPromocode() {
      let indexPromocode = Math.floor(this.countWeight/(this.maxWeight + 20) * this.promocodes.length);
      this.codeOnBtn.innerHTML = this.promocodes[indexPromocode][1];

      [...this.reactions.children[0].getElementsByTagName('text')]
        .map(e => e.innerHTML = `Awesome! ${this.promocodes[indexPromocode][1]}`);

      this.discount.innerHTML = `${this.promocodes[indexPromocode][1]} OFF`;
      this.modalPromocode.innerHTML = this.promocodes[indexPromocode][0];
    },

    swimAway() {
      clearInterval(timer);
      this.setWeight(0); // init
      this.btnGetPromo.classList.add('catfishTop__button_isHidden');
      this.btnRestart.classList.remove('catfishTop__button_isHidden');
      this.clicker.classList.add('catfishTop__clicker_isBlocked');
      this.notify.classList.add('isVisible');
      this.catfishBody.classList.add('catfishTop__body_isSwimAway');
    },

    animateUpdateWeight(size) {
      this.weight.getElementsByClassName('catfishTop__updateWeight')[0].remove();
      const div = document.createElement('div');
      div.classList.add('catfishTop__updateWeight');
      div.innerText = `+${size}`;
      this.weight.appendChild(div);
    },

    animateFlashScreen() {
      this.header.classList.add('catfishTop_isFlashing');
      setTimeout(() => this.header.classList.remove('catfishTop_isFlashing'), 50);
    },
    // ------   SETTERS ------------
    setWeight(size) {
      this.countWeight = size;
      this.weight.children[0].innerText = size;
    },

    setWidth(width) {
      this.countWidth = width;
      this.catfishBody.style.width = width;
    },

    getWeightWidth() {
      return (this.maxWidth - this.countWidth)/this.maxWeight;
    },

    setRandomClickCount() {
      this.clickCounter = getRandomInt(1, 1); // for dev
      // this.clickCounter = getRandomInt(3, 8);
    },

    // -------- MODAL --------
    openModal() {
      clearInterval(timer);
      gameCatfish.modalCount.innerHTML = gameCatfish.countWeight;
      gameCatfish.modal.classList.add('landingModal_isVisible');
      window.scrollTo({top: 0});
      body.style.overflow = 'hidden';
    },

    closeModal() {
      gameCatfish.restartGame();
      gameCatfish.modal.classList.remove('landingModal_isVisible');
      body.style.overflow = '';
    },

    copyToClipboard(text) {
      navigator.clipboard.writeText(text);
      this.modalPrmcAlert.classList.add('landingModal__promocode__alertCopied_visible');
      setTimeout(() => this.modalPrmcAlert.classList.remove('landingModal__promocode__alertCopied_visible'), 1000);
    },
  };
  gameCatfish.init();

  function getElByCl(className){
    return document.getElementsByClassName(className)[0];
  }

  function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min));
  }
})