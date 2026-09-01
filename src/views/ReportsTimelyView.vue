<script>
import{
    Chart,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Tooltip,
    Legend,
    Title
}from'chart.js'

//npm install @nckrtl/chartjs-plugin-streaming
//npm install luxon chartjs-adapter-luxon
import StreamingPlugin from'@nckrtl/chartjs-plugin-streaming'
import 'chartjs-adapter-luxon'
import{markRaw}from'vue'

Chart.register(
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Tooltip,
    Legend,
    Title,
    StreamingPlugin
)

export default{
    data(){
        return{
            chart:null,
            eventSource:null
        }
    },
    methods:{
        createChart(){
            this.chart=markRaw(
                new Chart(
                    this.$refs.salesChart,
                    {
                        type:'line',
                        data:{
                            datasets:[
                                {
                                    label:'即時Sales',
                                    data:[],
                                    borderWidth:2,
                                    tension:0.3,
                                    pointRadius:2,
                                    fill:false
                                }
                            ]
                        },
                        options:{
                            responsive:true,
                            maintainAspectRatio:false,//響應式設定
                            animation:false, //一般動畫關掉
                            interaction:{
                                intersect:false, //減少滑鼠互動造成負擔
                                mode:'nearest'
                            },
                            scales:{
                                //即時X軸
                                x:{
                                    type:'realtime',
                                    realtime:{
                                        duration:2000,//畫面顯示最近20秒
                                        delay:1500,//稍微延遲//讓資料有時間進來
                                        refresh:1000,//每秒更新資料區間
                                        frameRate:30//畫面更新FPS
                                    },
                                    ticks:{//x軸刻度文字(ticks)的最大旋轉角度,maxRotation:0代表:X軸底下的時間文字「不要旋轉」,固定保持水平
                                        maxRotation:0
                                    }
                                },
                                //Y軸
                                y:{
                                    min:0,
                                    max:100,
                                    ticks:{
                                        stepSize:20
                                    }
                                }
                            },
                            plugins:{
                                title:{
                                    display:true,
                                    text:'即時Sales監控'
                                },
                                legend:{
                                    display:true
                                },
                                datalabels:{
                                    display:false
                                }
                            }
                            
                        }
                    }
                )
            )
        },
        //SSE
        connectSales(){
            this.eventSource=new EventSource(
                'http://192.168.100.31:5002/api/sales-stream'
            )
            this.eventSource.onopen=()=>{
                console.log('SSE連線成功')
            }
            this.eventSource.onmessage=(event)=>{
                const data=JSON.parse(event.data)
                console.log(
                    '收到資料:',
                    data
                )
                //=========
                //x不再是字串
                this.chart.data.datasets[0].data.push({
                    x:Date.now(),
                    y:data.sales
                })
                //realtime plugin 持續移動畫面
                //不用每次 this.chart.update()
            }
            this.eventSource.onerror=()=>{
                console.log('SSE連線錯誤')
            }
            
        }
    },
    mounted(){
        this.createChart()
        this.connectSales()
    },
    beforeUnmount(){
        if(this.eventSource){
            this.eventSource.close()
            this.eventSource=null
        }
        if(this.chart){
            this.chart.destroy()
            this.chart=null
        }
    }
}
</script>

<template>
    <div class="container py-5">
        <div class="card shadow-sm">
            <div class="card-body">
                <h3>即時銷售監控</h3>
                <div style="position:relative;height:450px">
                    <canvas ref="salesChart"></canvas>
                </div>
            </div>
        </div>
    </div>
</template>