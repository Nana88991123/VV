<script>

import{useCartStore}from "./stores/cart.js"
export default {
  data() {
    return {
      cartStore: useCartStore()
    }
  }
}

</script>
<template>
  <div>
    <header class="navbar">
      <div class="navbar-inner">
        <strong class="nav-brand">
          Vue商城
        </strong>
        <nav class="nav-links">
          <RouterLink :to="{ name: 'home' }">
            首頁
          </RouterLink>

          <RouterLink :to="{ name: 'products' }">
            商品
          </RouterLink>

          <RouterLink :to="{ name: 'about' }">
            關於我
          </RouterLink>
          <RouterLink :to="{name:'reports'}">
            銷售報表
          </RouterLink>

          <router-Link :to="{ name: 'cart' }">
            購物車
            <span v-if="cartStore.totalQuantity">
              ({{ cartStore.totalQuantity }})
            </span>
          </router-Link>



        </nav>
      </div>

    </header>
    <router-view></router-view>
  </div>
</template>