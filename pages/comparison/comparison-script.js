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
    // названия строк компенсируют сдвиг слайдера и остаются на месте
    const names = slider.querySelectorAll('.comparison-info__name');

    return new Swiper(slider, {
        allowTouchMove: false,

        on: {
            setTranslate(swiper, translate) {
                names.forEach((name) => {
                    name.style.transform = `translateX(${-translate}px)`;
                });
            },

            setTransition(swiper, duration) {
                names.forEach((name) => {
                    name.style.transitionDuration = `${duration}ms`;
                });
            },
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

const toast = document.createElement('div');
toast.className = 'comparison-toast';
toast.setAttribute('role', 'status');
toast.setAttribute('aria-live', 'polite');
document.body.append(toast);

let toastTimer;

const showToast = (text) => {
    toast.textContent = text;
    toast.classList.add('active');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove('active');
    }, 2000);
};

// navigator.clipboard доступен только по https и на localhost и может быть запрещён браузером,
// поэтому при отказе пробуем запасной вариант
const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(text);
            return;
        } catch {
            // переходим к запасному варианту
        }
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.append(textarea);
    textarea.select();

    const isCopied = document.execCommand('copy');
    textarea.remove();

    if (!isCopied) {
        throw new Error('copy failed');
    }
};

shareButton?.addEventListener('click', async () => {
    try {
        await copyText(window.location.href);
        showToast('Скопировано!');
    } catch {
        showToast('Не удалось скопировать ссылку');
    }
});

// строка одинаковая, если у всех товаров совпадает значение;
// такие строки помечаются во всех колонках сразу, чтобы строки не разъезжались
const markSameRows = () => {
    document.querySelectorAll('.comparison-info__item').forEach((item) => {
        const slides = item.querySelectorAll('.comparison-info__swiper .swiper-slide');
        const columns = [...slides].map((slide) => [...slide.querySelectorAll('.comparison-info__row')]);
        const rowsCount = Math.max(0, ...columns.map((rows) => rows.length));
        let hasDifferences = false;

        for (let i = 0; i < rowsCount; i++) {
            const rows = columns.map((column) => column[i]).filter(Boolean);
            const values = rows.map((row) => {
                const value = row.querySelector('.comparison-info__value');
                return value ? value.textContent.replace(/\s+/g, ' ').trim() : '';
            });
            const isSame = new Set(values).size <= 1;

            rows.forEach((row) => row.classList.toggle('comparison-info__row--same', isSame));
            hasDifferences ||= !isSame;
        }

        item.classList.toggle('comparison-info__item--same', !hasDifferences);
    });
};

markSameRows();

const comparisonInfo = document.querySelector('.comparison-info');
const comparisonSwitch = document.querySelector('.comparison-switch__input');

comparisonSwitch?.addEventListener('change', () => {
    comparisonInfo.classList.toggle('comparison-info--diff-only', comparisonSwitch.checked);

    infoSliders.forEach((slider) => {
        slider.update();
    });
});
});


