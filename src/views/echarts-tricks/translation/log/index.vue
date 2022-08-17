<template>
  <div class="translation-item">
    <div class="title">对数坐标</div>
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script>
import { option } from "./option";
import  * as echarts from "echarts";
import resize from "../../mixin/resize";
export default {
  name: "Log",
  mixins: [resize],
  data() {
    return {
      option: {},
      data: [
        [10, 10],
        [1000, 1000]
      ],
      origin: [
        [10, 10],
        [1000, 1000]
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
      this.data[dataIndex] = this.chart.convertFromPixel(
        "grid",
        e.target.position
      );
      let distance = [];
      let distance0 = 0;
      let distance1 = 0;
      let dataLen = this.data.length;
      // 对数坐标平移区别于线性坐标
      // 这个实现方法的原则是线段的斜率和长度在平移后，视觉上保持不变
      // 先取log再取pow，确实属实没必要，只是原理上清晰一点
      for (let i = 0; i < dataLen; i++) {
        distance0 = Math.log10(this.origin[i][0] / this.origin[dataIndex][0]);
        distance1 = Math.log10(this.origin[i][1] / this.origin[dataIndex][1]);

        distance.push([distance0, distance1]);
      }
      for (let i = 0; i < dataLen; i++) {
        {
          this.data[i][1] =
            this.data[dataIndex][1] * Math.pow(10, distance[i][1]);
          this.data[i][0] =
            this.data[dataIndex][0] * Math.pow(10, distance[i][0]);
        }
      }

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
