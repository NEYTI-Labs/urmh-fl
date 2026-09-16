const products = document.querySelector('.favorites__products');

const btnGrid = document.querySelector('.js-favorites-view-grid');
const btnRow = document.querySelector('.js-favorites-view-row');

if (products && btnGrid && btnRow) {
    btnGrid.addEventListener('click', () => {
        products.classList.add('grid');
        products.classList.remove('row');

        btnGrid.classList.add('active');
        btnRow.classList.remove('active');
    });

    btnRow.addEventListener('click', () => {
        products.classList.add('row');
        products.classList.remove('grid');

        btnRow.classList.add('active');
        btnGrid.classList.remove('active');
    });
}