<template>
  <div class="brush-item">
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script>
import { option } from "./option";
import { data1, data2 } from "../data";
import  * as echarts from "echarts";
import resize from "../../mixin/resize";

export default {
  name: "Scatter",
  components: {},
  mixins: [resize],
  data() {
    return {
      option: {},
      data1: data1.map(data => [...data, true]),
      data2: data2.map(data => [...data, true])
    };
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    // TODO: clear取消选择 & false改为opacity
    drawChart() {
      this.option = option;
      // describe every single point
      this.option.series[0].data = this.data1.map(data => {
        return {
          name: `data1` + data[0],
          value: [...data, true],
          symbolSize: 6,
          itemStyle: {
            normal: {
              color: data[2] ? "#c21f30" : "#c4cbcf"
            }
          }
        };
      });
      this.option.series[1].data = this.data2.map(data => {
        return {
          name: `data2` + data[0],
          value: [...data, true],
          symbolSize: 6,
          itemStyle: {
            normal: {
              color: data[2] ? "#10aec2" : "#c4cbcf"
            }
          }
        };
      });
      this.chart = echarts.init(this.$refs.chart);
      // add custom event
      this.option.toolbox.feature.myTool1.onclick = () => {
        // TODO: 写注释
        // remove brush
        // this.chart.dispatchAction({
        //   type: "takeGlobalCursor",
        //   key: "brush",
        //   brushOption: {
        //     brushType: false,
        //     brushMode: "single"
        //   }
        // });

        // init brush area
        // this.chart.dispatchAction({
        //   type: "brush",
        //   areas: []
        // });

        // init brush action
        // this.chart.off("brush");
        this.chart.dispatchAction({
          type: "takeGlobalCursor",
          key: "brush",
          brushOption: {
            brushType: "rect",
            brushMode: "single"
          }
        });
        this.chart.off("brushEnd");
        // NOTE: brushEnd 事件支持需要 eCharts 版本 >= 4.5.0
        this.chart.on("brushEnd", this.renderBrush);
      };
      this.chart.setOption(this.option);

      // listen clear -->  cancel brush
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
      // coordRanges 不同的yAxisIndex会有相应的范围
      // [
      //    [ [xmin1, xmax1], [ymin1, ymax1] ],
      //    [ [xmin2, xmax2], [ymin2, ymax2] ]
      // ]
      const [range1, range2] = params.areas[0].coordRanges;
      this.data1 = this.data1.map(data => {
        if (
          data[0] >= range1[0][0] &&
          data[0] <= range1[0][1] &&
          data[1] >= range1[1][0] &&
          data[1] <= range1[1][1]
        ) {
          return [data[0], data[1], true];
        } else {
          return [data[0], data[1], false];
        }
      });
      this.data2 = this.data2.map(data => {
        if (
          data[0] >= range2[0][0] &&
          data[0] <= range2[0][1] &&
          data[1] >= range2[1][0] &&
          data[1] <= range2[1][1]
        ) {
          return [data[0], data[1], true];
        } else {
          return [data[0], data[1], false];
        }
      });
      this.drawChart();
    }
  }
};
</script>
<style lang="scss" scoped></style>
