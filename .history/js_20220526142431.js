"use strict";

window.addEventListener("DOMContentLoaded", () => {
  //tabs
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.style.display = "none";
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].style.display = "block";
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  //timer

  const deadline = "2022-05-19";
  function getTimeRemaning(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector(`#days`),
      hours = timer.querySelector(`#hours`),
      minutes = timer.querySelector(`#minutes`),
      seconds = timer.querySelector(`#seconds`),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();
    function updateClock() {
      const t = getTimeRemaning(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
        days.innerHTML = "00";
        hours.innerHTML = "00";
        minutes.innerHTML = "00";
        seconds.innerHTML = "00";
      }
    }
  }

  setClock(".timer", deadline);

  // модальное окно

  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    modalCloseBtn = document.querySelector("[data-close]");

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal();
    });
  });
  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
  function openModal() {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    clearInterval(modelTimerId);
  }
  modalCloseBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.style.display == "block") {
      closeModal();
    }
  });

  const modelTimerId = setTimeout(openModal, 30000);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);

  //Навигация

  const headerLink = document.querySelector(".header__links"),
    dividerOne = document.querySelectorAll(".divider"),
    choisestLink = document.querySelectorAll(".header__link");

  function scrollFirst(i) {
    if (i == 0) {
      window.scrollTo(0, dividerOne[i + 2].offsetTop);
    } else {
      window.scrollTo(0, dividerOne[i - 1].offsetTop);
    }
  }

  headerLink.addEventListener("click", (event) => {
    const target = event.target;
    event.preventDefault();
    if (target && target.classList.contains("header__link")) {
      choisestLink.forEach((item, i) => {
        if (target == item) {
          scrollFirst(i);

          // console.log(`Hello ${i + 1}`);
        }
      });
    }
  });
//Карты меню
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
          this.element = 'menu__item';
          this.classList.add(this.element);
      } else {
          this.classes.forEach (className => element.classList.add(className));
      }

      this.classes.forEach (className => element.classList.add(className));
      element.innerHTML = `
          <img src=${this.src} alt=${this.alt}>
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
          </div>
        `;
      this.parent.append(element);
    }
  }
  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    `Меню "Фитнес" - это новый подход к приготовлению блюд:больше свежих овощей и фруктов. Продукт активных и
    здоровых людей. Это абсолютно новый продукт с 
    оптимальной ценой и высоким качеством!`,
    9,
    ".menu .container",
    // 'menu__item'
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    `Меню "Премиум"`,
    `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты,
     фрукты - ресторанное меню без похода в ресторан!`,
    15,
    ".menu .container",
    'menu__item'
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    `Меню "Постное"`,
    `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за
    счет тофу и импортных вегетарианских стейков.`,
    12,
    ".menu .container",
    'menu__item'
  ).render();
});
