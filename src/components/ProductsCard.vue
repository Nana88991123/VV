<script>
export default {
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    emits: ["add"],
    methods: {
        goDetail() {
            this.$router.push(
                `/products/${this.product.id}`
            );
        },
        goCategory() {
            this.$router.push(
                `/products/category/${this.product.category}`
            );
        }
    }
}


</script>
<template>
    <div class="card h-100 border-1 shadow-sm rounded-4" @click="goDetail">
        <!--圖片顯示區-->
        <div class="p-3 pb-0">
            <div class="border rounded-4 overflow-hidden">
                <img :src="product.image" :alt="product.name">
            </div>
        </div>
        <!--商品內容區-->
        <div class="card-body d-flex flex-column p-4 pt-3">
            <!--商品分類-->
            <div class="mb-3 mt-3">
                <span @click.stop="goCategory" class="rounded-pill bg-primary-subtle text-primary px-3 py-2">
                    {{ product.category }}
                </span>
            </div>
            <h3 class="card-title fw-bold mb-3">
                {{ product.name }}
            </h3>
            <p class="card-text text-secondary small 1h-lg mb-4">
                {{ product.description }}
            </p>
            <!--底部區域-->
            <div>
                <!--價格-->
                <span class="text-danger small me-1">
                    NT$
                </span>
                <span class="text-danger fs-5 fw-bold">
                    {{ product.price.toLocaleString() }}
                </span>
                <button class="btn btn-primary w-100 py-2 rounded-3 fw-bold mt-3" type="button"
                    @click.stop="$emit(`add`, product)">
                    加入購物車
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.category{
    display: inline;
    cursor: pointer;
}
.category:hover{
    color:white;
    background-color:blue;
    transform: translateY(-5px);
}

</style>