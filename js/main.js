// import Modal from './src/javascript/modal';
// import Carousel from './src/javascript/carousel';

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

const portfolioFilter = new filterSelection({
    filterNav: '.portfolio-nav',
    filterList: '.portfolio-list'
});