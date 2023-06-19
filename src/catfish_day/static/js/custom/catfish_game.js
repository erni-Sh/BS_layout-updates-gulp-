window.addEventListener('DOMContentLoaded', () => {
  console.log('here!');

  const gameCatfish = {
    clicker:  getElByCl('catfishTop__clicker'),
    weight:   getElByCl('catfishTop__weight').children[0],
    body:     getElByCl('catfishTop__body'),

    weightCount: 1,
    startWidth: 124,
    endWidth: 681,
    currenStep: 0,
    totalSteps: 5,

    init() {
      this.clicker.addEventListener('click', () => {
        gameCatfish.weight.innerText = gameCatfish.weightCount++;
        gameCatfish.grow();
      })
    },

    grow() {
      if(this.currenStep === this.totalSteps) return;

      this.currenStep++
      const stepWidthSize = (this.endWidth - this.startWidth)/this.totalSteps;
      const width = this.startWidth + this.currenStep * stepWidthSize;
      this.body.style.width = width;
    },
  };
  gameCatfish.init();

  function getElByCl(className){
    return document.getElementsByClassName(className)[0];
  }
})