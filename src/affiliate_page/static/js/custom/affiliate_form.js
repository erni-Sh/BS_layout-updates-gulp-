window.addEventListener('DOMContentLoaded', () => {

  // ------- SELECT ----
  const Select = {
    select:         document.querySelector('.affForm__select .select'),
    selectItem:     document.querySelector('.affForm__select .select > .select__item'),
    selectSvg:      document.querySelector('.affForm__select .select__svg'),
    selectedLabel:  document.querySelector('.affForm__select .select__label_selected'),
    items: document.querySelectorAll('.affForm__select .select__label'),

    headerState: {
      isActive: false,
      text: ''
    },
    selectedPos: -1,

    init() {
      this.selectItem.addEventListener('click', (e) => {
        this.selectItem.parentElement.classList.toggle('select_active');
        this.selectSvg.classList.toggle('select__svg_active');
      });

      // Make Choice
      this.items.forEach((e, i) => {
        e.addEventListener('click', event => {
          this.items.forEach(e => e.classList.remove('select__label_checked'));
          e.classList.add('select__label_checked');
          this.selectedLabel.innerText = e.innerText;
          this.closeSelect();
          formChecker.payMethodErr.innerHTML = '';
        })
      })

      // Click outside
      document.addEventListener('click', event => {
        !this.select.contains(event.target) && this.closeSelect();
      });
    },

    closeSelect() {
      this.selectItem.parentElement.classList.remove('select_active');
      this.selectSvg.classList.remove('select__svg_active');
    },

    makeChoice(value, label, pos) {
      this.headerState = {isActive: true, text: label};
      this.selectedPos = pos;
    }
  };
  Select.init();

  // ------ FORM VALIDATION -------
  const errorTxts = {
    FIELD_EMPTY: `This field must be filled in`,

    EMAIL_INCORRECT: `Invalid format. Make sure you spell the address correctly`,

    PASSWORD_EMPTY: `This field must be filled in`,
    // PASSWORD_INCORRECT: `Wrong password format`,
    PASSWORD_INCORRECT: `Your password must be at least eight symbols, contain at least one number, one upper and one lowercase letter, have no spaces, and not match your email address`,
    PASSWORD_WRONG: `Wrong password`,
    PASSWORD_SHORT: `Password is too short. Make sure it contains at least 8 symbols`,
    PASSWORD_LONG: `Password must be no longer than 128 symbols`,
    PASSWORD_MATCH_EMAIL: `Password math email`,
    PASSWORD_REPEAT: `Passwords don’t match`,

    SITE_INCORRECT: `Invalid format. Make sure you spell the link correctly`,
  };

  const formChecker = {
    form:         document.querySelector('.affForm__form'),
    allInputs:    document.querySelectorAll('.affForm__form input.affForm__input'),
    email:        document.querySelector(`.affForm__form input[name='email']`),
    pass:         document.querySelector(`.affForm__form input[name='password']`),
    passRep:      document.querySelector(`.affForm__form input[name='password_rep']`),
    payMethod:    document.querySelector(`.affForm__form .select__label_selected`),
    payMethodErr: document.querySelector(`.affForm__form .affForm__select .affForm__input__error`),
    website:      document.querySelector(`.affForm__form input[name='site']`),

    isDataValid: false,

    init() {
      this.allInputs.forEach(elem => {
        elem.oninput = () => {
          elem.nextElementSibling.innerHTML = '';
        }
      })
      // on Submit
      this.form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.isDataValid = true;

        this.allInputs.forEach(elem => {
          elem.nextElementSibling.innerHTML = '';
          if(!elem.value) {
            elem.nextElementSibling.innerHTML = errorTxts.FIELD_EMPTY;
            this.isDataValid = false;
          }
        })

        this.email.value && this.checkEmail();
        this.pass.value && this.checkPass();
        this.passRep.value && this.checkPassRep();
        this.website.value && this.checkSite();

        !this.payMethod.innerHTML && (this.payMethodErr.innerHTML = errorTxts.FIELD_EMPTY);
        // const data = new FormData(this.form);
        // for (var pair of data.entries()) {
        //   console.log(pair[0]+ ' - ' + pair[1]);
        // }

        this.isDataValid ? console.log('sended!') : console.log('not sended');
      })
    },

    checkEmail() {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if(!re.test(this.email.value)) {
        this.email.nextElementSibling.innerHTML = errorTxts.EMAIL_INCORRECT;
        this.isDataValid = false;
      }
    },

    checkPass() {
      const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,128}$/;
      if(!re.test(this.pass.value) || this.pass.value.includes(' ') || this.pass.value === this.email.value) {
        this.pass.nextElementSibling.innerHTML = errorTxts.PASSWORD_INCORRECT;
        this.isDataValid = false;
      }
    },

    checkPassRep() {
      if(this.pass.value !== this.passRep.value) {
        this.passRep.nextElementSibling.innerHTML = errorTxts.PASSWORD_REPEAT;
        this.isDataValid = false;
      }
    },

    checkSite() {
      const re = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
      if(!re.test(this.website.value)) {
        this.website.nextElementSibling.innerHTML = errorTxts.SITE_INCORRECT;
        this.isDataValid = false;
      }
    }
  };
  formChecker.init();
});