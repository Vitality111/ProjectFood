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

  // ?????????????????? ????????

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

  //??????????????????

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

  // ????????????????

  const numberOfSlide = document.querySelectorAll(".offer__slider-counter"),
    offer = document.querySelectorAll(".offer__advantages"),
    slidePrew = document.querySelector(".offer__slider-prev"),
    slideNext = document.querySelector(".offer__slider-next"),
    slideContent = document.querySelectorAll(".offer__slider-wrapper");

  function hideSlideContent() {
    offer.forEach((item) => {
      item.style.display = "none";
    });
    slideContent.forEach((item) => {
        item.style.display = "none";
    });
  }
  hideSlideContent();
});
