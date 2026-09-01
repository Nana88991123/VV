# Vue Router `$router` 可控制功能整理

Vue Router 中：

- `this.$router`：用來**控制路由、執行跳頁**
- `this.$route`：用來**讀取目前頁面的路由資訊**

可以先記住一句話：

```text
$router → 我要去哪裡
$route  → 我現在在哪裡
```

---

# 一、`this.$router` 常用功能列表

| 功能 | 寫法 | 說明 |
|---|---|---|
| 前往指定頁面 | `this.$router.push()` | 跳頁，並保留上一頁瀏覽紀錄 |
| 取代目前頁面 | `this.$router.replace()` | 跳頁，但不保留目前頁面的瀏覽紀錄 |
| 回上一頁 | `this.$router.back()` | 等同瀏覽器上一頁 |
| 到下一頁 | `this.$router.forward()` | 等同瀏覽器下一頁 |
| 前進 / 後退 N 頁 | `this.$router.go(n)` | `-1` 上一頁、`1` 下一頁 |
| 解析路由 | `this.$router.resolve()` | 取得路由完整資訊，但不跳頁 |
| 取得所有路由 | `this.$router.getRoutes()` | 查看 Router 中所有路由設定 |
| 判斷路由是否存在 | `this.$router.hasRoute()` | 用路由名稱判斷是否存在 |
| 動態加入路由 | `this.$router.addRoute()` | 執行期間新增 Route |
| 動態移除路由 | `this.$router.removeRoute()` | 執行期間刪除 Route |
| 目前路由 | `this.$router.currentRoute` | 取得目前 Router 的 Route |
| 等待 Router 準備完成 | `this.$router.isReady()` | 等待初始路由載入完成 |
| 路由錯誤處理 | `this.$router.onError()` | 捕捉導航錯誤 |
| 全域前置守衛 | `this.$router.beforeEach()` | 每次換頁前執行 |
| 全域解析守衛 | `this.$router.beforeResolve()` | 導航確認前執行 |
| 全域後置守衛 | `this.$router.afterEach()` | 每次換頁完成後執行 |

---

# 二、`push()` 前往新頁面

最常使用的功能。

```js
this.$router.push("/products")
```

會前往：

```text
/products
```

## 使用路由名稱

假設 Router：

```js
{
    path: "/products",
    name: "products",
    component: Products
}
```

可以寫：

```js
this.$router.push({
    name: "products"
})
```

---

# 三、`push()` 搭配動態參數

Router 設定：

```js
{
    path: "/products/:id",
    name: "product-detail",
    component: ProductDetail
}
```

可以這樣跳頁：

```js
this.$router.push({
    name: "product-detail",
    params: {
        id: 10
    }
})
```

結果：

```text
/products/10
```

也可以直接組網址：

```js
this.$router.push(
    `/products/${this.product.id}`
)
```

假設：

```js
this.product.id = 3
```

最後就會前往：

```text
/products/3
```

---

# 四、完整商品詳細頁範例

```js
methods: {

    goDetail() {

        this.$router.push(
            `/products/${this.product.id}`
        )

    }

}
```

HTML：

```html
<button @click="goDetail">
    查看詳細資料
</button>
```

執行流程：

```text
product.id
    ↓
取得商品 ID
    ↓
組成 /products/3
    ↓
$router.push()
    ↓
前往商品詳細頁
```

---

# 五、`replace()` 取代目前頁面

```js
this.$router.replace("/login")
```

與：

```js
this.$router.push("/login")
```

最大的差別在於**瀏覽器歷史紀錄**。

## `push()`

```text
首頁
 ↓
商品頁
 ↓
登入頁
```

使用者按「上一頁」：

```text
登入頁
 ↓
商品頁
```

---

## `replace()`

```js
this.$router.replace("/login")
```

代表用登入頁取代目前這一筆瀏覽紀錄。

常見用途：

- 登入完成
- 註冊完成
- 登出
- 權限重新導向
- 付款完成頁

---

# 六、`back()` 回上一頁

```js
this.$router.back()
```

例如：

```html
<button @click="$router.back()">
    返回上一頁
</button>
```

等同：

```js
this.$router.go(-1)
```

---

# 七、`forward()` 前往下一頁

```js
this.$router.forward()
```

等同：

```js
this.$router.go(1)
```

---

# 八、`go()` 控制瀏覽紀錄

上一頁：

```js
this.$router.go(-1)
```

往前兩頁：

```js
this.$router.go(-2)
```

下一頁：

```js
this.$router.go(1)
```

可以記：

```text
負數 ← 後退
0    ← 現在
正數 → 前進
```

---

# 九、`resolve()` 解析路由

如果想知道某個路由最後會產生什麼網址，但**不要真的跳頁**，可以使用：

```js
const result = this.$router.resolve({
    name: "product-detail",
    params: {
        id: 5
    }
})

console.log(result)
```

可能取得：

```js
{
    name: "product-detail",
    path: "/products/5",
    fullPath: "/products/5",
    href: "/products/5"
}
```

取得網址：

```js
const url = this.$router.resolve({
    name: "product-detail",
    params: {
        id: 5
    }
}).href

console.log(url)
```

結果：

```text
/products/5
```

---

# 十、`getRoutes()` 查看所有路由

```js
console.log(
    this.$router.getRoutes()
)
```

假設：

```js
const routes = [

    {
        path: "/",
        name: "home",
        component: Home
    },

    {
        path: "/products",
        name: "products",
        component: Products
    },

    {
        path: "/products/:id",
        name: "product-detail",
        component: ProductDetail
    }

]
```

使用：

```js
this.$router.getRoutes()
```

就可以看到目前 Router 裡所有路由資料。

這個非常適合除錯或上課展示。

---

# 十一、`hasRoute()` 判斷路由是否存在

```js
this.$router.hasRoute("products")
```

如果存在：

```js
true
```

不存在：

```js
this.$router.hasRoute("abc")
```

結果：

```js
false
```

注意：

```js
hasRoute()
```

主要使用的是路由：

```js
name
```

而不是：

```js
path
```

---

# 十二、`addRoute()` 動態加入路由

可以在程式執行期間增加新的路由。

```js
this.$router.addRoute({
    path: "/admin",
    name: "admin",
    component: Admin
})
```

常見用途：

- 管理員後台
- 不同會員權限
- 動態選單
- 不同角色載入不同頁面

---

# 十三、`removeRoute()` 動態移除路由

```js
this.$router.removeRoute("admin")
```

代表移除：

```js
name: "admin"
```

的路由。

---

# 十四、初學者最重要的 5 個 `$router`

建議先熟悉這幾個：

```js
// 前往頁面
this.$router.push("/products")

// 取代目前頁面
this.$router.replace("/login")

// 上一頁
this.$router.back()

// 下一頁
this.$router.forward()

// 前進 / 後退
this.$router.go(-2)
```

---

# 十五、`$router` 與 `$route` 的差別

這兩個名稱非常像，但用途完全不同。

| 名稱 | 用途 |
|---|---|
| `$router` | 控制路由、跳頁 |
| `$route` | 取得目前頁面的路由資訊 |

---

## `$router`

例如：

```js
this.$router.push("/products")
```

用途：

```text
控制頁面去哪裡
```

---

## `$route`

例如目前網址：

```text
/products/8
```

可以：

```js
this.$route.params.id
```

得到：

```text
8
```

常用：

```js
this.$route.path
this.$route.name
this.$route.params
this.$route.query
```

---

# 十六、常用 `$route` 屬性

| 寫法 | 說明 |
|---|---|
| `$route.path` | 目前路徑 |
| `$route.fullPath` | 完整網址路徑 |
| `$route.name` | 目前路由名稱 |
| `$route.params` | 動態路由參數 |
| `$route.query` | Query String |
| `$route.meta` | 路由自訂資訊 |
| `$route.matched` | 匹配到的路由紀錄 |

---

# 十七、`params` 範例

Router：

```js
{
    path: "/products/:id",
    name: "product-detail",
    component: ProductDetail
}
```

網址：

```text
/products/8
```

取得 ID：

```js
this.$route.params.id
```

結果：

```text
8
```

---

# 十八、`query` 範例

網址：

```text
/products?page=2&category=computer
```

取得：

```js
this.$route.query.page
```

結果：

```text
2
```

取得：

```js
this.$route.query.category
```

結果：

```text
computer
```

---

# 十九、核心觀念整理

```text
this.$router
    ↓
控制 Router
    ↓
push()
replace()
back()
forward()
go()
resolve()
getRoutes()
hasRoute()
addRoute()
removeRoute()
```

而：

```text
this.$route
    ↓
讀取現在這一頁
    ↓
path
name
params
query
meta
```

---

# 二十、最重要的一句話

```text
$router → 控制去哪裡

$route → 查看現在在哪裡
```

只要先把這兩個分清楚，Vue Router 就不會看起來像某種前端魔法了。
