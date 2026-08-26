<script>
export default{
    data(){
        return{
            message:"我是HelloCard元件"
        }
    },
    }
</script>

<template>
    <section>
        <h2>{{message}}</h2>
        <p>這是一個獨立的Vue元件</p>
    </section>
</template>

<style scoped>
    section{
        padding:20px;
        border:1px solid #CCC;
        background-color:#b18ae6;
    }
</style>