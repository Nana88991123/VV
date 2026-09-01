<script>
import{useProductStore} from "../stores/products.js"
export default {

    data() {
        return {
            productStore:useProductStore()
        }
    },
    computed:{
        product(){
            return this.productStore.getProductById(this.$route.params.id)
        }
    },

   

    mounted() {
        this.productStore.fetchProducts()
    }

};
</script>


<template>
    <main class="page">
        <!-- 返回上一頁 -->
        <div class="page-header">

            <RouterLink to="/products" class="back-link">
                ← 返回商品列表
            </RouterLink>

        </div>


        <!-- 載入中 -->
        <section v-if="productStore.isLoading" class="status-card">

            <div class="loading-icon">
                ⏳
            </div>

            <h2>商品資料載入中</h2>

            <p>
                正在幫你取得商品資訊...
            </p>

        </section>


        <!-- 發生錯誤 -->
        <section v-else-if="productStore.errorMessage" class="status-card">

            <div class="status-icon">
                ⚠️
            </div>

            <h2>
                商品資料讀取失敗
            </h2>

            <p class="error">
                {{ productStore.errorMessage }}
            </p>

        </section>


        <!-- 商品存在 -->
        <section v-else-if="product" class="product-detail">

            <!-- 左側商品視覺區 -->
            <div class="product-visual">

                <div class="product-icon">
                    🛍️
                </div>

                <span class="visual-text">
                    商品圖片
                </span>

            </div>


            <!-- 右側商品資訊 -->
            <div class="product-info">

                <span class="badge">
                    {{ product.category }}
                </span>


                <h1 class="product-title">
                    {{ product.name }}
                </h1>


                <p class="product-id">
                    商品編號：
                    #{{ product.id }}
                </p>


                <div class="divider"></div>


                <p class="product-description">
                    {{ product.description }}
                </p>


                <div class="price-area">

                    <span class="price-label">
                        售價
                    </span>

                    <div class="product-price">

                        <small>
                            NT$
                        </small>

                        {{
                            product.price.toLocaleString()
                        }}

                    </div>

                </div>


                <div class="product-actions">

                    <RouterLink to="/products" class="btn">
                        返回商品列表
                    </RouterLink>

                </div>

            </div>

        </section>


        <!-- 找不到商品 -->
        <section v-else class="status-card">

            <div class="status-icon">
                🔍
            </div>

            <h1>
                找不到商品
            </h1>

            <p>
                找不到商品 ID：
                <strong>
                    {{ $route.params.id }}
                </strong>
            </p>

            <RouterLink to="/products" class="btn">
                返回商品列表
            </RouterLink>

        </section>

    </main>

</template>