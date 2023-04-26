import { gsap } from 'gsap';

/**
 * Class representing a Grid Item
 */
export class Item {
    // DOM elements
    DOM = {
        // main element (.item)
        el: null,
        // imageWrap (.item__image-wrap)
        imageWrap: null,
        // image element (.item__img)
        image: null,
        // image inner element (.item__img-inner)
        imageInner: null,
        // item link (.item__link)
        link: null,
        // item meta (.item__meta)
        meta: null,
        // item link (.item__title)
        title: null,
        // titleInner (.item__caption-title > .oh__inner)
        titleInner: null,
        // number (.item__caption-number)
        number: null,
        // numberInner (.item__caption-number > .oh__inner)
        numberInner: null,
        // item link (.item__desc)
        desc: null,
        //caption container
        container:null,
        // nameBack: null,

    }

    /**
     * Constructor.
     * @param {Element} DOM_el - main element (.item)
     * @param {Preview} previewEl - the Preview element
     
     */
    constructor(DOM_el, previewEl) {

        this.DOM.el = DOM_el;
        this.preview = previewEl;
        this.DOM.imageWrap = this.DOM.el.querySelector('.item__image-wrap');
        this.DOM.image = this.DOM.el.querySelector('.item__img');
        this.DOM.imageInner = this.DOM.el.querySelector('.item__img-inner');
        this.DOM.link = this.DOM.el.querySelector('.item__link');
        this.DOM.meta = this.DOM.el.querySelector('.item__meta');
        this.DOM.title = this.DOM.el.querySelector('.item__title');
        // this.DOM.nameBack = this.DOM.el.querySelector('.preview__name-back');
        // this.DOM.titleInner = this.DOM.title.querySelector('.oh__inner');
        // this.DOM.number = this.DOM.el.querySelector('.item__caption-number');
        // this.DOM.numberInner = this.DOM.number.querySelector('.oh__inner');
        this.DOM.desc = this.DOM.el.querySelector('.item__desc');
        this.DOM.container = this.DOM.el.querySelector('.item__cap-container');
        // this.preview.slide = this.previewEl.querySelector('.slide');

        //the selector for images inside the new grid
        // this.DOM.img = this.DOM.gridEl.querySelector('.item__img');

        this.DOM.el.addEventListener('mouseenter', () => {
            gsap.killTweensOf(this.DOM.imageInner);
            gsap.to(this.DOM.imageInner, {
                duration: 0.1,
                ease: 'power4',
                // scale: 1.2
                scale: 1.3,
            });
        });
        this.DOM.el.addEventListener('mouseleave', () => {
            gsap.killTweensOf(this.DOM.imageInner);
            gsap.to(this.DOM.imageInner, {
                duration: 0.1,
                ease: 'expo',
                scale: 1
            });
        });
    }
}