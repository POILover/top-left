<template>
    <div class="app-container">
        <div style="display: flex; flex-wrap: wrap; width: 100%">
            <div :id="`chart1`" style="width: 100%; height: 400px; margin: 0 20px 20px 0"></div>
            <div :id="`chart2`" style="width: 100%; height: 400px; margin: 0 20px 20px 0"></div>
        </div>
    </div>
</template>

<script>
import { option1, option2 } from "./option";
import * as echarts from "echarts";
const orginData = require("./data.json")
    .filter((_, index) => index > -1)
    .map(item => item.split(","));
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
            let chart1 = echarts.init(document.getElementById(`chart1`));
            option1.xAxis.data = orginData.map(item => item[0]);
            option1.series[0].data = orginData.map(item => Number(item[5]));
            option1.series[1].data = orginData.map(item => Number(item[11]));
            chart1.setOption(option1);
        },
        handleNum(num) {
            return num / 10e8;
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
