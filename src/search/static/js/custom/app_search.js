window.addEventListener('DOMContentLoaded', () => {

  let timer;
  const AppSearch = {
    form:              getElByCl('search-input__form'),
    fieldset:          getElByCl('search-input__fieldset'),
    input:             getElByCl('search-input'),
    clearInputBtn:     getElByCl('search-input__icon-clear'),
    suggestions:       getElByCl('search-input__suggestions'),
    suggContent:       getElByCl('search-input__suggestions__content'),
    clearHistoryBtn:   getElByCl('search-input__suggestions__clear'),

    appCategories:     document.querySelectorAll('div[id^="category_id_"]'),
    appItems:          [...document.querySelectorAll('.app-item__wrapper')].map(el => el.cloneNode(true)),

    searchResultWrap:  getElByCl('search-result__wrapper'),
    searchResultCount: getElByCl('search-result__count'),
    searchResult:      getElByCl('search-result'),
    cat:               getElByCl('search-result__cat'),


    init() {
      this.input.addEventListener('input', () => this.checkSugg());

      this.input.addEventListener('focus', () => {
        AppSearch.openInput();
        AppSearch.checkSugg();
      });

      document.addEventListener('click', e => {
        if (!AppSearch.form.contains(e.target)) {
          AppSearch.closeSugg();
          if(!AppSearch.input.value) {
            AppSearch.closeInput();
            AppSearch.closeSearchResult();
            AppSearch.setSearchParams();
          }
        }
      });

      this.clearInputBtn.addEventListener('click', () => {
        AppSearch.input.value = '';
        AppSearch.input.focus();
        AppSearch.setSearchParams();
      });

      this.clearHistoryBtn.addEventListener('click', () => {
        AppSearch.clearHistorySearch();
        AppSearch.suggContent.innerHTML = '';
      });

      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        AppSearch.input.blur();
        AppSearch.closeSugg();
        AppSearch.setSearchParams();
        if(AppSearch.input.value) {
          AppSearch.setHistorySearch();
          AppSearch.searchApps();
        } else {
          AppSearch.closeInput();
          AppSearch.closeSearchResult();
        }
      });

      this.getSearchParams();
      this.form.classList.add('search-input__form_isReady');
    },

    // ------- INPUT VISIBLE METHODS -------

    openInput() {
      this.input.classList.add('search-input_isOpened');
      this.fieldset.classList.add('search-input__fieldset_isOpened');
    },

    closeInput() {
      this.input.classList.remove('search-input_isOpened');
      this.fieldset.classList.remove('search-input__fieldset_isOpened');
    },

    // ------- SUGESTIONS ------------

    checkSugg() {
      clearTimeout(timer);
      const value = this.input.value;
      const historySearch = this.getHistorySearch();
      if(!historySearch.length) {this.closeSugg(); return}

      const suggestions = historySearch.filter(l => value ? l.toLowerCase().includes(value.toLowerCase()) : l);
      if(!suggestions.length) {this.closeSugg(); return}

      this.openSugg(suggestions);
    },

    openSugg(suggestions) {
      timer = setTimeout(() => {
        this.suggContent.innerHTML = '';

        suggestions.map(label => {
          let div = document.createElement('div');
          div.className = 'search-input__suggestions__item';
          div.innerHTML = label;
          div.onclick = () => {
            AppSearch.input.value = label;
            AppSearch.searchApps();
            AppSearch.setSearchParams();
            AppSearch.closeSugg();
          };
          AppSearch.suggContent.append(div);
        });

        this.suggestions.classList.add('search-input__suggestions_isActive');
      }, 300)
    },

    closeSugg() {
      clearTimeout(timer);
      this.suggestions.classList.remove('search-input__suggestions_isActive');
    },

    // ------- HISTORY SEARCH ------------

    getHistorySearch() {
      return JSON.parse(localStorage.search_history || '[]');
    },
    setHistorySearch() {
      const value = this.input.value;
      const oldHistorySearch = this.getHistorySearch();
      localStorage.search_history = JSON.stringify([value, ...oldHistorySearch.filter(v => v !== value)].splice(0, 30));
    },
    clearHistorySearch() {
      localStorage.search_history = '[]';
    },

    // ------- SEARCH PARAMS in url ------------

    getSearchParams() {
      const urlParams = new URLSearchParams(window.location.search);
      const s = urlParams.get('s');
      if(s) {
        this.input.value = s;
        this.setHistorySearch();
        this.openInput();
        this.searchApps();
      }
    },
    setSearchParams() {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set("s", this.input.value);
      const newRelativePathQuery = window.location.pathname + '?' + urlParams.toString();
      history.pushState(null, '', newRelativePathQuery);
    },

    // ------- SEARCH RESULTS ------------

    openSearchResult() {
      this.appCategories.forEach(e => e.classList.add('category__wrapper_isHidden'));
      this.searchResultWrap.classList.remove('search-result__wrapper_isHidden');
    },
    closeSearchResult() {
      AppSearch.searchResult.innerHTML = '';
      this.appCategories.forEach(e => e.classList.remove('category__wrapper_isHidden'));
      this.searchResultWrap.classList.add('search-result__wrapper_isHidden');
    },

    // ------- CATs METHODS ------------

    showCat() {
      this.cat.classList.remove('search-result__cat_isHidden');
    },
    hideCat() {
      this.cat.classList.add('search-result__cat_isHidden');
    },

    // ------- SEARCH ENGINE ------------

    searchApps() {
      const value = this.input.value;

      const findedApps = this.appItems.filter(app =>
        app.querySelector('.app-item__title').textContent.toLowerCase().includes(value.toLowerCase()));

      AppSearch.searchResult.innerHTML = '';

      if(findedApps.length) {
        this.searchResultCount.innerText = `Search results (${findedApps.length.toString()})`;
        this.hideCat();

        findedApps.forEach(app => AppSearch.searchResult.appendChild(app));

        // restore functionality

        AppSearch.searchResult.querySelectorAll('img').forEach(appIcon => {
          appIcon.src = appIcon.dataset.src;
          appIcon.srcset = appIcon.dataset.srcset;
        }); // without observer

        [...AppSearch.searchResult.querySelectorAll('a')].map(e => {
          e.addEventListener('click', () => window.location.href = e.dataset.url);
        });
      } else {
        this.searchResultCount.innerText = `No results`;
        this.showCat();
      }

      this.openSearchResult();
    },

  };
  AppSearch.init();

  function getElByCl(className){
    return document.getElementsByClassName(className)[0];
  }
});