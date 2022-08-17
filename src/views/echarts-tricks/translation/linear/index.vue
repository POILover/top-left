<template>
  <div class="translation-item">
    <div class="title">线性坐标</div>
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script>
import { option } from "./option";
import  * as echarts from "echarts";
import resize from "../../mixin/resize";
export default {
  name: "Linear",
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
        // graphic只是点，线是由series画出的，graphic的点覆盖了series的点，所以实际上是在拖拽点
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
      // 原理上是计算原始数据中所有点与拖拽点之间的相对距离[(x2-x1),(y2-y1)]，
      // 然后根据拖拽点拖拽的位置计算出其它点的位置
      this.data[dataIndex] = this.chart.convertFromPixel(
        "grid",
        e.target.position
      );
      let distance = [];
      let distance0 = 0;
      let distance1 = 0;
      let dataLen = this.data.length;
      // 计算距离(origin)

      for (let i = 0; i < dataLen; i++) {
        distance0 = this.origin[i][0] - this.origin[dataIndex][0];
        distance1 = this.origin[i][1] - this.origin[dataIndex][1];

        distance.push([distance0, distance1]);
      }
      // 计算拖拽后的其它点的位置
      for (let i = 0; i < dataLen; i++) {
        {
          this.data[i][1] = this.data[dataIndex][1] + distance[i][1];
          this.data[i][0] = this.data[dataIndex][0] + distance[i][0];
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
