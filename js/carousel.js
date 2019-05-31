class Carousel {
    constructor(option) {
        this.option = option;
        this.window = window;
        this.carousel = document.querySelector(this.option.carouselClass);
        this.mask = this.carousel.querySelector('.mask');
        this.slideset = this.carousel.querySelector('.slideset');
        this.slides = this.carousel.querySelectorAll('.slide');
        this.activeClass = 'active';
        this.btnPrev = this.carousel.querySelector('.btn-prev');
        this.btnNext = this.carousel.querySelector('.btn-next');
        this.pagerList = document.createElement('ul');
        this.pagination = this.carousel.querySelector('.pagination');
        this.pagerLinks = this.pagination.getElementsByTagName('a');
        this.currentStep = 0;
        this.stepsCount = 0;
        this.step = 1;
        this.position = 0;
        this.switchTime = 4000;
        this.tmpOffset = 0;
        this.minTouchWidth = 100;
        this.isTouchDevice = /Windows Phone/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
        this.isGeneratePagination = option.generatePagination;
        this.isAutoRotation = option.autoRotation;
        this.init();
    }

    init() {
        this.attachEvents();
        this.calculateOffsets();
        this.paginationEvent();
        this.switchSlide();

        if (this.isGeneratePagination) {
            this.generatePagination();
        }
    }

    attachEvents() {
        let self = this;

        window.addEventListener('load', self.onWindowResize.bind(self));
        window.addEventListener('resize', self.onWindowResize.bind(self));
        window.addEventListener('orientationchange', self.onWindowResize.bind(self));

        if (this.btnNext) {
            this.btnNext.addEventListener('click', e => {
                e.preventDefault();
                self.nextSlide.call(self);
            });
        }

        if (this.btnPrev) {
            this.btnPrev.addEventListener('click', e => {
                e.preventDefault();
                self.prevSlide.call(self);
            });
        }

        if (this.isTouchDevice) {
            this.mask.addEventListener('touchstart', (e) => {
                self.startTouch = e.touches[0].clientX;
                self.touchmove = 0;

                self.stopRotation();
            });

            this.mask.addEventListener('touchmove', (e) => {
                self.moveWidth = self.startTouch - e.touches[0].clientX;
                self.touchmove = self.tmpOffset - self.moveWidth;
                self.slideset.style.marginLeft = self.touchmove + 'px';

                self.stopRotation();

            });

            this.mask.addEventListener('touchend', (e) => {
                if (Math.abs(self.touchmove) > self.minTouchWidth && self.moveWidth > 0) {
                    self.nextSlide();
                } else if (Math.abs(self.touchmove) > self.minTouchWidth && self.moveWidth < 0) {
                    self.prevSlide();
                } else {
                    self.slideset.style.marginLeft = self.tmpOffset;
                    self.autoRotation();
                }
            });
        }
    }

    onWindowResize() {
        this.calculateOffsets();
        this.refreshState();
    }

    calculateOffsets() {
        this.maskWidth = this.mask.offsetWidth;

        [].forEach.call(this.slides, slide => {
            slide.style.width = this.maskWidth + 'px';
        });

        this.stepsCount = this.slides.length;
    }

    prevSlide() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.switchSlide();
        } else {
            this.currentStep = this.stepsCount - 1;
            this.switchSlide();
        }
    }

    nextSlide() {
        if (this.currentStep < this.stepsCount - 1) {
            this.currentStep++;
            this.switchSlide();
        } else {
            this.currentStep = 0;
            this.switchSlide();
        }
    }

    switchSlide() {
        this.refreshState();

        this.addActiveClass(this.slides);
        this.addActiveClass(this.pagerList.children);
        this.autoRotation();
    }

    refreshState() {
        if (this.currentStep < this.slides.length) {
            this.tmpOffset = -this.maskWidth * this.currentStep
        } else {
            this.tmpOffset = 0
        }

        this.slideset.style.marginLeft = this.tmpOffset +'px';
    }

    generatePagination() {
        for (let i = 0; i < this.stepsCount; i++) {
            this.pagerListItem = document.createElement('li');
            this.pagerListlink = document.createElement('a');
            this.pagerListlink.innerText = i + 1;
            this.pagerListlink.setAttribute('href', '#');
            this.pagerListItem.appendChild(this.pagerListlink);
            this.pagerList.appendChild(this.pagerListItem);
        }

        this.pagination.appendChild(this.pagerList);
    }

    paginationEvent() {
        let self = this;

        this.pagination.addEventListener('click', function (e) {
            e.preventDefault();

            [].forEach.call(self.pagerLinks, (link, i) => {
                if (e.target == link && !link.parentNode.classList.contains('active')) {
                    self.currentStep = i;
                    self.switchSlide();
                }
            });
        })
    }

    addActiveClass(items) {
        [].forEach.call(items, item => {
            if (item.classList.contains('active')) {
                item.classList.remove('active');
            }

            items[this.currentStep].classList.add('active');
        });
    }

    autoRotation() {
        if (this.isAutoRotation) {
            let self = this;

            clearInterval(this.timer);

            this.timer = setInterval(() => {
                self.nextSlide();
            }, this.switchTime)
        }
    }

    stopRotation() {
        clearInterval(this.timer);
    }
}