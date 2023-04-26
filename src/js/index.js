import { preloadImages, isInViewport } from './utils';
import { gsap } from 'gsap';
import { Item } from './item';
import { Preview } from './preview';



// import Lenis from '@studio-freight/lenis'
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// gsap.registerPlugin(ScrollTrigger);
// import { Flip } from 'gsap/Flip';
// gsap.registerPlugin(Flip);

// body element
const body = document.body;

// .content element
const contentEl = document.querySelector('.content');

// frame element
const frameEl = document.querySelector('.frame');

// switcher element and flip element
const buttonEl = document.querySelector('#flipBtn');
const switchEl = document.querySelector('.switch');


// top and bottom overlay overlay elements
const overlayRows = [...document.querySelectorAll('.overlay__row')];

// Preview instances array
const previews = [];
[...document.querySelectorAll('.preview')].forEach(preview => previews.push(new Preview(preview)));

// Item instances array
const items = [];
[...document.querySelectorAll('.item')].forEach((item, pos) => items.push(new Item(item, previews[pos])));

const openItem = item => {
    
    gsap.timeline({
        defaults: {
            duration: 1, 
            ease: 'power3.inOut'
        }
    })
    .add(() => {
        // pointer events none to the content
        contentEl.classList.add('content--hidden');
    }, 'start')
    .addLabel('start', 0)
    .set([item.preview.DOM.innerElements, item.preview.DOM.backCtrl, item.preview.DOM.slider], {
        opacity: 0,
    
    }, 'start')
    .to(overlayRows, {
        scaleY: 1,
        opacity:1,

    }, 'start')

    .addLabel('content', 'start+=0.6')

    .add(() => {
        body.classList.add('preview-visible');

        gsap.set(frameEl, {
            opacity: 0
        }, 'start')
        item.preview.DOM.el.classList.add('preview--current');
    }, 'content')
    // Image animation (reveal animation)
    .to([item.preview.DOM.image, item.preview.DOM.imageInner ], {
        startAt: {y: pos => pos ? '101%' : '-101%'},
        y: '0%',
        opacity:1,
        delay:1,
    }, 'content')
    
    .add(() => {
        for (const line of item.preview.multiLines) {
            line.in();
        }
        gsap.set(item.preview.DOM.multiLineWrap, {
            opacity: 1,
            delay:0.1
        })
    }, 'content')
    // animate frame element
    .to(frameEl, {
        ease: 'expo',
        startAt: {y: '-100%', opacity: 0},
        opacity: 1,
        y: '0%'
    }, 'content+=0.3')
    .to(item.preview.DOM.innerElements, {
        ease: 'expo',
        startAt: {yPercent: 101},
        yPercent: 0,
        opacity: 1,
        delay:.5,
    }, 'content+=0.3')
    .to(item.preview.DOM.backCtrl, {
        opacity: 1
    }, 'content')
    .to(buttonEl, {
        ease: 'expo',
        startAt: {y: '-100%', opacity: 0},
        opacity: 0,
        y: '0%'
    },'content+=0.3')
    .to(switchEl, {
        ease: 'expo',
        startAt: {y: '-100%', opacity: 0},
        opacity: 0,
        y: '0%'

    },'content+=0.3')

};

const closeItem = item => {
    
    gsap.timeline({
        defaults: {
            duration: 2, 
            ease: 'power3.inOut'
        }
    })
    .addLabel('start', 0)
    .to([item.preview.DOM.innerElements, item.preview.DOM.slider], {
        yPercent: -101,
        opacity: 0,
    }, 'start')
    .add(() => {
        for (const line of item.preview.multiLines) {
            line.out();
        }
    }, 'start')
    
    .to(item.preview.DOM.backCtrl, {
        opacity: 0
    }, 'start')

    .to(buttonEl, {
        ease: 'expo',
        startAt: {y: '-100%', opacity: 0},
        opacity: 1,
        y: '0%'

    },'start+=0.3')
    .to(switchEl, {
        ease: 'expo',
        startAt: {y: '-100%', opacity: 0},
        opacity: 1,
        y: '0%'

    },'start+=0.3')
    .to(item.preview.DOM.image, {
        y: '101%'
    }, 'start')
    .to(item.preview.DOM.imageInner, {
        y: '-101%'
    }, 'start')
    
    // animate frame element
    .to(frameEl, {
        opacity: 0,
        y: '-100%',
        onComplete: () => {
            body.classList.remove('preview-visible');
            gsap.set(frameEl, {
                opacity: 1,
                y: '0%',
                // delay:1,

            })
        }
    }, 'start')

    .addLabel('grid', 'start+=0.6')

    .to(overlayRows, {
        //ease: 'expo',
        scaleY: 0,
       
        onComplete: () => {
            item.preview.DOM.el.classList.remove('preview--current');
            contentEl.classList.remove('content--hidden');
        }
    }, 'grid')
};

// let slideIndex = 0;
// const slides = this.DOM.slideImage;

// const showSlide = item => {
//     // Hide all slides
//     for (let i = 0; i < slides.length; i++) {
//       slides[i].classList.remove('active');
//     }
//     // Increment slide index
//     slideIndex++;
//     // If slide index is greater than number of slides, reset to 1
//     if (slideIndex > slides.length) {
//       slideIndex = 1;
//     }
//     // Show current slide
//     slides[slideIndex - 1].classList.add('active');
//     // Set timeout for next slide
//     setTimeout(showSlide, 3000); // Change image every 3 seconds
//   }
  


for (const item of items) {
    // Opens the item preview
    // item.DOM.link.addEventListener('click', () => openItem(item));
    item.DOM.el.addEventListener('click', () => openItem(item));
    // Closes the item preview
    item.preview.DOM.backCtrl.addEventListener('click', () => closeItem(item));
    // showSlide();
}
