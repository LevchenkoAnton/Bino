// init header navigation
const headerNav = new Modal('.header-nav',
    {
        activeClass: 'nav-active',
        openerBtn: 'nav-opener'
    });

// init carousel
const carousel = new Carousel({
    carouselClass: '.carousel',
    autoRotation: false
});

const servicesCarousel = new Carousel({
    carouselClass: '.services-carousel',
    generatePagination: true,
    vertical: true
});

const caseCarousel = new Carousel({
    carouselClass: '.case-carousel',
    generatePagination: true,
    autoRotation: false
});

const portfolioFilter = new filterSelection({
    filterNav: '.portfolio-nav',
    filterList: '.portfolio-list'
});

let elem = document.querySelector('.logo');

let elemStyle = getComputedStyle(elem);

console.log(elemStyle.display);