<template>
  <div class="app-container">
    <div ref="chart" style="width:500px;height:500px" class="chart"></div>
  </div>
</template>

<script>
import { option } from "./option";
import  * as echarts from "echarts";
export default {
  name: "Linear",
  components: {},
  data() {
    return {
      option: {}
    };
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      this.option = option;
      this.chart = echarts.init(this.$refs.chart);
      this.chart.setOption(this.option);
    }
  }
};
</script>
<style lang="scss" scoped></style>
