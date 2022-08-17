<template>
  <div class="translation-item">
    <div class="title">伸缩</div>
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script>
import { option } from "./option";
import  * as echarts from "echarts";
import resize from "../../mixin/resize";
export default {
  name: "Stretch",
  mixins: [resize],
  data() {
    return {
      option: {},
      data: [
        [20, 40],
        [80, 80]
      ],
      origin: [
        [20, 40],
        [80, 80]
      ]
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
      this.renderDraggableLine();
    },
    renderDraggableLine() {
      let self = this;
      this.chart.setOption({
        graphic: echarts.util.map(this.data, function(item, dataIndex) {
          return {
            type: "circle",
            position: self.chart.convertToPixel("grid", item),
            shape: {
              cx: 0,
              cy: 0,
              r: 4
            },
            invisible: true,
            draggable: true,
            ondrag: echarts.util.curry(self.onPointDragging, dataIndex),
            ondragend: echarts.util.curry(self.onMouseUp, dataIndex),
            z: 999999
          };
        }),
        series: [
          {
            id: "a",
            data: this.data
          }
        ]
      });
    },
    onMouseUp(dataIndex, e) {
      // 拖拽完成,接口处理
      console.log(dataIndex, e);
    },
    onPointDragging(dataIndex, e) {
      const slope =
        (this.origin[1][1] - this.origin[0][1]) /
        (this.origin[1][0] - this.origin[0][0]);
      const otherDataIdx = dataIndex === 1 ? 0 : 1;
      const [x1, y1] = this.data[otherDataIdx];
      const [x2] = this.chart.convertFromPixel("grid", e.target.position);
      this.data[dataIndex][0] = x2;
      this.data[dataIndex][1] = slope * (x2 - x1) + y1; //  直接带入直线方程求纵坐标
      let self = this;
      this.chart.setOption({
        graphic: echarts.util.map(this.data, function(item, dataIndex) {
          return {
            type: "circle",
            position: self.chart.convertToPixel("grid", item),
            shape: {
              cx: 0,
              cy: 0,
              r: 4
            },
            invisible: true,
            draggable: true,
            ondrag: echarts.util.curry(self.onPointDragging, dataIndex),
            ondragend: echarts.util.curry(self.onMouseUp, dataIndex),
            z: 9999999
          };
        }),
        series: [
          {
            id: "a",
            data: this.data
          }
        ]
      });
    }
  }
};
</script>
<style lang="scss" scoped></style>
