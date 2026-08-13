import { resolve } from 'path'
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars';


export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                mainPage: resolve(__dirname, 'index.html'),
                catalogPage: resolve(__dirname, './pages/catalog/catalog-page.html'),
                productPage: resolve(__dirname, './pages/product/product-page.html'),
                productSale: resolve(__dirname, './pages/product/product-sale-page.html'),
                productDoublePrice: resolve(__dirname, './pages/product/product-doublePrice-page.html'),
                subcategoriesPage: resolve(__dirname, './pages/catalog/subcategories-page.html'),
                blogPage: resolve(__dirname, './pages/blog/blog-page.html'),
                assetsPage: resolve(__dirname, './pages/assets/assets-page.html'),
                errorPage: resolve(__dirname, './pages/error/error-page.html'),
                leasingPage: resolve(__dirname, './pages/leasing/leasing-page.html'),
                faqPage: resolve(__dirname, './pages/faq/faq-page.html'),
                aboutPage: resolve(__dirname, './pages/about/about-page.html'),
                dealersPage: resolve(__dirname, './pages/dealers/dealers-page.html'),
                servicePage: resolve(__dirname, './pages/service/service-page.html'),
                searchPage: resolve(__dirname, './pages/catalog/search-page.html'),
                searchEmptyPage: resolve(__dirname, './pages/catalog/searchempty-page.html'),
                cartPage: resolve(__dirname, './pages/cart/cart-page.html'),
                cartEmptyPage: resolve(__dirname, './pages/cart/cartEmpty-page.html'),
                SolutionPage: resolve(__dirname, './pages/solution/solution-page.html'),
                reviewsPage: resolve(__dirname, './pages/reviews/reviews-page.html'),
                deliveryPage: resolve(__dirname, './pages/delivery/delivery-page.html'),
                solutionCatalogPage: resolve(__dirname, './pages/solution/solutionCatalog-page.html'),
                solutionCatalogPage: resolve(__dirname, './pages/solution/solutionCatalog-page.html'),
                loginPage: resolve(__dirname, './pages/auth/login-page.html'),
                registerPage: resolve(__dirname, './pages/auth/register-page.html'),
                resetPage: resolve(__dirname, './pages/auth/reset-page.html'),
                successPage: resolve(__dirname, './pages/auth/success-page.html')
            },
            output: {
                entryFileNames: 'assets/[name].js',
                chunkFileNames: 'assets/[name].js',
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name.endsWith('.css')) {
                        return 'assets/[name][extname]'
                    }
                    return 'assets/[name][extname]'
                },
            },
        },
    },
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, 'partials'),
        }),
    ],
})