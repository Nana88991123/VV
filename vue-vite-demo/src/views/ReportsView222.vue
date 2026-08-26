<script>
import { markRaw } from 'vue'
import Chart from 'chart.js/auto'
import annotationPlugin from 'chartjs-plugin-annotation'
import ChartDataLabels from 'chartjs-plugin-datalabels'

Chart.register(annotationPlugin, ChartDataLabels)

export default {
    name: 'ReportsView',
    data() {
        return {
            months: ['一月', '二月', '三月', '四月', '五月', '六月'],
            sales: [],// 銷售數據
            profit: [],// 利潤數據
            users: [],  // 用戶數據
            charts: {}
        }
    },
    methods: {
        random(max) {
            return this.months.map(() => Math.floor(Math.random() * max))
        },
        generateData() {
            this.sales = this.random(1000)
            this.profit = this.random(500)
            this.users = this.random(2000)
        },
        commonOptions(title) {
            return {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 800,
                    easing: 'easeInOutQuart'
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: title,
                        font: {
                            size: 18
                        }
                    },
                    legend: {
                        position: 'top'
                    },
                    datalabels: {
                        color: 'black',
                        anchor: 'end',
                        align: 'top',
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            }
        },
        createCharts() {
            this.charts.mainChart = markRaw(new Chart(this.$refs.mainChart, {
                type: 'line',
                data: {
                    labels: this.months,
                    datasets: [{
                        label: '銷售數據',
                        data: this.sales,
                        borderColor: 'rgb(75,192,192)',
                        backgroundColor: 'rgba(75,192,192,0.2)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true,
                        pointRadius: 5
                    }]
                },
                options: {
                    ...this.commonOptions('動態銷售趨勢'),
                    plugins: {
                        ...this.commonOptions('動態銷售趨勢').plugins,
                        annotation: {
                            annotations: {
                                targetLine: {
                                    type: 'line',
                                    yMin: 500,
                                    yMax: 500,
                                    borderColor: 'red',
                                    borderWidth: 2,
                                    borderDash: [5, 5],
                                    label: {
                                        display: true,
                                        content: '目標銷售 500',
                                        position: 'center',
                                        backgroundColor: 'rgba(255,255,255,0.9)',
                                        color: 'red'
                                    }
                                }
                            }
                        }
                    }
                }
            }))
            this.charts.multiAxisChart = markRaw(new Chart(this.$refs.multiAxisChart, {
                type: 'line',
                data: {
                    labels: this.months,
                    datasets: [
                        {
                            label: '銷售額',
                            data: this.sales,
                            borderColor: 'rgb(54,162,235)',
                            backgroundColor: 'rgba(54,162,235,0.2)',
                            borderWidth: 2,
                            tension: 0.4,
                            yAxisID: 'y'
                        },
                        {
                            label: '利潤',
                            data: this.profit,
                            borderColor: 'rgb(75,192,100)',
                            backgroundColor: 'rgba(75,192,100,0.2)',
                            borderWidth: 2,
                            tension: 0.4,
                            yAxisID: 'y1'
                        }
                    ]
                },
                options: {
                    ...this.commonOptions('銷售額與利潤分析'),
                    scales: {
                        y: {
                            type: 'linear',
                            position: 'left',
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: '銷售額'
                            }
                        },
                        y1: {
                            type: 'linear',
                            position: 'right',
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: '利潤'
                            },
                            grid: {
                                drawOnChartArea: false
                            }
                        }
                    }
                }
            }))
            this.charts.barChart = markRaw(new Chart(this.$refs.barChart, {
                type: 'bar',
                data: {
                    labels: this.months,
                    datasets: [{
                        label: '用戶數據',
                        data: this.users,
                        backgroundColor: 'rgba(255,159,64,0.6)',
                        borderColor: 'rgb(255,159,64)',
                        borderWidth: 1,
                        borderRadius: 5
                    }]
                },
                options: this.commonOptions('用戶數據條形圖')
            }))
            this.charts.mixedChart = markRaw(new Chart(this.$refs.mixedChart, {
                data: {
                    labels: this.months,
                    datasets: [
                        {
                            type: 'bar',
                            label: '銷售量',
                            data: this.sales,
                            backgroundColor: 'rgba(54,162,235,0.5)',
                            borderColor: 'rgb(54,162,235)',
                            borderWidth: 1,
                            borderRadius: 5
                        },
                        {
                            type: 'line',
                            label: '銷售趨勢',
                            data: this.sales,
                            borderColor: 'rgb(75,192,192)',
                            backgroundColor: 'rgba(75,192,192,0.2)',
                            borderWidth: 3,
                            tension: 0.4,
                            pointRadius: 5
                        }
                    ]
                },
                options: {
                    ...this.commonOptions('銷售量與趨勢綜合圖'),
                    plugins: {
                        ...this.commonOptions('銷售量與趨勢綜合圖').plugins,
                        datalabels: {
                            display(context) {
                                return context.dataset.type === 'bar'
                            },
                            color: 'black',
                            anchor: 'end',
                            align: 'top',
                            font: {
                                weight: 'bold'
                            }
                        }
                    }
                }
            }))
        },
        regenerateData() {
            this.generateData()
            const c = this.charts
            c.mainChart.data.datasets[0].data = this.sales
            c.multiAxisChart.data.datasets[0].data = this.sales
            c.multiAxisChart.data.datasets[1].data = this.profit
            c.barChart.data.datasets[0].data = this.users
            c.mixedChart.data.datasets[0].data = this.sales
            c.mixedChart.data.datasets[1].data = this.sales
            Object.values(c).forEach(chart => chart.update())
        }
    },
    mounted() {
        this.generateData()
        this.createCharts()
    },
    beforeUnmount() {
        Object.values(this.charts).forEach(chart => chart.destroy())
    }
}
</script>

<template>
    <div class="container py-4">
        <div class="text-center mb-4">
            <h1>高級數據儀表板</h1>
            <button class="btn btn-primary" @click="regenerateData">
                重新生成數據
            </button>
        </div>
        <div class="row g-4">
            <div class="col-lg-6">
                <div class="card shadow-sm p-3">
                    <div class="chart-box">
                        <canvas ref="mainChart"></canvas>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card shadow-sm p-3">
                    <div class="chart-box">
                        <canvas ref="multiAxisChart"></canvas>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card shadow-sm p-3">
                    <div class="chart-box">
                        <canvas ref="barChart"></canvas>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card shadow-sm p-3">
                    <div class="chart-box">
                        <canvas ref="mixedChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.chart-box {
    height: 380px;
}
</style>