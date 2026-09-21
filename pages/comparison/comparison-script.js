import Swiper from 'swiper';
import {Navigation, Pagination, Controller, EffectFade, Autoplay, Thumbs} from 'swiper/modules';

Swiper.use([Navigation, Pagination, Controller, EffectFade, Autoplay, Thumbs]);

document.addEventListener('DOMContentLoaded', () => {

const categoriesSlider = new Swiper('.comparison-categories_mobile', {
    slidesPerView: 'auto',
    spaceBetween: 8,
    freeMode: true,
    grabCursor: true,
});

const productSliderElement = document.querySelector('.product__card-swiper');
const productSlider = new Swiper(productSliderElement, {
    watchOverflow: true,

    navigation: {
        nextEl: '.product__card-next',
        prevEl: '.product__card-prev',
    },

    pagination: {
        el: '.product__card-pagination',
        clickable: true,
    },

    breakpoints: {
        0: {
            slidesPerView: 2,
            spaceBetween: 8,
        },

        768: {
            slidesPerView: 2,
            spaceBetween: 16,
        },

        1024: {
            slidesPerView: 3,
            spaceBetween: 16,
        },

        1350: {
            slidesPerView: 4,
            spaceBetween: 16,
        },

        1650: {
            slidesPerView: 5,
            spaceBetween: 16,
        },
    },
});

const comparisonSliders = document.querySelectorAll('.comparison-info__swiper');
const infoSliders = [...comparisonSliders].map((slider) => {
    return new Swiper(slider, {
        allowTouchMove: false,

        breakpoints: {
            0: {
                slidesPerView: 2,
                spaceBetween: 8,
            },

            768: {
                slidesPerView: 2,
                spaceBetween: 16,
            },
            
            1024: {
                slidesPerView: 3,
                spaceBetween: 16,
            },

            1350: {
                slidesPerView: 4,
                spaceBetween: 16,
            },

            1650: {
                slidesPerView: 5,
                spaceBetween: 16,
            },
        },
    });
});

let resizeTimer;

window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
        productSlider.update();

        infoSliders.forEach((slider) => {
            slider.update();
        });
    }, 100);
});

productSlider.on('slideChange', () => {

    infoSliders.forEach((slider) => {

        slider.slideTo(productSlider.realIndex);

    });

});

document.querySelectorAll('.comparison-info__head_btn').forEach((button) => {
    button.addEventListener('click', () => {
        const item = button.closest('.comparison-info__item');
        const isHidden = item.classList.toggle('comparison-info__item--hidden');

        button.setAttribute('aria-expanded', !isHidden);
    });
});

const mobileButton = document.querySelector('.comparison-actions_mobile');
const actions = document.querySelector('.comparison-actions');
const overlay = document.querySelector('.comparison-overlay');

mobileButton.addEventListener('click', () => {
    actions.classList.add('active');
    overlay.classList.add('active');
});

overlay.addEventListener('click', () => {
    actions.classList.remove('active');
    overlay.classList.remove('active');
});

const closeButton = document.querySelector('.comparison-actions_close');

closeButton.addEventListener('click', () => {
    actions.classList.remove('active');
    overlay.classList.remove('active');
});

const shareButton = document.querySelector('.js-share-btn');

shareButton?.addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href);
});

const comparisonSwitch = document.querySelector('.comparison-switch__input');

comparisonSwitch?.addEventListener('change', () => {
    const rows = document.querySelectorAll('.comparison-info__row');

    rows.forEach((row) => {
        row.classList.toggle(
            'comparison-info__row--hidden',
            comparisonSwitch.checked &&
            !row.classList.contains('comparison-info__row--different')
        );
    });

    infoSliders.forEach((slider) => {
        slider.update();
    });
});
});


