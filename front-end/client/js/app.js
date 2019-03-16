
const MODE = "dev";

import Popups from './modules/Popups';
import Forms from './modules/Forms';
import Navigation from './modules/Navigation';
import PortfolioMedia from './modules/PortfolioMedia';

class Root {

    constructor() {
        this.modules = {
            navigation : new Navigation('.parent-link', '.header', '.mobile-parent-link', '.mobile-menu-button'),
            portfolioMedia : new PortfolioMedia(),
            forms: new Forms('.ajax-form'),
            popups: new Popups()
        };
    }

    start(){
        let self = this;
        Object.keys(self.modules).forEach((module)=>{
            if(!self.modules[module].init){
                console.warn('Warning! Module: "' + module + '" doesn\'t seem to have "init" method, the module will not be initialised automatically!')
            } else {
                self.modules[module].init();
            }
        });
        // document.addEventListener('DOMContentLoaded', function () {
        //     setTimeout(function () {
        //         document.querySelector('.loading').classList.add('hidden');
        //         document.body.classList.remove('is-loading')
        //     }, 5250)
        // })
    }

}

if (MODE !== "dev") {
    new Root().start();
} else {
    window.mode = MODE;
    window.App = new Root();
    App.start();
}


