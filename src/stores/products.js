import { defineStore } from "pinia";

export const useProductStore =
    defineStore("product", {
        state: () => ({
            products: [],
            isLoding: false,
            errorMessages: "",
            //用於紀錄pinia是否已經讀取過資料
            loaded: false
        }),
        getters: {
            getProductById: (state) => {
                return (id) => {
                    return state.products.find(
                        product =>
                            product.id === Number(id)
                    )
                }
            },
            getProductByCategroy: (state) => {
                return (category) => {
                    return state.products.filter(
                        product =>
                            product.category === category
                    )
                }
            }

        },
        actions: {
            async fetchProducts() {
                if (this.loaded) {
                    return
                }
                this.isLoding = true
                this.errorMessages = ""

                try {
                    const response = await fetch('/VV/data/products.json')
                    console.log(response)
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`)
                    }
                    const data = await response.json()

                    this.products = data
                    console.log(this.products)
                    this.loaded = true
                } catch (error) {
                    console.error(error)
                    this.errorMessages = error.message
                } finally {
                    this.isLoding = false
                }
            }
        }
    })
