<template>
  <div class="brush-item">
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script>
import { option } from "./option";
import  * as echarts from "echarts";
import resize from "../../mixin/resize";
export default {
  name: "AreaDash",
  components: {},
  mixins: [resize],
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
      this.option.toolbox.feature.myTool1.onclick = () => {
        this.chart.dispatchAction({
          type: "takeGlobalCursor",
          key: "brush",
          brushOption: {
            brushType: false,
            brushMode: "single"
          }
        });
        this.chart.dispatchAction({
          type: "brush",
          areas: []
        });
        this.chart.off("brush");
        this.chart.dispatchAction({
          type: "takeGlobalCursor",
          key: "brush",
          brushOption: {
            brushType: "rect",
            brushMode: "single"
          }
        });
        this.chart.off("brushEnd");
        this.chart.on("brushEnd", this.renderBrush);
      };
      this.chart.setOption(this.option);
      this.chart.on("brush", p => {
        if (p.command === "clear") {
          this.selIndexes = [];
          this.chart.dispatchAction({
            type: "takeGlobalCursor",
            key: "brush",
            brushOption: {
              brushType: false,
              brushMode: "single"
            }
          });
        }
      });
    },
    renderBrush(params) {
      if (!params.areas.length) {
        return;
      }
      const [range1] = params.areas[0].coordRanges;
      this.option.series[0].markArea.data[0][0].xAxis = range1[0][0];
      this.option.series[0].markArea.data[0][0].yAxis = range1[1][0];
      this.option.series[0].markArea.data[0][1].xAxis = range1[0][1];
      this.option.series[0].markArea.data[0][1].yAxis = range1[1][1];
      this.drawChart();
    }
  }
};
</script>
<style lang="scss" scoped></style>
