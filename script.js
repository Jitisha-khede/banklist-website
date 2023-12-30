'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const header = document.querySelector('.header');
const allsections = document.querySelector ('.section');
document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
//console.log(allButtons);

const  message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 'We use cookies for improved functionality and analytics. <button class = "btn btn--close-cookie"> Got it! </button>';

header.prepend(message);
document.querySelector('.btn--close-cookie').addEventListener('click',function(){
  message.remove();
});

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click',function(e){
  section1.scrollIntoView({behavior : 'smooth' });
})


  document.querySelector('.nav__links').addEventListener('click',function(e){
    e.preventDefault(); 
    if(e.target.classList.contains('nav__link')){
      
      const id = e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({behavior : 'smooth'}); 
    }
    
  });

const tabs = document.querySelectorAll('.operations__tab');

const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click',function(e){
  const clicked = e.target.closest('.operations__tab');
  //console.log(clicked);

  //guard clause
  if(!clicked) return;
  
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    tabsContent.forEach(c => c.classList.remove('operations__content--active'));

    clicked.classList.add('operations__tab--active');
  
    // console.log(clicked.dataset.tab);
    //active tab content
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
  
  
  //Active tab
})

const handleHover = function(e){
  //console.log(this);
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    //console.log(siblings);
    siblings.forEach(el => {
      
      if (el !== link) el.style.opacity = this; 
      //console.log(this);
     });
     logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover',handleHover.bind(0.5));
nav.addEventListener('mouseout',handleHover.bind(1));
// sticky navigation
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function(entries){
  const [entry] = entries;
  //console.log(entry);
  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}
const headerObserver = new IntersectionObserver(stickyNav,{
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});
headerObserver.observe(header);

//reavel sections
const allSections = document.querySelectorAll('.section');
const revealSection = function(entries,observer){
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection,{
  root: null,
  threshold : 0.15,
});
allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//lazy loading of images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadimg = function(entries,observer){
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  
  entry.target.src = entry.target.dataset.src;

  //jab original high quality image load ho jaye tb blur filter hatao
  entry.target.addEventListener('load',function(){
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
}

const imageObserver = new IntersectionObserver(loadimg,
  {
    root:null,
    threshold:0,
});

imgTargets.forEach(img => imageObserver.observe(img));

//slider
const slider = function(){
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = function(slide){
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};

//const goToSlide = function(slide){
  //slides.forEach((s,i) => s.style.transform=`translateX(${100*(i-slide)}%)`);
//};
const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
const nextSlide = function(){
  if(curSlide === maxSlide-1){
    curSlide = 0;
  }
  else{
    curSlide++;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
}

const prevSlide = function(){
  if(curSlide === 0){
    curSlide  = maxSlide - 1;
  }
  else{
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
}

const init = function(){
  goToSlide(0);
  createDots();
  activateDot(0);
};

init();

btnRight.addEventListener('click',nextSlide);
btnLeft.addEventListener('click',prevSlide);

document.addEventListener('keydown',function(e){
  if(e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();

})

dotContainer.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')){
    const {slide} = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});

};
slider();

