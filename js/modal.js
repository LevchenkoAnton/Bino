class Modal {
    constructor(element, options) {
        this.default = {
            closeClass: 'close-modal',
            autoClose: false,
            autoCloseTime: 1000,
            opacity: 0.7,
            position: 'center',
            duration: 500
        };
        this.wrapper = document.querySelector('#wrapper');
        this.element = document.querySelector(element).parentNode;
        this.openerBtn = document.querySelector('.' + options.openerBtn);
        this.closeBtn = document.querySelector('.' + options.closeBtn);
        this.activeClass = options.activeClass;
        this.overlay = document.createElement('div');
        this.overlay.classList.add('overlay');

        this.init();
    }

    init() {
        const self = this;

        this.events(self);
    }

    events(self) {
        this.openerBtn.addEventListener('click', function (e) {
            e.preventDefault();

            if (!self.wrapper.classList.contains(self.activeClass)) {
                self.addOverlay();
                self.showModal();
            } else {
                self.hideOverlay();
                self.hideModal();
            }
        });

        this.overlay.addEventListener('click', function (e) {
            e.preventDefault();

            self.hideModal();
        });

        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', function (e) {
                e.preventDefault();

                self.hideModal();
            });
        }

        document.addEventListener('keyup', function (e) {
            let key = e.key || e.keyCode;

            if (key === 'Escape' || key ==='Esc' || key === 27) {
                self.hideOverlay();
                self.hideModal();
            }
        });
    }

    addOverlay() {
        this.element.insertAdjacentElement('afterbegin', this.overlay);
    }

    hideOverlay() {
        this.overlay.remove();
    }

    showModal() {
        this.wrapper.classList.add(this.activeClass);
    }

    hideModal() {
        this.wrapper.classList.remove(this.activeClass);
        this.hideOverlay();
    }
}