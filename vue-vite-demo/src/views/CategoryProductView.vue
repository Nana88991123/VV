<script>

// 1. 匯入 ProductCard 元件
import ProductCard from "../components/ProductsCard.vue"
import Cart from "../views/CartView.vue"
import { useProductStore } from "../stores/products.js"
import { useCartStore } from "../stores/cart.js"

export default {

    // 2. 註冊元件
    components: {
        ProductCard
    },

    data() {
        return {
            productStore: useProductStore(),
            cartStore: useCartStore()
        }
    },
    computed: {
        product() {
            return this.productStore.getProductByCategroy(this.$route.params.category)
        }
    },

    methods: {
        addToCart(product) {
            this.cartStore.addToCart(product)
        }
    },

    mounted() {
        this.productStore.fetchProducts()
    }
}
</script>

<template>

    <main class="page">

        <!-- ==================== 頁首 ==================== -->
        <!--<section class="hero">
            
        </section>-->

        <!--=====Banner=====-->

        <!--=====載入中=====-->

        <section v-if="productStore.isLoding">
            <p>
                商品資料載入中...
            </p>
        </section>

        <!---========錯誤訊息==========>-->
        <section v-else-if="productStore.errorMessages">
            <p>
                {{ productStore.errorMessages }}
            </p>
        </section>

        <!--===商品列表=====-->
        <section v-else class="product-grid">
            <ProductCard v-for="product in product" :key="product.id" :product="product"
                @add="addToCart" />

        </section>

        <!--<section class="card">
            <cart :cart="cart" />
        
        </section>-->

    </main>

</template>