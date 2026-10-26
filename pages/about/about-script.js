import Swiper from 'swiper';
import {Navigation, Pagination, Controller, EffectFade, Autoplay, Thumbs} from 'swiper/modules';

Swiper.use([Navigation, Pagination, Controller, EffectFade, Autoplay, Thumbs]);

document.addEventListener('DOMContentLoaded', () => {
    
    const AboutProductSlider = new Swiper('.about__products_slider .swiper', {
        slidesPerView: 5,
        spaceBetween: 8,
        loop: true,
        navigation: {
            nextEl: '.slider__next',
            prevEl: '.slider__prev',
        },
        pagination: {
            el: '.about__products_slider-pagger',
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1.34,
                spaceBetween: 8,
            },
            350: {
                slidesPerView: 1.65,
                spaceBetween: 8,
            },
            480: {
                slidesPerView: 2.16,
                spaceBetween: 8,
            },
            600: {
                slidesPerView: 3.1,
                spaceBetween: 8,
            },
            730: {
                slidesPerView: 3,
                spaceBetween: 8,
            },
            900: {
                slidesPerView: 3.5,
                spaceBetween: 16,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 16,
            },
            1277: {
                slidesPerView: 5,
                spaceBetween: 16,
            },
            
        }
    });

    const AboutVideosSlider = document.querySelector('.about__videos_slider');
    const AboutVideosItem = AboutVideosSlider.querySelectorAll('.about__videos_item');

    const AboutVideosNextBtn = document.querySelector('.about__videos_next');
    const AboutVideosPrevBtn = document.querySelector('.about__videos_prev');

    if (AboutVideosItem.length <= 1) {
        sliderEl.classList.remove('swiper');
        slides.forEach(slide => slide.style.width = '100%');
        if (AboutVideosPrevBtn) nextBtn.style.display = 'none';
        if (AboutVideosNextBtn) prevBtn.style.display = 'none';
    } else {
        new Swiper('.about__videos_slider', {
            slidesPerView: 1,
            spaceBetween: 8,
            loop: true,
            speed: 600,
            navigation: {
                nextEl: '.about__videos_next',
                prevEl: '.about__videos_prev',
            },
            pagination: {
                el: '.about__videos_slider-pagger',
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 8,
                },
                320: {
                    slidesPerView: 1.3,
                    spaceBetween: 8,
                },
                480: {
                    slidesPerView: 2,
                    spaceBetween: 8,
                },
                769: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                },
            }
        });
    }


        const GallerySlider = document.querySelector('.about__gallery_slider');
        const GalleryItem = GallerySlider.querySelectorAll('.about__gallery_item');

        const nextBtn = document.querySelector('.about__gallery_next');
        const prevBtn = document.querySelector('.about__gallery_prev');

        if (GalleryItem.length <= 1) {
            GallerySlider.classList.remove('swiper');
            GalleryItem.forEach(slide => slide.style.width = '100%');
            if (nextBtn) nextBtn.style.display = 'none';
            if (prevBtn) prevBtn.style.display = 'none';
        } else {
        new Swiper('.about__gallery_slider', {
            slidesPerView: 1,
            spaceBetween: 8,
            loop: true,
            speed: 500,
            navigation: {
                nextEl: '.about__gallery_next',
                prevEl: '.about__gallery_prev',
            },
            pagination: {
                el: '.about__gallery_slider-pagger',
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1.34,
                    spaceBetween: 8,
                },
                350: {
                    slidesPerView: 1.5,
                    spaceBetween: 8,
                },
                425: {      
                    slidesPerView: 1.9,
                    spaceBetween: 8,
                },
                480: {
                    slidesPerView: 2.3,
                    spaceBetween: 8,
                },
                600: {
                    slidesPerView: 3,
                    spaceBetween: 8,
                },
                769: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 16,
                },
                1100: {
                    slidesPerView: 5,
                    spaceBetween: 16,
                },
                1742: {
                    slidesPerView: 7,
                    spaceBetween: 16,
                },
            }
        });
    }

document.querySelectorAll('.js-loyalty-sort').forEach(sort => {
    const current = sort.querySelector('.loyalty-sort__current');
    const value = sort.querySelector('.loyalty-sort__value');
    const optionsWrap = sort.querySelector('.loyalty-sort__options');
    const rows = document.querySelectorAll('.loyalty-table__row');
    const empty = document.querySelector('.loyalty-history__empty');

    let selectedOption = optionsWrap.querySelector('.loyalty-sort__option');

    value.textContent = selectedOption.textContent.trim();
    selectedOption.remove();

    const applyFilter = type => {
        let visibleRows = 0;

        rows.forEach(row => {
            const show = type === 'all' || row.dataset.type === type;

            row.hidden = !show;

            if (show) visibleRows++;
        });

        if (empty) {
            empty.hidden = visibleRows > 0;
        }
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