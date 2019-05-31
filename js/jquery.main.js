// init header navigation
const headerNav = new Modal('.header-nav',
    {
        activeClass: 'nav-active',
        openerBtn: 'nav-opener'
    });

// init carousel
const carousel = new Carousel({
    carouselClass: '.carousel',
    generatePagination: false,
    autoRotation: false
});