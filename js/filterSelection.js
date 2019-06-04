class filterSelection {
    constructor(options) {
        this.filterNav = document.querySelector(options.filterNav);
        this.filteLinks = this.filterNav.getElementsByTagName('a');
        this.filterList = document.querySelector(options.filterList);
        this.filterItems = this.filterList.children;
        this.activeClass = options.activeClass || 'show';
        this.init();
    }

    init() {
        this.attachEvents();
        this.filterSelection();
    }

    filter(e) {
        e.preventDefault();

        this.filterNav.querySelector('.active').classList.remove('active');
        e.target.parentNode.classList.add('active');

        this.filterSelection(e.target);
    }

    filterSelection(elem) {
        let name;

        name = elem ? elem.getAttribute('href').slice(1) : 'all';

        [].forEach.call(this.filterItems, item => {
            if (name == 'all') return item.classList.add(this.activeClass);

            if (item.classList.contains(name)) {
                this.addClass(item, name);
            } else {
                this.removeClass(item, name);
            }
        });
    }

    addClass(elem, className) {
        let elemClassNames = elem.className.split(' ');

        if (!(elemClassNames.indexOf(className) == -1)) {
            elem.classList.add(this.activeClass);
        }
    }

    removeClass(elem, className) {
        let elemClassNames = elem.className.split(' ');

        if (elemClassNames.indexOf(className) == -1) {
            elem.classList.remove(this.activeClass);
        }
    }

    attachEvents() {
        [].forEach.call(this.filteLinks, link => {
            link.addEventListener('click', (e) => this.filter(e));
        });
    }
}