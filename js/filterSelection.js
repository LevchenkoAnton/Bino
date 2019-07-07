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

            let tags = item.dataset.tags;

            if (tags.indexOf(name) != -1) {
                item.classList.add(this.activeClass);
            } else {
                item.classList.remove(this.activeClass);
            }
        });
    }

    attachEvents() {
        this.filterNav.addEventListener('click', (e) => {
            if (e.target.tagName != 'A') return;

            this.filter(e);
        });
    }
}