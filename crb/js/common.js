const header = document.querySelector('.header');
const navButton = document.querySelector('.header__nav');
const goTopBtn = document.querySelector('.back');





function openTools(event) {
  const headerWrapper = document.querySelector('.header__wrapper');
  
  if (event.target.classList.contains('header__btn-search')) {
    event.preventDefault();
    headerWrapper.classList.toggle('header__wrapper_appear');
  }

  if (event.target.classList.contains('header__glasses')) {
    document.querySelector('section[class^="settings"]').classList.add('settings_appear');
    document.body.parentNode.classList.add('contrast');
    localStorage.setItem('contrast', 1);
  }
}




function openNav() {
  document.querySelector('nav[class^="menu"]').classList.toggle('menu_appear');
  navButton.classList.toggle('header__nav_white');
  document.querySelector('.header__left-side').classList.toggle('header__left-side_orange');
}

function openNavKeyDown(event) {
  if (event.key === 'Enter') {
    openNav();
  }
}

function closeNavClickOutside(event) {
  const menu = document.querySelector('nav[class^="menu"]');

  if (menu.matches('.menu_appear') && !menu.contains(event.target) && event.target !== navButton) {
  document.querySelector('nav[class^="menu"]').classList.remove('menu_appear');
  navButton.classList.remove('header__nav_white');
  document.querySelector('.header__left-side').classList.remove('header__left-side_orange');
  }
}






function trackScroll() {
  var scrolled = window.pageYOffset;
  var coords = document.documentElement.clientHeight;

  if (scrolled > coords) {
    goTopBtn.classList.add('back_show');
  }
  if (scrolled < coords) {
    goTopBtn.classList.remove('back_show');
  }
}

function backToTop() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -30);
    setTimeout(backToTop, 0);
  }
}



window.addEventListener('scroll', trackScroll);
goTopBtn.addEventListener('click', backToTop);

header.addEventListener('click', openTools);
navButton.addEventListener('click', openNav);
navButton.addEventListener('keydown',openNavKeyDown);
document.addEventListener('click', closeNavClickOutside);
