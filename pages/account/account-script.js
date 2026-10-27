import Swiper from 'swiper';
import {Navigation, Pagination, Controller, EffectFade, Autoplay, Thumbs} from 'swiper/modules';

Swiper.use([Navigation, Pagination, Controller, EffectFade, Autoplay, Thumbs]);

const MOBILE_WIDTH = 768;
const TABLET_WIDTH = 1024;

document.addEventListener('DOMContentLoaded', () => {
    const productSliderElement = document.querySelector('.orders-card__swiper');

    if (productSliderElement) {
        new Swiper(productSliderElement, {
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
    }


    const nav = document.querySelector('.account-nav');
    const menuButton = document.querySelector('.account-nav__actions');
    const closeButton = document.querySelector('.account-nav__close');
    const overlay = document.querySelector('.account-overlay');
    const mobile = window.matchMedia(`(max-width: ${MOBILE_WIDTH}px)`);
    const tablet = window.matchMedia(`(max-width: ${TABLET_WIDTH}px)`);

    if (nav) {
        const navToggles = nav.querySelectorAll('.account-nav__toggle');

        const openMenu = () => {
            nav.classList.add('is-expanded');
            overlay?.classList.add('is-visible');
            menuButton?.setAttribute('aria-expanded', 'true');
            document.body.classList.toggle('account-locked', mobile.matches);
        };

        const closeMenu = () => {
            nav.classList.remove('is-expanded');
            overlay?.classList.remove('is-visible');
            menuButton?.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('account-locked');
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


    const sortClosers = [];

    document.querySelectorAll('.js-loyalty-sort').forEach(sort => {
        const current = sort.querySelector('.loyalty-sort__current');
        const value = sort.querySelector('.loyalty-sort__value');
        const optionsWrap = sort.querySelector('.loyalty-sort__options');

        if (!current || !value || !optionsWrap) return;

        const options = [...optionsWrap.querySelectorAll('.loyalty-sort__option')];
        if (!options.length) return;

        const scope = sort.closest('.loyalty-history') || document;
        const rows = [...scope.querySelectorAll('.loyalty-table__row')];

        const close = () => {
            sort.classList.remove('active');
            current.setAttribute('aria-expanded', 'false');
        };

        const open = () => {
            sort.classList.add('active');
            current.setAttribute('aria-expanded', 'true');
        };

        const applyFilter = type => {
            let visible = 0;

            rows.forEach(row => {
                const hidden = type !== 'all' && row.dataset.type !== type;

                row.hidden = hidden;
                // зебра считается по видимым строкам, без :nth-child(... of ...)
                row.classList.toggle('is-even', !hidden && visible++ % 2 === 1);
            });
        };

        const select = option => {
            options.forEach(item => {
                const selected = item === option;

                item.classList.toggle('is-selected', selected);
                item.setAttribute('aria-selected', String(selected));
            });

            value.textContent = option.textContent.trim();
            applyFilter(option.dataset.value);
        };

        current.addEventListener('click', () => {
            sort.classList.contains('active') ? close() : open();
        });

        current.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                e.preventDefault();
                open();
                options.find(option => !option.classList.contains('is-selected'))?.focus();
            }
        });

        optionsWrap.addEventListener('click', e => {
            const option = e.target.closest('.loyalty-sort__option');
            if (!option) return;

            select(option);
            close();
            current.focus();
        });

        optionsWrap.addEventListener('keydown', e => {
            const option = e.target.closest('.loyalty-sort__option');
            if (!option) return;

            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                select(option);
                close();
                current.focus();
                return;
            }

            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();

                const visible = options.filter(item => !item.classList.contains('is-selected'));
                const step = e.key === 'ArrowDown' ? 1 : -1;
                const next = visible[(visible.indexOf(option) + step + visible.length) % visible.length];

                next?.focus();
            }
        });

        sort.addEventListener('focusout', e => {
            if (!sort.contains(e.relatedTarget)) close();
        });

        sortClosers.push({sort, current, close});

        select(options[0]);
    });

    if (sortClosers.length) {
        document.addEventListener('click', e => {
            sortClosers.forEach(({sort, close}) => {
                if (!sort.contains(e.target)) close();
            });
        });

        document.addEventListener('keydown', e => {
            if (e.key !== 'Escape') return;

            sortClosers.forEach(({sort, current, close}) => {
                if (!sort.classList.contains('active')) return;

                close();
                current.focus();
            });
        });
    }
});
