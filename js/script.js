var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__trigger');
var pageHeader = document.querySelector('.page-header');
var pageIntro = document.querySelector('.intro');

navMain.classList.remove('main-nav--nojs');
pageHeader.classList.remove('page-header--full');
pageIntro.classList.remove('intro--short');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
    if (pageHeader.classList.contains('page-header--full')) {
      pageHeader.classList.remove('page-header--full');
    } else {
      pageHeader.classList.add('page-header--full');
    };
    if (pageIntro.classList.contains('intro--short')) {
      pageIntro.classList.remove('intro--short');
    } else {
      pageIntro.classList.add('intro--short');
    };
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
    pageHeader.classList.remove('page-header--full');
    pageIntro.classList.remove('intro--short');
  }
});
