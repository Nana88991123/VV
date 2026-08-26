# Vue Pinia 完整入門教學

> 適用：Vue 3 + Vite  
> 目標：了解 Pinia 是什麼、為什麼需要它，以及如何用 Pinia 管理商品、購物車、登入狀態等全域資料。

---

# 1. Pinia 是什麼？

**Pinia** 是 Vue 官方推薦的「狀態管理工具（State Management）」。

簡單來說：

> Pinia 可以把多個 Vue 元件都需要使用的資料，集中放在一個 Store 裡管理。

例如商城網站可能有：

- 商品資料
- 購物車
- 登入會員資料
- 商品分類
- 收藏商品
- 使用者權限

如果沒有 Pinia，這些資料可能會散落在：

```text
App.vue
Products.vue
ProductDetail.vue
Cart.vue
Navbar.vue
```

每個元件都各自讀取、修改資料，專案變大之後會非常難管理。

使用 Pinia 後，可以變成：

```text
stores/
├─ productStore.js
├─ cartStore.js
└─ userStore.js
```

所有元件都共用 Store 裡面的資料。

---

# 2. 為什麼需要 Pinia？

假設目前你的 Vue 商城有以下頁面：

```text
首頁
│
├─ 商品列表
│
├─ 商品詳細資料
│
├─ 商品分類
│
└─ 購物車
```

商品列表可能會讀取：

```javascript
fetch("/data/products.json")
```

商品詳細頁也讀一次：

```javascript
fetch("/data/products.json")
```

商品分類頁又讀一次：

```javascript
fetch("/data/products.json")
```

這樣同一份資料會被重複載入。

如果使用 Pinia，可以改成：

products.json
      ↓
 productStore
      ↓
 ┌───────────────┐
 │ 商品列表       │
 │ 商品詳細頁     │
 │ 商品分類頁     │
 │ 購物車         │
 └───────────────┘

Store 讀一次資料後，其他頁面直接共用。

---

# 3. Pinia 可以解決什麼問題？

Pinia 主要解決：

## 3.1 多個元件共用資料

例如：

```javascript
cart
```

Navbar 要顯示購物車數量：
購物車（3）


Cart.vue 要顯示商品內容。

ProductCard.vue 又要加入購物車。

這些元件都需要共同操作同一份cart

這時就很適合使用 Pinia。

---

## 3.2 避免 Props 傳很多層

沒有 Pinia 時可能會變成：

App.vue
  ↓ props
Products.vue
  ↓ props
ProductCard.vue


甚至：

App
 ↓
Layout
 ↓
Products
 ↓
ProductCard


這稱為：
Prop Drilling

Pinia 可以讓 ProductCard 直接取得 Store：

const cartStore = useCartStore()


---

# 4. Pinia 的核心概念

Pinia Store 主要有三個重要部分：

State
Getters
Actions

可以理解成：

| Pinia   | Vue Options API |
|---------|-----------------|
| state   | data            |
| getters | computed        |
| actions | methods         |

也就是：

Pinia Store
│
├─ state
│   └─ 資料
│
├─ getters
│   └─ 計算資料
│
└─ actions
    └─ 方法

---

# 5. 安裝 Pinia

在 Vue + Vite 專案中執行：

```bash
npm install pinia
```

# 6. 在 main.js 啟用 Pinia

原本：

```javascript
import { createApp } from "vue"
import App from "./App.vue"

createApp(App).mount("#app")
```

加入 Pinia：

```javascript
import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"

const app = createApp(App)

app.use(createPinia())

app.mount("#app")
```

如果還有 Vue Router：

```javascript
import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "./router"

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount("#app")
```

---

# 7. 建立 stores 資料夾

建議專案結構：

```text
src/
│
├─ assets/
├─ components/
├─ views/
├─ router/
│
└─ stores/
    ├─ productStore.js
    ├─ cartStore.js
    └─ userStore.js
```

---

# 8. 建立第一個 Pinia Store

建立：

```text
src/stores/productStore.js
```

內容：

```javascript
import { defineStore } from "pinia"

export const useProductStore = defineStore(
    "product",
    {
        state: () => ({
            products: [],
            isLoading: false,
            errorMessage: ""
        })
    }
)
```

---

# 9. defineStore() 是什麼？

語法：

```javascript
defineStore(
    "product",
    {
        ...
    }
)
```

第一個參數：

```javascript
"product"
```

是 Store 的 ID。

第二個參數：

```javascript
{
    state,
    getters,
    actions
}
```

則是 Store 的設定。

---

# 10. State

State 就像 Vue Options API 的：

```javascript
data()
```

例如 Vue：

```javascript
data() {
    return {
        products: [],
        isLoading: false
    }
}
```

Pinia：

```javascript
state: () => ({
    products: [],
    isLoading: false
})
```

---

# 11. 在 Vue 元件使用 Store

例如：

```vue
<script>
import { useProductStore } from "../stores/productStore"

export default {

    computed: {

        productStore() {
            return useProductStore()
        }

    }

}
</script>
```

Template：

```html
<p>
    商品數量：
    {{ productStore.products.length }}
</p>
```

---

# 12. 更常見的 Options API 寫法

如果你目前主要使用 Options API，可以：

```vue
<script>

import { mapStores } from "pinia"
import { useProductStore } from "../stores/productStore"

export default {

    computed: {

        ...mapStores(
            useProductStore
        )

    }

}

</script>
```

這時可以直接使用：

```javascript
this.productStore
```

例如：

```javascript
this.productStore.products
```

---

# 13. Actions

Actions 相當於 Vue 的：

```javascript
methods
```

例如：

```javascript
actions: {

    async fetchProducts() {

        const response =
            await fetch(
                "/data/products.json"
            )

        this.products =
            await response.json()

    }

}
```

完整：

```javascript
import { defineStore } from "pinia"

export const useProductStore =
defineStore(
    "product",
    {

        state: () => ({

            products: [],
            isLoading: false,
            errorMessage: ""

        }),

        actions: {

            async fetchProducts() {

                this.isLoading = true

                try {

                    const response =
                        await fetch(
                            "/data/products.json"
                        )

                    if (!response.ok) {

                        throw new Error(
                            `HTTP ${response.status}`
                        )

                    }

                    this.products =
                        await response.json()

                } catch (error) {

                    console.error(error)

                    this.errorMessage =
                        error.message

                } finally {

                    this.isLoading = false

                }

            }

        }

    }
)
```

---

# 14. 在元件呼叫 Action

例如：

```javascript
mounted() {

    this.productStore.fetchProducts()

}
```

完整：

```vue
<script>

import { mapStores } from "pinia"
import { useProductStore } from "../stores/productStore"

export default {

    computed: {

        ...mapStores(
            useProductStore
        )

    },

    mounted() {

        this.productStore.fetchProducts()

    }

}

</script>
```

---

# 15. 避免重複 fetch

如果每個頁面 mounted 都執行：

```javascript
this.productStore.fetchProducts()
```

仍然可能重複讀取資料。

因此可以加入判斷：

```javascript
async fetchProducts() {

    if (this.products.length > 0) {
        return
    }

    const response =
        await fetch(
            "/data/products.json"
        )

    this.products =
        await response.json()

}
```

這樣：

```text
第一次進商品頁
↓
products 是空的
↓
fetch
↓
存進 Store


之後進商品詳細頁
↓
products 已有資料
↓
直接 return
↓
不重新 fetch
```

---

# 16. 更完整的防止重複讀取版本

```javascript
actions: {

    async fetchProducts() {

        if (this.products.length > 0) {
            return
        }

        this.isLoading = true
        this.errorMessage = ""

        try {

            const response =
                await fetch(
                    "/data/products.json"
                )

            if (!response.ok) {

                throw new Error(
                    `HTTP ${response.status}`
                )

            }

            this.products =
                await response.json()

        } catch (error) {

            console.error(error)

            this.errorMessage =
                error.message

        } finally {

            this.isLoading = false

        }

    }

}
```

---

# 17. Getters

Getters 相當於 Vue 的：

```javascript
computed
```

例如計算商品數量：

```javascript
getters: {

    productCount(state) {

        return state.products.length

    }

}
```

使用：

```javascript
this.productStore.productCount
```

---

# 18. Getter 根據 ID 找商品

商品詳細頁常需要：

```javascript
product.id
```

可以建立：

```javascript
getters: {

    getProductById:
        (state) =>
        (id) => {

            return state.products.find(
                product =>
                    product.id === Number(id)
            )

        }

}
```

使用：

```javascript
this.productStore.getProductById(
    this.$route.params.id
)
```

---

# 19. 商品詳細頁搭配 Pinia

原本可能是：

```javascript
async fetchProduct() {

    const response =
        await fetch(
            "/data/products.json"
        )

    const products =
        await response.json()

    this.product =
        products.find(
            product =>
                product.id ===
                Number(
                    this.$route.params.id
                )
        )

}
```

使用 Pinia 後可以：

```javascript
computed: {

    ...mapStores(
        useProductStore
    ),

    product() {

        return this.productStore
            .getProductById(
                this.$route.params.id
            )

    }

}
```

mounted：

```javascript
mounted() {

    this.productStore.fetchProducts()

}
```

---

# 20. 商品分類頁搭配 Pinia

建立 Getter：

```javascript
getProductsByCategory:
    (state) =>
    (category) => {

        return state.products.filter(
            product =>
                product.category ===
                category
        )

    }
```

分類頁：

```javascript
computed: {

    products() {

        return this.productStore
            .getProductsByCategory(
                this.$route.params.category
            )

    }

}
```

---

# 21. Pinia 購物車 Store

建立：

```text
src/stores/cartStore.js
```

```javascript
import { defineStore } from "pinia"

export const useCartStore =
defineStore(
    "cart",
    {

        state: () => ({

            cart: []

        }),

        actions: {

            addToCart(product) {

                const exItem =
                    this.cart.find(
                        item =>
                            item.id ===
                            product.id
                    )

                if (exItem) {

                    exItem.quantity++

                } else {

                    this.cart.push({

                        ...product,
                        quantity: 1

                    })

                }

            }

        }

    }
)
```

---

# 22. 計算購物車總數量

Getter：

```javascript
getters: {

    cartCount(state) {

        return state.cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        )

    }

}
```

例如：

```text
滑鼠 × 2
鍵盤 × 1
```

則：

```javascript
cartCount
```

結果：

```text
3
```

---

# 23. 計算購物車總金額

```javascript
cartTotal(state) {

    return state.cart.reduce(

        (total, item) => {

            return total +
                item.price *
                item.quantity

        },

        0

    )

}
```

使用：

```html
<p>
    總金額：
    {{ cartStore.cartTotal }}
</p>
```

---

# 24. 完整 Cart Store

```javascript
import { defineStore } from "pinia"

export const useCartStore =
defineStore(
    "cart",
    {

        state: () => ({

            cart: []

        }),

        getters: {

            cartCount(state) {

                return state.cart.reduce(
                    (total, item) =>
                        total +
                        item.quantity,
                    0
                )

            },

            cartTotal(state) {

                return state.cart.reduce(
                    (total, item) =>
                        total +
                        item.price *
                        item.quantity,
                    0
                )

            }

        },

        actions: {

            addToCart(product) {

                const exItem =
                    this.cart.find(
                        item =>
                            item.id ===
                            product.id
                    )

                if (exItem) {

                    exItem.quantity++

                } else {

                    this.cart.push({

                        ...product,
                        quantity: 1

                    })

                }

            },

            removeItem(productId) {

                this.cart =
                    this.cart.filter(
                        item =>
                            item.id !==
                            productId
                    )

            },

            clearCart() {

                this.cart = []

            }

        }

    }
)
```

---

# 25. ProductCard 使用 Cart Store

原本：

```html
<button
    @click.stop="$emit('add', product)"
>
    加入購物車
</button>
```

使用 Pinia 後，可以不用 emit：

```vue
<script>

import { mapStores } from "pinia"
import { useCartStore } from "../stores/cartStore"

export default {

    props: {

        product: {
            type: Object,
            required: true
        }

    },

    computed: {

        ...mapStores(
            useCartStore
        )

    }

}

</script>
```

按鈕：

```html
<button
    @click.stop="
        cartStore.addToCart(product)
    "
>
    加入購物車
</button>
```

---

# 26. Pinia 的資料流程

沒有 Pinia：

```text
App
 ↓
Products
 ↓
ProductCard
 ↓ emit
Products
 ↓
App
 ↓
Cart
```

資料傳來傳去，專案越大越容易「迷路」。

使用 Pinia：

```text
        Pinia Store
        ↑        ↑
        │        │
ProductCard     Cart
        │
        ↓
     Navbar
```

任何元件都可以直接存取 Store。

---

# 27. Pinia 與 localStorage 不一樣

Pinia 的資料：

```text
重新整理網頁
↓
Pinia State
↓
消失
```

因為 Pinia 預設資料存在：

```text
JavaScript 記憶體
```

不是存在瀏覽器硬碟。

如果希望購物車重新整理後還在，需要：

```text
Pinia
+
localStorage
```

或使用：

```text
pinia-plugin-persistedstate
```

---

# 28. Pinia 適合存哪些資料？

適合：

```text
商品資料
購物車
登入會員
使用者權限
網站設定
收藏商品
分類資料
API 資料
```

不一定要放：

```text
Modal 是否開啟
某個 input 的文字
某個按鈕 hover 狀態
某個元件內部暫時資料
```

如果資料只在單一元件使用：

```javascript
data()
```

就夠了。

---

# 29. 什麼時候應該使用 Pinia？

可以使用以下判斷方式：

如果資料符合其中一項：

```text
多個頁面共用
多個元件共用
需要集中管理
需要避免重複 API
需要跨頁面保存
```

就可以考慮 Pinia。

---

# 30. Pinia 與 API 的關係

Pinia 並不是 API。

例如：

```text
FastAPI
PHP API
Node.js API
```

是提供資料的後端服務。

Pinia 是前端 Vue 的：

```text
狀態管理工具
```

常見流程：

```text
MySQL
 ↓
FastAPI / PHP
 ↓
REST API
 ↓
Pinia Store
 ↓
Vue Components
```

---

# 31. Pinia 不會自動幫你讀 API

Pinia 不會自己：

```javascript
fetch()
```

你仍然要在：

```javascript
actions
```

裡面寫：

```javascript
fetch()
```

例如：

```javascript
actions: {

    async fetchProducts() {

        const response =
            await fetch(
                "http://localhost:8000/products"
            )

        this.products =
            await response.json()

    }

}
```

---

# 32. Pinia 最大優點之一：Cache 效果

例如：

```javascript
if (this.products.length) {
    return
}
```

就可以避免：

```text
頁面 A fetch
頁面 B fetch
頁面 C fetch
頁面 D fetch
```

變成：

```text
第一次 fetch
↓
Store 保存
↓
其他頁面共用
```

這對商城非常適合。

---

# 33. 建議商城 Store 架構

```text
src/
└─ stores/

    productStore.js

    cartStore.js

    userStore.js

    favoriteStore.js
```

---

# 34. Product Store

負責：

```text
商品列表
商品分類
商品詳細資料
搜尋
API 讀取
```

---

# 35. Cart Store

負責：

```text
加入購物車
刪除商品
修改數量
計算總金額
計算商品數量
```

---

# 36. User Store

負責：

```text
登入
登出
會員資料
JWT Token
使用者權限
```

---

# 37. Pinia 與 Vue Router 搭配

例如網址：

```text
/products/5
```

Router：

```javascript
{
    path: "/products/:id",
    name: "product-detail",
    component: ProductDetail
}
```

取得：

```javascript
this.$route.params.id
```

再交給 Pinia：

```javascript
this.productStore
    .getProductById(
        this.$route.params.id
    )
```

流程：

```text
URL
 ↓
Vue Router
 ↓
$route.params.id
 ↓
Pinia Getter
 ↓
商品資料
 ↓
Vue Template
```

---

# 38. 建議的商品商城資料流程

```text
                MySQL
                  ↓
              REST API
                  ↓
            productStore
             ↓       ↓
        Products   Category
             ↓
       ProductDetail


            cartStore
             ↑
       ProductCard
             ↓
            Cart
             ↓
           Navbar
```

---

# 39. Pinia 與 Vuex 的差別

以前 Vue 常使用：

```text
Vuex
```

Vue 3 現在官方更推薦：

```text
Pinia
```

Pinia 的優點：

```text
語法比較簡單
TypeScript 支援較好
不需要 mutations
模組化容易
Vue DevTools 支援
官方推薦
```

---

# 40. Vuex 的資料流程

Vuex：

```text
State
 ↓
Mutations
 ↓
Actions
 ↓
Components
```

Pinia：

```text
State
 ↓
Actions
 ↓
Components
```

少了：

```text
Mutations
```

因此更簡單。

---

# 41. Pinia 常見錯誤

## 忘記安裝

```text
Failed to resolve import "pinia"
```

解決：

```bash
npm install pinia
```

---

## 忘記 app.use()

錯誤：

```text
getActivePinia()
```

或：

```text
no active Pinia
```

確認：

```javascript
app.use(createPinia())
```

---

# 42. Store 名稱命名建議

推薦：

```javascript
useProductStore
useCartStore
useUserStore
```

檔名：

```text
productStore.js
cartStore.js
userStore.js
```

這是常見命名方式。

---

# 43. 最重要的觀念

Pinia 不是用來：

```text
取代 Vue
```

也不是：

```text
取代 API
```

而是：

```text
管理 Vue 應用程式中的共用資料
```

可以把 Pinia 想成：

```text
Vue 應用程式的中央資料倉庫
```

---

# 44. 一句話理解 Pinia

> 當多個 Vue 元件或頁面需要共同使用同一份資料時，就把資料交給 Pinia 管理。

---

# 45. 最終架構範例

```text
Vue Application
│
├─ Router
│
│   ├─ Home
│   ├─ Products
│   ├─ ProductDetail
│   └─ Category
│
├─ Components
│
│   ├─ Navbar
│   ├─ ProductCard
│   └─ Cart
│
└─ Pinia
    │
    ├─ productStore
    │   ├─ products
    │   ├─ fetchProducts()
    │   ├─ getProductById()
    │   └─ getProductsByCategory()
    │
    ├─ cartStore
    │   ├─ cart
    │   ├─ addToCart()
    │   ├─ removeItem()
    │   ├─ cartCount
    │   └─ cartTotal
    │
    └─ userStore
        ├─ user
        ├─ login()
        └─ logout()
```

---

# 46. 學習順序建議

建議依照以下順序學習：

```text
Vue data
↓
props
↓
emit
↓
computed
↓
Vue Router
↓
Pinia State
↓
Pinia Getters
↓
Pinia Actions
↓
API
↓
localStorage
↓
登入驗證
```

Pinia 通常就是 Vue 專案開始從「小練習」走向「真正應用程式」的重要分水嶺。
