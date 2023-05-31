window.addEventListener('DOMContentLoaded', () => {

  let timer;
  const AppSearch = {
    form:            getElByCl('search-input__form'),
    input:           getElByCl('search-input'),
    clearInputBtn:   getElByCl('search-input__icon-clear'),
    suggestions:     getElByCl('search-input__suggestions'),
    suggContent:     getElByCl('search-input__suggestions__content'),
    clearHistoryBtn: getElByCl('search-input__suggestions__clear'),

    init() {
      this.input.addEventListener('input', (e) => this.checkSugg());

      this.input.addEventListener('focus', (e) => this.checkSugg());

      document.addEventListener('click', e => {
        if (!AppSearch.form.contains(e.target)) AppSearch.closeSugg();
      })

      this.clearInputBtn.addEventListener('click', () => {
        AppSearch.input.value = '';
        AppSearch.input.focus();
        AppSearch.closeSugg();
      });

      this.clearHistoryBtn.addEventListener('click', () => {
        AppSearch.clearHistorySearch();
        AppSearch.suggContent.innerHTML = '';
      });

      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        AppSearch.setHistorySearch(AppSearch.input.value);
        AppSearch.closeSugg();
        // here searching
        console.log(AppSearch.input.value);
      });
    },

    checkSugg() {
      clearTimeout(timer);
      const value = this.input.value;
      const historySearch = this.getHistorySearch();
      if(!value || !historySearch.length) {this.closeSugg(); return}

      const suggestions = historySearch.filter(l => value ? l.toLowerCase().includes(value.toLowerCase()) : l);
      if(!suggestions.length) {this.closeSugg(); return}

      this.openSugg(suggestions);
    },

    openSugg(suggestions) {
      timer = setTimeout(() => {
        this.suggContent.innerHTML = '';
        suggestions
          .map(label => {
            let div = document.createElement('div');
            div.className = 'search-input__suggestions__item';
            div.innerHTML = label;
            div.onclick = () => {
              AppSearch.input.value = label;
              AppSearch.closeSugg();
            }
            AppSearch.suggContent.append(div);
          }
        );

        this.suggestions.classList.add('search-input__suggestions_isActive');
      }, 700)
    },

    closeSugg() {
      clearTimeout(timer);
      this.suggestions.classList.remove('search-input__suggestions_isActive');
    },
    getHistorySearch() {
      return JSON.parse(localStorage.search_history || '[]');
    },
    setHistorySearch(value) {
      const oldHistorySearch = this.getHistorySearch();
      localStorage.search_history = JSON.stringify([value, ...oldHistorySearch.filter(v => v !== value)])
    },
    clearHistorySearch() {
      localStorage.search_history = '[]';
    },
  };
  AppSearch.init();

  function getElByCl(className){
    return document.getElementsByClassName(className)[0];
  }
});