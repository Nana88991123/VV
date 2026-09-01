<script>
import { Modal } from 'bootstrap'

export default {
    name: 'ProductManageView',

    data() {
        return {
            studentId: 'student01',
            keyword: '',
            products: [],
            form: {
                name: '',
                price: '',
                category: '',
                stock: ''
            },
            loading: false,
            saving: false,
            errorMessage: ''
        }
    },

    computed: {
        filteredProducts() {
            if (!this.keyword.trim()) {
                return this.products
            }

            const keyword = this.keyword.toLowerCase()

            return this.products.filter(product => {
                return (
                    product.name.toLowerCase().includes(keyword) ||
                    product.category.toLowerCase().includes(keyword)
                )
            })
        }
    },

    methods: {
        // ========================================
        // GET
        // 取得全部商品
        // ========================================
        async fetchProducts() {
            this.loading = true
            this.errorMessage = ''

            try {
                const response = await fetch(
                    `/api/${this.studentId}/products`
                )

                if (!response.ok) {
                    throw new Error('商品資料讀取失敗')
                }

                this.products = await response.json()
            } catch (error) {
                console.error(error)
                this.errorMessage = '無法取得商品資料'
            } finally {
                this.loading = false
            }
        },

        // ========================================
        // 開啟新增商品 Modal
        // ========================================
        openAddModal() {
            this.form = {
                name: '',
                price: '',
                category: '',
                stock: ''
            }

            this.showModal()
        },

        // ========================================
        // 儲存商品
        // ========================================
        async saveProduct() {
            if (
                !this.form.name.trim() ||
                !this.form.category.trim() ||
                this.form.price === ''
            ) {
                alert('請填寫完整商品資料')
                return
            }

            if (
                Number(this.form.price) < 0 ||
                Number(this.form.stock) < 0
            ) {
                alert('價格與庫存不可小於 0')
                return
            }

            this.saving = true

            const productData = {
                name: this.form.name.trim(),
                price: Number(this.form.price),
                category: this.form.category.trim(),
                stock: Number(this.form.stock) || 0
            }

            try {
                await this.addProduct(productData)
                this.hideModal()
            } catch (error) {
                console.error(error)
                alert(error.message)
            } finally {
                this.saving = false
            }
        },

        // ========================================
        // POST
        // 新增商品
        // ========================================
        async addProduct(productData) {
            const response = await fetch(
                `/api/${this.studentId}/products`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(productData)
                }
            )

            if (!response.ok) {
                const errorData = await response.json()

                throw new Error(
                    errorData.detail || '新增商品失敗'
                )
            }

            const newProduct = await response.json()

            this.products.push(newProduct)
        },

        // ========================================
        // 顯示 Modal
        // ========================================
        showModal() {
            const modal = new Modal(
                this.$refs.productModal
            )

            modal.show()
        },

        // ========================================
        // 關閉 Modal
        // ========================================
        hideModal() {
            const modal = Modal.getInstance(
                this.$refs.productModal
            )

            if (modal) {
                modal.hide()
            }
        }
    },

    mounted() {
        this.fetchProducts()
    }
}
</script>

<template>
    <div class="container py-4 px-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h2 class="fw-bold mb-1">
                    商品管理
                </h2>

                <p class="text-muted mb-0">
                    管理網站商品資料
                </p>
            </div>

            <button
                class="btn btn-primary"
                @click="openAddModal"
            >
                <i class="bi bi-plus-lg me-1"></i>
                新增商品
            </button>
        </div>

        <div
            v-if="errorMessage"
            class="alert alert-danger"
        >
            {{ errorMessage }}
        </div>

        <div class="card border-0 shadow-sm mb-4">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-5">
                        <div class="input-group">
                            <span class="input-group-text">
                                <i class="bi bi-search"></i>
                            </span>

                            <input
                                v-model="keyword"
                                type="text"
                                class="form-control"
                                placeholder="搜尋商品名稱或分類"
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card border-0 shadow-sm">
            <div class="card-header bg-white py-3">
                <div class="d-flex justify-content-between align-items-center">
                    <h5 class="fw-bold mb-0">
                        商品列表
                    </h5>

                    <span class="text-muted">
                        共 {{ filteredProducts.length }} 筆
                    </span>
                </div>
            </div>

            <div class="card-body">
                <div
                    v-if="loading"
                    class="text-center py-5"
                >
                    <div class="spinner-border text-primary"></div>

                    <div class="text-muted mt-3">
                        商品資料讀取中...
                    </div>
                </div>

                <div
                    v-else
                    class="table-responsive"
                >
                    <table class="table table-hover align-middle mb-0">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>商品名稱</th>
                                <th>分類</th>
                                <th>價格</th>
                                <th>庫存</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr
                                v-for="product in filteredProducts"
                                :key="product.id"
                            >
                                <td>
                                    {{ product.id }}
                                </td>

                                <td class="fw-semibold">
                                    {{ product.name }}
                                </td>

                                <td>
                                    <span class="badge bg-light text-dark">
                                        {{ product.category }}
                                    </span>
                                </td>

                                <td>
                                    ${{ product.price.toLocaleString() }}
                                </td>

                                <td>
                                    <span
                                        :class="{
                                            'text-danger fw-bold': product.stock <= 5,
                                            'text-success': product.stock > 5
                                        }"
                                    >
                                        {{ product.stock }}
                                    </span>
                                </td>
                            </tr>

                            <tr v-if="filteredProducts.length === 0">
                                <td
                                    colspan="5"
                                    class="text-center text-muted py-5"
                                >
                                    找不到商品資料
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div
            ref="productModal"
            class="modal fade"
            tabindex="-1"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            新增商品
                        </h5>

                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                        ></button>
                    </div>

                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label">
                                商品名稱
                            </label>

                            <input
                                v-model="form.name"
                                type="text"
                                class="form-control"
                                placeholder="請輸入商品名稱"
                            >
                        </div>

                        <div class="mb-3">
                            <label class="form-label">
                                商品分類
                            </label>

                            <input
                                v-model="form.category"
                                type="text"
                                class="form-control"
                                placeholder="例如：電腦周邊"
                            >
                        </div>

                        <div class="mb-3">
                            <label class="form-label">
                                商品價格
                            </label>

                            <input
                                v-model="form.price"
                                type="number"
                                min="0"
                                class="form-control"
                                placeholder="請輸入商品價格"
                            >
                        </div>

                        <div class="mb-3">
                            <label class="form-label">
                                商品庫存
                            </label>

                            <input
                                v-model="form.stock"
                                type="number"
                                min="0"
                                class="form-control"
                                placeholder="請輸入商品庫存"
                            >
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            取消
                        </button>

                        <button
                            type="button"
                            class="btn btn-primary"
                            :disabled="saving"
                            @click="saveProduct"
                        >
                            <span
                                v-if="saving"
                                class="spinner-border spinner-border-sm me-1"
                            ></span>

                            {{
                                saving
                                    ? '處理中...'
                                    : '新增商品'
                            }}
                        </button>
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

.table th {
    white-space: nowrap;
}

.table td {
    vertical-align: middle;
}
</style>