<template>
    <div class="app-container">
        <div style="display: flex; flex-wrap: wrap; width: 100%">
            <div
                :id="`chart${i}`"
                style="width: 500px; height: 400px"
                v-for="i in 10"
                :key="i"
            ></div>
        </div>
    </div>
</template>

<script>
import { option } from "./option";
import * as echarts from "echarts";
const orginData = require("./data.json");
export default {
    name: "Fund",
    data() {
        return {
            option: {},
            classObj: "",
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.drawChart();
        });
    },
    methods: {
        drawChart() {
            this.option = option;
            for (let i = 1; i < 2; i++) {
                let chart = echarts.init(document.getElementById(`chart${i}`));
                const [series0Data, xData] = this.handleData(orginData[0].data);
                this.option.xAxis.data = xData;
                this.option.series[0].data = series0Data;
                console.log(this.option);
                chart.setOption(this.option);
                // this.chart = echarts.init(this.$refs.chart);
                // this.chart.setOption(this.option);
            }
        },
        handleData(data, base = 1) {
            let xData = data.map(item => item.date);
            let series0Data = data
                .reduce((acc, cur) => {
                    console.log(acc, cur);
                    const last = acc[acc.length - 1] || base;
                    acc.push(last * cur.change + last);
                    return acc;
                }, [])
                .map(item => item - base);

            return [series0Data, xData];
        },
    },
};
</script>
<style lang="scss" scoped></style>
