
import AOS from 'aos';

export default class Navigation {

    constructor(linksSelector, headerSelector, mobileLinks, mobileButton) {
        this.header = document.querySelector(headerSelector);
        this.parentLinks = document.querySelectorAll(linksSelector);
        this.mobileLinks = document.querySelectorAll(mobileLinks);
        this.mobileButton = document.querySelector(mobileButton);
    }

    init() {
        this.headerState(this.header);
        this.foldHeader(this.parentLinks, this.header);
        this.mobileNavigation(this.mobileLinks, this.header, this.mobileButton);
        AOS.init({
            delay: 150,
            duration: 750
        });
    }

    foldHeader(links, header) {
        links.forEach((link) => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                let linksRows = document.querySelectorAll('.links-row');
                linksRows.forEach((row) => {
                    row.classList.remove('visible');
                });
                let element = document.querySelector(link.hash);
                element.classList.add('visible');
                header.classList.add('open')
            });
        });
        document.addEventListener('click', function (e) {
            if (!header.contains(e.target)) {
                let linksRows = document.querySelectorAll('.links-row');
                linksRows.forEach((row) => {
                    row.classList.remove('visible');
                });
                header.classList.remove('open');
            }
        })
    }

    headerState(header) {
        if (!header) return;
        let events = ['scroll', 'DOMContentLoaded'];

        events.forEach((event) => {
            document.addEventListener(event, function () {
                if (window.pageYOffset >= document.querySelector('.contacts').offsetTop - header.clientHeight/2) {
                    header.classList.remove('scrolled');
                    return;
                }
                if (window.pageYOffset > document.querySelector('.video-wrapper').clientHeight - header.clientHeight/2) {
                    header.classList.add('scrolled');
                    return;
                }
                header.classList.remove('scrolled');
            })
        });
    }

    mobileNavigation(links, header, mobileButton) {

        mobileButton.addEventListener('click', function () {
            mobileButton.classList.toggle('active');
            header.classList.toggle('open');
            let linksRows = document.querySelectorAll('.mobile-dropdown');
            linksRows.forEach((row) => {
                row.classList.remove('expanded');
            });
        });

        links.forEach((link) => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                let linksRows = document.querySelectorAll('.mobile-dropdown');
                links.forEach((inactiveLink) => {
                    inactiveLink.classList.remove('active');
                });
                linksRows.forEach((row) => {
                    row.classList.remove('expanded');
                });
                this.classList.add('active');
                let element = document.querySelector(link.hash);
                element.classList.add('expanded');
            });
        });

    }
}

