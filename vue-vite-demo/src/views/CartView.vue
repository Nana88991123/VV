<script>
import { useCartStore } from "../stores/cart"
export default {
    data() {
        return {
            cartStore: useCartStore()
        }
    },
}

</script>

<template>
    <main class="page">
        <section class="card">
            <h2>
                購物車
            </h2>

            <!--購物車為空-->
            <p v-if="cartStore.isEmpty" class="text-muted">
                購物車目前沒有商品
            </p>

            <!--購物車商品-->
            <ul v-else class="cart-list">
                <li v-for="item in cartStore.cart" :key="item.id" class="cart-item">
                    <!--商品資料-->
                    <div>
                        <h3>
                            {{item.name}}
                        </h3>
                        <p class="text-muted">
                            單價
                            ${{item.price.toLocaleString()}}
                        </p>
                        <p>
                            小計:
                            ${{
                                (
                                    item.price *
                                    item.quantity
                                ).toLocaleString()
                            }}
                        </p>
                    </div>

                    <!--數量控制-->
                    <div class="cart-actions">
                        <button @click="cartStore.decreaseQuantity(item.id)">
                            -
                        </button>
                        <span>
                            {{item.quantity}}
                        </span>
                        <button @click="cartStore.increaseQuantity(item.id)">
                            +
                        </button>
                        <button @click="cartStore.removeFromCart(item.id)">
                            移除
                        </button>

                    </div>

                </li>

            </ul>
            <!--購物車統計-->
            <div v-if="!cartStore.isEmpty" class="cart-summary">
                <p>
                    商品種類:
                    {{cartStore.totalItems}}
                </p>
                <p>
                    商品總數:
                    {{cartStore.totalQuantity}}
                </p>
                <p class="cart-total">
                    總金額:
                    ${{
                        cartStore.totalPrice
                            .toLocaleString()
                    }}
                </p>
                <button @click="cartStore.clearCart()">
                    清空購物車
                </button>

            </div>

        </section>

    </main>
</template>
<style scoped>
.cart-actions span{
    min-width: 28px;
    text-align: center;
    font-weight: 700;

}
.cart-action button:last-child{
    margin-Left: 6px;
}
</style>