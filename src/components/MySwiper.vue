<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import {Navigation, Pagination, Autoplay} from 'swiper/modules'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default {
    components: {
        Swiper,
        SwiperSlide
    },
    data() {
        return {
            banners: [
                {
                    id: 1,
                    image: '/VV/images/banners/banner1.png'
                },
                {
                    id: 2,
                    image: '/VV/images/banners/banner2.png'
                },
                {
                    id: 3,
                    image: '/VV/images/banners/banner3.png'
                }
            ],
            modules:[
                Navigation,
                Pagination,
                Autoplay
            ]
        }
    }
}
</script>

<template>
    <div class="container-fluid px-0">
        <Swiper :modules="modules" navigation loop :pagination="{
            clickble: true

        }" :autoplay="{
            delay: 3000
        }">
            <SwiperSlide v-for="banner in banners" :key="banner.id">
                <img :src="banner.image" class="w-100 d-block">
            </SwiperSlide>
        </Swiper>

    </div>

</template>
