import Swiper from 'swiper';
import {Navigation, Pagination, Controller, EffectFade, Autoplay, Thumbs} from 'swiper/modules';

Swiper.use([Navigation, Pagination, Controller, EffectFade, Autoplay, Thumbs]);


// Thumb slider

document.addEventListener('DOMContentLoaded', () => {
    // основной
    const productThumbsSwiper = new Swiper('.product__slider-thumbs', {
        spaceBetween: 16,
        slidesPerView: 7,
        breakpoints: {
            0: {
                spaceBetween: 8,
            },
            768: {
                spaceBetween: 16,
            },
        }
    })

// второстепенный
    const productMainSwiper = new Swiper(".product__slider-main", {
        spaceBetween: 10,
        thumbs: {
            swiper: productThumbsSwiper,
        },
        navigation: {
            nextEl: ".product__slider-nav--next",
            prevEl: ".product__slider-nav--prev",
        },

    });

    const relatedProductSwiper = new Swiper('.product__related-slider', {
        slidesPerView: 3,
        spaceBetween: 16,

        navigation: {
            nextEl: '.product__related-nav-btn--next',
            prevEl: '.product__related-nav-btn--prev',
        },
        breakpoints:{
            0:{
                slidesPerView: 'auto',
                spaceBetween: 8
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 16,
            }
        }
    })
// Видео-слайдер
    const videosSliderEl = document.querySelector('.product__videos-slider');
    const slidesCount = videosSliderEl.querySelectorAll('.swiper-slide').length;

    let slidesPerView = 3;
    let loop = true;

    let mobileSlides = 1.8;
    let desktopSlides = 3;

    if (slidesCount === 1) {
        mobileSlides = 1;
        desktopSlides = 1;
    }

    if (slidesCount === 2) {
        mobileSlides = 1.8;
        desktopSlides = 2;
    }

    if (slidesCount >= 3) {
        mobileSlides = 1.8;
        desktopSlides = 3;
    }

    if (slidesCount === 1) {
        slidesPerView = 1;
        loop = false;
        videosSliderEl.classList.add('is-one-slide');
    }

    if (slidesCount === 2) {
        slidesPerView = 2;
        loop = false;
        videosSliderEl.classList.add('is-two-slides');
    }

    if (slidesCount === 3) {
        slidesPerView = 3;
        loop = false;
        videosSliderEl.classList.add('is-three-slides');
    }

    const productVideosSlider = new Swiper('.product__videos-slider', {
        slidesPerView,
        spaceBetween: 16,
        loop,
        navigation: {
            nextEl: '.product__videos-next',
            prevEl: '.product__videos-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: mobileSlides,
                spaceBetween: 8,
            },
            600: {
                slidesPerView: desktopSlides,
                spaceBetween: 16,
            },
            768: {
                slidesPerView,
                spaceBetween: 16,
            },
        }
    });

    // Переключение видимости блока характеристик
    const detailsContent = document.querySelector('.product__details-content');
    const descriptionMoreBtn = document.querySelector('.product__description-more');

    if (detailsContent && descriptionMoreBtn) {
        // Проверяем, нужно ли показывать кнопку
        const checkButtonVisibility = () => {
            // Временно убираем ограничение высоты для проверки реальной высоты
            const originalMaxHeight = detailsContent.style.maxHeight;
            detailsContent.style.maxHeight = 'none';
            const fullHeight = detailsContent.scrollHeight;
            detailsContent.style.maxHeight = originalMaxHeight;

            if (fullHeight <= 400) {
                detailsContent.classList.remove('product__details-additional');
                descriptionMoreBtn.style.display = 'none';
            } else {
                detailsContent.classList.add('product__details-additional');
                descriptionMoreBtn.style.display = 'block';
            }
        };

        descriptionMoreBtn.addEventListener('click', () => {
            const isExpanded = detailsContent.classList.contains('product__details-content--expanded');

            if (isExpanded) {
                detailsContent.classList.remove('product__details-content--expanded');
                descriptionMoreBtn.setAttribute('aria-expanded', 'false');
                descriptionMoreBtn.textContent = 'Показать полностью';
            } else {
                detailsContent.classList.add('product__details-content--expanded');
                descriptionMoreBtn.setAttribute('aria-expanded', 'true');
                descriptionMoreBtn.textContent = 'Скрыть';
            }
        });

        // Проверяем при загрузке страницы (с небольшой задержкой для полной отрисовки)
        setTimeout(checkButtonVisibility, 100);
    }



// Выпадающий список доступности товара
    const availabilityToggle = document.querySelector('.product__availability-toggle');
    const availabilityDropdown = document.querySelector('.product__availability-dropdown');
    const availabilityItems = document.querySelectorAll('.product__availability-item');
    const availabilityContainer = document.querySelector('.product__availability');

    if (availabilityToggle && availabilityDropdown && availabilityContainer) {
        // Открытие / закрытие списка
        availabilityToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = availabilityContainer.getAttribute('aria-expanded') === 'true';

            availabilityContainer.setAttribute('aria-expanded', String(!isExpanded));
            availabilityToggle.setAttribute('aria-expanded', String(!isExpanded));
        });

        // Выбор элемента
        availabilityItems.forEach(item => {
            item.addEventListener('click', () => {
                const city = item.getAttribute('data-city');
                const itemStatusBadge = item.querySelector('.product__status-badge');
                const amount = parseInt(item.dataset.amount, 10);
                const status = item.dataset.status;

                // Элементы выбранного значения
                const selectedCity = availabilityToggle.querySelector('.product__city');
                const selectedStatusWrapper = availabilityToggle.querySelector('.product__status');

                updateAvailabilityBadge(
                    {
                        amount,
                        status,
                        quantity: parseInt(quantityInput.value, 10)
                    },
                    selectedStatusWrapper
                );

                // Обновляем город
                selectedCity.textContent = city;

                // aria-selected
                availabilityItems.forEach(i => i.setAttribute('aria-selected', 'false'));
                item.setAttribute('aria-selected', 'true');

                // Закрываем список
                availabilityContainer.setAttribute('aria-expanded', 'false');
                availabilityToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Закрытие при клике вне компонента
        document.addEventListener('click', (e) => {
            if (!availabilityContainer.contains(e.target)) {
                availabilityContainer.setAttribute('aria-expanded', 'false');
                availabilityToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Первый элемент выбран по умолчанию
        if (availabilityItems.length > 0) {
            availabilityItems[0].setAttribute('aria-selected', 'true');
        }
    }


    // Модальное окно "Бесплатное тестирование"
    const testingBtn = document.querySelector('.product__banner-btn');
    const testingPopup = document.querySelector('.product-testing-popup');
    const testingPopupClose = document.querySelector('.product-testing-popup__close');
    const testingPopupOverlay = document.querySelector('.product-testing-popup__overlay');
    const testingPopupForm = document.querySelector('.product-testing-popup__form');
    const testingCheckbox = document.querySelector('#product-testing-popup-checkbox');

    if (testingBtn && testingPopup) {
        // Устанавливаем чекбокс как отмеченный по умолчанию
        if (testingCheckbox) {
            testingCheckbox.checked = true;
        }

        // Открытие модального окна
        testingBtn.addEventListener('click', () => {
            testingPopup.classList.add('product-testing-popup--active');
            document.body.style.overflow = 'hidden';
        });

        // Закрытие модального окна
        const closeTestingPopup = () => {
            testingPopup.classList.remove('product-testing-popup--active');
            document.body.style.overflow = '';
        };

        if (testingPopupClose) {
            testingPopupClose.addEventListener('click', closeTestingPopup);
        }

        if (testingPopupOverlay) {
            testingPopupOverlay.addEventListener('click', closeTestingPopup);
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && testingPopup.classList.contains('product-testing-popup--active')) {
                closeTestingPopup();
            }
        });

        if (testingPopupForm) {
            testingPopupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                closeTestingPopup();
            });
        }
    }

    // Управление количеством товара
    const quantityInput = document.querySelector('.product__quantity-input');
    const quantityMinusBtn = document.querySelector('.product__quantity-btn--minus');
    const quantityPlusBtn = document.querySelector('.product__quantity-btn--plus');

    if (quantityInput && quantityMinusBtn && quantityPlusBtn) {
        // Функция обновления состояния кнопок
        const updateButtonsState = () => {
            const currentValue = parseInt(quantityInput.value, 10) || 1;
            if (currentValue <= 1) {
                quantityMinusBtn.disabled = true;
                quantityMinusBtn.classList.add('product__quantity-btn--disabled');
            } else {
                quantityMinusBtn.disabled = false;
                quantityMinusBtn.classList.remove('product__quantity-btn--disabled');
            }
        };

        // Функция обновления значения
        const updateQuantity = (value) => {
            const numValue = parseInt(value, 10);
            if (isNaN(numValue) || numValue < 1) {
                quantityInput.value = 1;
            } else {
                quantityInput.value = numValue;
            }
            updateButtonsState();
        };

        quantityInput.addEventListener('change', () => {
            updateQuantity(quantityInput.value);
            refreshAvailabilityFromQuantity();
        });

        const activeItem = document.querySelector('.product__availability-item[aria-selected="true"]');

        if (activeItem) {
            updateAvailabilityBadge(
                {
                    amount: parseInt(activeItem.dataset.amount, 10),
                    status: activeItem.dataset.status,
                    quantity: parseInt(quantityInput.value, 10)
                },
                document.querySelector('.product__availability-toggle .product__status')
            );
        }

        quantityPlusBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value, 10) || 1;
            const newValue = currentValue + 1;

            updateQuantity(newValue);
            refreshAvailabilityFromQuantity(newValue);
            refreshAllAvailabilityItems(newValue);
        });


        quantityMinusBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value, 10) || 1;
            if (currentValue > 1) {
                const newValue = currentValue - 1;

                updateQuantity(newValue);
                refreshAvailabilityFromQuantity(newValue);
                refreshAllAvailabilityItems(newValue);
            }
        });

        quantityInput.addEventListener('change', () => {
            const value = parseInt(quantityInput.value, 10) || 1;

            updateQuantity(value);
            refreshAvailabilityFromQuantity(value);
            refreshAllAvailabilityItems(value);
        });

        // Обработчик ввода в input (валидация в реальном времени)
        quantityInput.addEventListener('input', () => {
            const value = quantityInput.value;
            if (value === '' || value === '0') {
                updateButtonsState();
                return; // Разрешаем пустое значение или 0 во время ввода
            }
            const numValue = parseInt(value, 10);
            if (!isNaN(numValue) && numValue < 1) {
                quantityInput.value = '';
            }
            updateButtonsState();
        });

        // Обработчик потери фокуса - устанавливаем минимум 1
        quantityInput.addEventListener('blur', () => {
            const value = quantityInput.value;
            if (value === '' || parseInt(value, 10) < 1) {
                quantityInput.value = 1;
            }
            updateButtonsState();
        });

        // Инициализация состояния кнопок при загрузке
        updateButtonsState();
    }

    // Поиск в таблице запчастей
    const sparesSearchInput = document.querySelector('.product__spares-search-input');
    const sparesTable = document.querySelector('.product__spares-table');
    const sparesRows = document.querySelectorAll('.product__spares-row:not(.product__spares-row--head)');

    if (sparesSearchInput && sparesTable && sparesRows.length > 0) {
        // Функция нормализации текста для поиска (убирает пробелы, приводит к нижнему регистру)
        const normalizeText = (text) => {
            return text.toLowerCase().trim().replace(/\s+/g, ' ');
        };

        // Функция поиска
        const performSearch = (searchTerm) => {
            const normalizedSearch = normalizeText(searchTerm);
            let visibleCount = 0;

            sparesRows.forEach((row) => {
                // Получаем код товара и наименование из строки
                const codeCol = row.querySelector('.product__spares-col--code');
                const nameCol = row.querySelector('.product__spares-col--name');

                if (!codeCol || !nameCol) {
                    return;
                }

                const codeText = codeCol.textContent || '';
                const nameText = nameCol.textContent || '';
                const normalizedCode = normalizeText(codeText);
                const normalizedName = normalizeText(nameText);

                // Проверяем совпадение в коде или наименовании
                const matches = normalizedSearch === '' ||
                    normalizedCode.includes(normalizedSearch) ||
                    normalizedName.includes(normalizedSearch);

                if (matches) {
                    row.style.display = '';
                    visibleCount++;
                } else {
                    row.style.display = 'none';
                }
            });

            // Показываем сообщение, если ничего не найдено
            let noResultsMessage = sparesTable.querySelector('.product__spares-no-results');
            if (visibleCount === 0 && normalizedSearch !== '') {
                if (!noResultsMessage) {
                    noResultsMessage = document.createElement('div');
                    noResultsMessage.className = 'product__spares-no-results';
                    noResultsMessage.textContent = 'Ничего не найдено';
                    sparesTable.appendChild(noResultsMessage);
                }
                noResultsMessage.style.display = 'block';
            } else {
                if (noResultsMessage) {
                    noResultsMessage.style.display = 'none';
                }
            }
        };

        // Обработчик ввода в поле поиска
        sparesSearchInput.addEventListener('input', (e) => {
            performSearch(e.target.value);
        });

        // Обработчик очистки поиска (если браузер поддерживает)
        sparesSearchInput.addEventListener('search', (e) => {
            if (e.target.value === '') {
                performSearch('');
            }
        });

        // Обработчик клика на кнопку поиска (опционально)
        const sparesSearchIcon = document.querySelector('.product__spares-search-icon');
        if (sparesSearchIcon) {
            sparesSearchIcon.addEventListener('click', () => {
                sparesSearchInput.focus();
            });
        }
    }
});

document.querySelectorAll('.product__card-swiper').forEach((slider) => {
    const container = slider.closest('.product__card-slider');

    new Swiper(slider, {
        slidesPerView: 'auto',
        spaceBetween: 16,
        loop: true,
        navigation: {
            nextEl: container.querySelector('.product__card-next'),
            prevEl: container.querySelector('.product__card-prev'),
        },
        breakpoints: {
            0: { spaceBetween: 8 },
            768: { spaceBetween: 16 }
        }
    });
});

const productAddToCompare = document.querySelectorAll('.product__add-to-compare');
productAddToCompare.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
    })
})

const productAddToFavorite = document.querySelectorAll('.product__add-to-favorites');
productAddToFavorite.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
    })
})

const compareBtns = document.querySelectorAll('.product__card-compare');
const favoriteBtns = document.querySelectorAll('.product__card-favorite');
const addToCartBtns = document.querySelectorAll('.product__card-cart');

compareBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        btn.classList.toggle('active');
    })
})

favoriteBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        btn.classList.toggle('active');
    })
})

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        btn.classList.toggle('active');
    })
})


const productCheaperPopup = document.querySelector('.product-cheaper-popup')
const productCheaperShowBtns = document.querySelectorAll('.show-product-cheaper-popup')
const productCheaperCloseFormBtn = document.querySelector('.product-cheaper-popup .close-popup')
const productCheaperForm = document.querySelector('#product-cheaper-popup form')
const productCheaperSuccess = document.querySelector('.product-cheaper-popup .feedback-success')
const productCheaperSuccessBtn = document.querySelector('.product-cheaper-popup .success-btn')

productCheaperShowBtns.forEach(item => {
    item.addEventListener('click', () => {
        productCheaperPopup.classList.add('active')

        document.body.classList.add('no-scroll')
    })
})

productCheaperCloseFormBtn.addEventListener('click', () => {
    productCheaperForm.reset()
    productCheaperPopup.classList.remove('active')
    document.body.classList.remove('no-scroll')
    setTimeout(() => {
        productCheaperForm.style.display = 'block'
        productCheaperSuccess.style.display = 'none'
    })
})
productCheaperForm.addEventListener('submit', (event) => {
    event.preventDefault()

    productCheaperForm.style.display = 'none'
    productCheaperSuccess.style.display = 'block'
})

productCheaperSuccessBtn.addEventListener('click', () => {
    productCheaperForm.reset()
    setTimeout(() => {
        productCheaperPopup.classList.remove('active')
        document.body.classList.remove('no-scroll')
        setTimeout(() => {
            productCheaperForm.style.display = 'block'
            productCheaperSuccess.style.display = 'none'
        }, 300)
    }, 0)
})

document.addEventListener('click', (event) => {
    if (event.target === popup) {
        productCheaperForm.reset()
        productCheaperPopup.classList.remove('active')
        document.body.classList.remove('no-scroll')
        setTimeout(() => {
            productCheaperForm.style.display = 'flex'
            productCheaperSuccess.style.display = 'none'
        }, 300)
    }
});

const copyBtn = document.querySelector(".product__code");
const textToCopy = document.getElementById("text-to-copy");
const notification = document.getElementById("copy-notification");

function copyText() {
    // Выделяем текст
    // textToCopy.select();
    textToCopy.setSelectionRange(0, 99999);

    // Пытаемся скопировать
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            // Показываем уведомление
            notification.style.display = "block";
            setTimeout(() => {
                notification.style.display = "none";
            }, 2000);
        }
    } catch (err) {}
}

// Настройка
if (textToCopy) {
    textToCopy.style.width = textToCopy.value.length  + 'ch';
}

if (copyBtn) {
    copyBtn.addEventListener('click', copyText);
    copyBtn.style.cursor = 'pointer';
}

// Скрываем уведомление изначально
if (notification) {
    notification.style.display = 'none';
}


// product__add-to-cart

const addToCartBtn = document.querySelector('.product__add-to-cart');

addToCartBtn?.addEventListener('click', () => {
    addToCartBtn.classList.toggle('active');

})

// Обработка кнопок "Добавить" в связанных товарах
const relatedBtns = document.querySelectorAll('.product__related-btn');

relatedBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const relatedItem = this.closest('.product__related-item');
        const actionsContainer = relatedItem.querySelector('.product__related-actions');

        if (!actionsContainer) return;

        // Скрываем кнопку и показываем контейнер с счетчиком и корзиной
        this.style.display = 'none';
        actionsContainer.style.display = 'flex';
    });
});

// Делегирование событий для счетчика
document.addEventListener('click', function(e) {
    if (e.target.closest('.product__related-counter-btn--minus')) {
        const counter = e.target.closest('.product__related-counter');
        const counterValue = counter.querySelector('.product__related-counter-value');
        let value = parseInt(counterValue.textContent, 10);
        if (value > 1) {
            value--;
            counterValue.textContent = value;
        }
    }

    if (e.target.closest('.product__related-counter-btn--plus')) {
        const counter = e.target.closest('.product__related-counter');
        const counterValue = counter.querySelector('.product__related-counter-value');
        let value = parseInt(counterValue.textContent, 10);
        value++;
        counterValue.textContent = value;
    }

    if (e.target.closest('.product__related-cart-icon')) {
        const cartIcon = e.target.closest('.product__related-cart-icon');
        cartIcon.classList.toggle('active');
    }
});

const addToCartSparesBtns = document.querySelectorAll('.product__spares-cart');

addToCartSparesBtns.forEach(btn => {
    btn.addEventListener('click', (e) =>
    {
        e.preventDefault();
        e.stopPropagation();
        btn.classList.toggle('active');
    })
})

function updateAvailabilityBadge({ amount, status, quantity }, container) {
    container.innerHTML = '';

    // expected — ничего не добавляем
    if (status === 'expected') {
        const badge = document.createElement('div');
        badge.className = 'product__status-badge product__status-badge--expected';
        badge.innerHTML = '<span>Ожидается к поступлению</span>';
        container.appendChild(badge);
        return;
    }

    // количество 1 — оставляем "как есть"
    if (quantity <= 1 && amount > 0) {
        const badge = document.createElement('div');
        badge.className = 'product__status-badge product__status-badge--in-stock';
        badge.innerHTML = '<span>В наличии</span>';
        container.appendChild(badge);
        return;
    }

    // data-amount = 0 → всё под заказ
    if (amount === 0) {
        const badge = document.createElement('div');
        badge.className = 'product__status-badge product__status-badge--order';
        badge.innerHTML = `<span>Под заказ ${quantity} шт</span>`;
        container.appendChild(badge);
        return;
    }

    // хватает на складе
    if (quantity <= amount) {
        const badge = document.createElement('div');
        badge.className = 'product__status-badge product__status-badge--in-stock';
        badge.innerHTML = `<span>В наличии ${quantity} шт</span>`;
        container.appendChild(badge);
        return;
    }

    // не хватает — делим
    const inStockQty = amount;
    const orderQty = quantity - amount;

    const inStockBadge = document.createElement('div');
    inStockBadge.className = 'product__status-badge product__status-badge--in-stock';
    inStockBadge.innerHTML = `<span>В наличии ${inStockQty} шт</span>`;

    const orderBadge = document.createElement('div');
    orderBadge.className = 'product__status-badge product__status-badge--order';
    orderBadge.innerHTML = `<span>Под заказ ${orderQty} шт</span>`;

    container.append(inStockBadge, orderBadge);
}

function refreshAvailabilityFromQuantity(quantity) {
    const activeItem = document.querySelector('.product__availability-item[aria-selected="true"]');
    const statusContainer = document.querySelector('.product__availability-toggle .product__status');

    if (!activeItem || !statusContainer) return;

    updateAvailabilityBadge(
        {
            amount: parseInt(activeItem.dataset.amount, 10),
            status: activeItem.dataset.status,
            quantity
        },
        statusContainer
    );
}

function updateAvailabilityItemBadge(item, quantity) {
    const status = item.dataset.status;
    const amount = parseInt(item.dataset.amount, 10);
    const statusContainer = item.querySelector('.product__status');

    if (!statusContainer) return;

    updateAvailabilityBadge(
        {
            amount,
            status,
            quantity
        },
        statusContainer
    );
}

function refreshAllAvailabilityItems(quantity) {
    document.querySelectorAll('.product__availability-item').forEach(item => {
        updateAvailabilityItemBadge(item, quantity);
    });
}
