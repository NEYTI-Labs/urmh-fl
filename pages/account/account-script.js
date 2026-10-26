import Swiper from 'swiper';
import {Navigation, Pagination, Controller, EffectFade, Autoplay, Thumbs} from 'swiper/modules';

Swiper.use([Navigation, Pagination, Controller, EffectFade, Autoplay, Thumbs]);

document.addEventListener('DOMContentLoaded', () => {
    const productSliderElement = document.querySelector('.orders-card__swiper');
    const productSlider = new Swiper(productSliderElement, {
    watchOverflow: true,
    loop: true,

    navigation: {
        nextEl: '.product__card-next',
        prevEl: '.product__card-prev',
    },

    pagination: {
        el: '.orders-card__slider_pagger',
        clickable: true,
    },

    breakpoints: {
        0: {
            slidesPerView: 1.3,
            spaceBetween: 8,
        },

        768: {
            slidesPerView: 2,
            spaceBetween: 16,
        },

        1500: {
            slidesPerView: 3,
            spaceBetween: 16,
        },

        1725: {
            slidesPerView: 4,
            spaceBetween: 16,
        },
    },
});


const nav = document.querySelector('.account-nav');
const menuButton = document.querySelector('.account-nav__actions');
const closeButton = document.querySelector('.account-nav__close');
const overlay = document.querySelector('.account-overlay');
const mobile = window.matchMedia('(max-width: 768px)');
const tablet = window.matchMedia('(max-width: 1024px)');

if (nav) {
    const navToggles = nav.querySelectorAll('.account-nav__toggle');

    const openMenu = () => {
        nav.classList.add('is-expanded');
        overlay?.classList.add('is-visible');
        menuButton?.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
        nav.classList.remove('is-expanded');
        overlay?.classList.remove('is-visible');
        menuButton?.setAttribute('aria-expanded', 'false');
    };

    menuButton?.addEventListener('click', () => {
        nav.classList.contains('is-expanded') ? closeMenu() : openMenu();
    });

    closeButton?.addEventListener('click', closeMenu);
    overlay?.addEventListener('click', closeMenu);

    navToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.account-nav__item');
            const isOpen = item.classList.toggle('is-open');
            btn.setAttribute('aria-expanded', String(isOpen));
        });
    });

    nav.addEventListener('click', e => {
        if (!tablet.matches || mobile.matches || nav.classList.contains('is-expanded')) return;

        const link = e.target.closest('.account-nav__link');
        if (!link) return;

        openMenu();

        if (!link.classList.contains('account-nav__toggle')) {
            e.preventDefault();
        }
    }, true);

    document.addEventListener('click', e => {
        if (tablet.matches && !mobile.matches && !nav.contains(e.target)) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeMenu();
    });

    mobile.addEventListener('change', closeMenu);
    tablet.addEventListener('change', closeMenu);
}


document.querySelectorAll('.js-loyalty-sort').forEach(sort => {
    const current = sort.querySelector('.loyalty-sort__current');
    const value = sort.querySelector('.loyalty-sort__value');
    const optionsWrap = sort.querySelector('.loyalty-sort__options');
    const rows = document.querySelectorAll('.loyalty-table__row');

    let selectedOption = optionsWrap.querySelector('.loyalty-sort__option');

    if (!current || !value || !optionsWrap || !selectedOption) return;

    value.textContent = selectedOption.textContent.trim();
    selectedOption.remove();

    const applyFilter = type => {
        rows.forEach(row => {
            row.hidden = type !== 'all' && row.dataset.type !== type;
        });
    };

    current.addEventListener('click', () => {
        sort.classList.toggle('active');
    });

    optionsWrap.addEventListener('click', e => {
        const option = e.target.closest('.loyalty-sort__option');

        if (!option) return;

        optionsWrap.appendChild(selectedOption);

        selectedOption = option;
        value.textContent = option.textContent.trim();
        option.remove();

        sort.classList.remove('active');

        applyFilter(option.dataset.value);
    });

    document.addEventListener('click', e => {
        if (!sort.contains(e.target)) {
            sort.classList.remove('active');
        }
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            sort.classList.remove('active');
        }
    });

    applyFilter('all');
});
});