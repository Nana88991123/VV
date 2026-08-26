<script>
export default {
    name: 'DashboardView',

    data() {
        return {
            studentId: 'student08', //可改成自己的學號

            stats: [
                {
                    title: '訂單數量',
                    value: 0,
                    icon: 'bi bi-cart-check'
                },
                {
                    title: '總銷售額',
                    value: '$0',
                    icon: 'bi bi-currency-dollar'
                },
                {
                    title: '會員數量',
                    value: 0,
                    icon: 'bi bi-people'
                },
                {
                    title: '商品數量',
                    value: 0,
                    icon: 'bi bi-box-seam'
                }
            ],

            recentOrders: [],

            members: [],
            products: [],

            loading: false,
            errorMessage: ''
        }
    },

    methods: {

        // ==============================
        // 讀取 Dashboard 統計資料
        // ==============================
        async fetchDashboard() {

            const response = await fetch(
                `/api/${this.studentId}/dashboard`
            )

            if (!response.ok) {
                throw new Error('Dashboard 資料讀取失敗')
            }

            const data = await response.json()

            this.stats[0].value = data.order_count

            this.stats[1].value =
                '$' + data.total_sales.toLocaleString()

            this.stats[2].value = data.member_count

            this.stats[3].value = data.product_count
        },


        // ==============================
        // 讀取訂單
        // ==============================
        async fetchOrders() {

            const response = await fetch(
                `/api/${this.studentId}/orders`
            )

            if (!response.ok) {
                throw new Error('訂單資料讀取失敗')
            }

            const orders = await response.json()

            this.recentOrders = orders
                .slice()
                .reverse()
                .slice(0, 5)
                .map(order => {

                    const member = this.members.find(
                        item => item.id === order.member_id
                    )

                    const product = this.products.find(
                        item => item.id === order.product_id
                    )

                    return {
                        id: `ORD${String(order.id).padStart(3, '0')}`,

                        customer:
                            member?.name || '未知會員',

                        amount:
                            product
                                ? product.price * order.quantity
                                : 0,

                        status: order.status
                    }
                })
        },


        // ==============================
        // 讀取會員
        // ==============================
        async fetchMembers() {

            const response = await fetch(
                `/api/${this.studentId}/members`
            )

            if (!response.ok) {
                throw new Error('會員資料讀取失敗')
            }

            this.members = await response.json()
        },


        // ==============================
        // 讀取商品
        // ==============================
        async fetchProducts() {

            const response = await fetch(
                `/api/${this.studentId}/products`
            )

            if (!response.ok) {
                throw new Error('商品資料讀取失敗')
            }

            this.products = await response.json()
        },


        // ==============================
        // 一次讀全部資料
        // ==============================
        async fetchData() {

            this.loading = true
            this.errorMessage = ''

            try {

                await Promise.all([
                    this.fetchDashboard(),
                    this.fetchMembers(),
                    this.fetchProducts()
                ])

                // 訂單要用到會員與商品名稱，
                // 所以前面讀完再處理
                await this.fetchOrders()

            } catch (error) {

                console.error(error)

                this.errorMessage =
                    '後台資料讀取失敗'

            } finally {

                this.loading = false
            }
        },


        // ==============================
        // 訂單狀態顏色
        // ==============================
        getStatusClass(status) {

            switch (status) {

                case '已完成':
                    return 'bg-success'

                case '已付款':
                    return 'bg-success'

                case '處理中':
                    return 'bg-warning text-dark'

                case '已出貨':
                    return 'bg-primary'

                case '已取消':
                    return 'bg-danger'

                default:
                    return 'bg-secondary'
            }
        }

    },

    mounted() {
        this.fetchData()
    }
}
</script>


<template>

    <div class="container py-4">

        <div class="mb-4">

            <h2 class="fw-bold">
                Dashboard
            </h2>
        </div>


        <!-- 錯誤訊息 -->
        <div
            v-if="errorMessage"
            class="alert alert-danger"
        >
            {{ errorMessage }}
        </div>


        <!-- Loading -->
        <div
            v-if="loading"
            class="alert alert-info"
        >
            資料讀取中...
        </div>


        <!-- 統計卡片 -->
        <div class="row g-4 mb-4">

            <div
                v-for="item in stats"
                :key="item.title"
                class="col-12 col-sm-6 col-xl-3"
            >

                <div class="card shadow-sm border-0 h-100">

                    <div class="card-body">

                        <div
                            class="d-flex justify-content-between align-items-center"
                        >

                            <div>

                                <p class="text-muted mb-1">
                                    {{ item.title }}
                                </p>

                                <h3 class="fw-bold mb-0">
                                    {{ item.value }}
                                </h3>

                            </div>

                            <div class="icon-box">

                                <i :class="item.icon"></i>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>


        <div class="row g-4">

            <!-- 左邊 -->
            <div class="col-lg-8">

                <div class="card border-0 shadow-sm">

                    <div class="card-header bg-white py-3">

                        <h5 class="mb-0 fw-bold">
                            最近訂單
                        </h5>

                    </div>


                    <div class="card-body">

                        <div class="table-responsive">

                            <table
                                class="table table-hover align-middle mb-0"
                            >

                                <thead>

                                    <tr>

                                        <th>訂單編號</th>

                                        <th>顧客</th>

                                        <th>金額</th>

                                        <th>狀態</th>

                                    </tr>

                                </thead>


                                <tbody>

                                    <tr
                                        v-for="order in recentOrders"
                                        :key="order.id"
                                    >

                                        <td>
                                            {{ order.id }}
                                        </td>

                                        <td>
                                            {{ order.customer }}
                                        </td>

                                        <td>
                                            ${{ order.amount.toLocaleString() }}
                                        </td>

                                        <td>

                                            <span
                                                class="badge"
                                                :class="getStatusClass(order.status)"
                                            >
                                                {{ order.status }}
                                            </span>

                                        </td>

                                    </tr>


                                    <tr v-if="recentOrders.length === 0">

                                        <td
                                            colspan="4"
                                            class="text-center text-muted"
                                        >
                                            目前沒有訂單
                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>


            <!-- 右邊 -->
            <div class="col-lg-4">

                <div class="card border-0 shadow-sm mb-4">

                    <div class="card-header bg-white py-3">

                        <h5 class="fw-bold mb-0">
                            快速功能
                        </h5>

                    </div>


                    <div class="card-body d-grid gap-2">

                      

                    </div>

                </div>


                <div class="card border-0 shadow-sm">

                    <div class="card-header bg-white py-3">

                        <h5 class="fw-bold mb-0">
                            系統資訊
                        </h5>

                    </div>


                    <div class="card-body">

                        <p>

                            <strong>學生：</strong>

                            {{ studentId }}

                        </p>

                        <p>

                            <strong>系統：</strong>

                            Vue 管理後台

                        </p>

                        <p>

                            <strong>版本：</strong>

                            1.0.0

                        </p>

                        <p class="mb-0">

                            <strong>狀態：</strong>

                            <span class="text-success">
                                正常運作
                            </span>

                        </p>

                    </div>

                </div>

            </div>

        </div>

    </div>

</template>


<style scoped>

.card {
    border-radius: 12px;
}

.icon-box {
    width: 55px;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f1f3f5;
    border-radius: 12px;
    font-size: 24px;
}

.table th {
    white-space: nowrap;
}

</style>