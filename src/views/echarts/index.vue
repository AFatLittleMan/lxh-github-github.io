<template>
    <div class="app">
        <!-- 111 -->
        <!-- <div ref="chart" style="width: 100%; height: 400px;"></div> -->
        <div class="chart" ref="chart"></div>
        <div class="chart" ref="charts"></div>
    </div>
    
</template>
<script>
// import * as echarts from 'echarts';
import autofit from 'autofit.js'
export default {
    data() {
        return {

        }
    },
    mounted() {
        this.initChart();
        this.initCharts();
        // console.log(autofit,'666');
        
    },
    methods: {
        initChart() {
            // 获取 DOM 元素
            const chartElement = this.$refs.chart;
            console.log(this.echarts);

            // 使用 ECharts 创建图表实例
            const myChart = this.$echarts.init(chartElement);

            // 设置图表的配置项
            const option = {
                title: {
                    text: 'ECharts 示例'
                },
                tooltip: {},
                xAxis: {
                    data: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
                },
                yAxis: {},
                series: [{
                    name: '销售量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20, 30]
                }]
            };

            // 使用设置的配置项显示图表
            myChart.setOption(option);
        },
        initCharts() {
            // 获取 DOM 元素
            const chartElement = this.$refs.charts;
            console.log(this.echarts);

            // 使用 ECharts 创建图表实例
            const myChart = this.$echarts.init(chartElement);

            // 设置图表的配置项
            const option = {
                title: {
                    text: 'ECharts 示例'
                },
                tooltip: {},
                xAxis: {
                    data: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
                },
                yAxis: {},
                series: [{
                    name: '销售量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20, 30]
                }]
            };

            // 使用设置的配置项显示图表
            myChart.setOption(option);
        }
    }
}
</script>
<style leng="scss" scoped>
.app {
    display: flex;
    justify-content: space-between;
    .chart {
        width: 300px;
        height: 300px;
    }
}
</style>