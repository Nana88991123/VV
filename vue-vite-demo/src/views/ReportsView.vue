<script>
import Chart from 'chart.js/auto'

export default{
    data(){
        return{
            sales:[],
            chart:null
        }
    },
    methods:{
        async fetchSales(){
            const response = await fetch('/data/sales.json')

            this.sales=await response.json()
            this.createChart(this.sales)
        },
        createChart(){
            const labels=this.sales.map(
                item=>item.month
            )
            const values=this.sales.map(
                item=>item.amount
            )
            this.chart=new Chart(
                this.$refs.myChart,
                {
                    type:'bar',
                    data:{
                        labels:labels,
                        datasets:[
                        {
                            label:'銷售量',
                            data:values
                        }
                        ]
                    }
                }
            )
        }

    },
    mounted(){
        this.fetchSales()
    }
}
</script>
<template>
    <div class="container py-5">
        <h2>銷售業績圖表</h2>
        <canvas ref="myChart"></canvas>
    </div>
</template>