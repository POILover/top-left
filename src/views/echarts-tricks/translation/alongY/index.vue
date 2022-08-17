<template>
  <div class="translation-item">
    <div class="title">延Y轴</div>
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script>
import { option } from "./option";
import  * as echarts from "echarts";
import resize from "../../mixin/resize";
export default {
  name: "AlongY",
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
            z: 999999,
            style: {
              fill: "red",
              stroke: "blue"
            }
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
      for (let i = 0; i < dataLen; i++) {
        distance0 = this.origin[i][0] - this.origin[dataIndex][0];
        distance1 = this.origin[i][1] - this.origin[dataIndex][1];

        distance.push([distance0, distance1]);
      }
      // 去除x的赋值操作并还原拖拽点的x坐标
      for (let i = 0; i < dataLen; i++) {
        {
          this.data[i][1] = this.data[dataIndex][1] + distance[i][1];
          // this.data[i][0] = this.data[dataIndex][0] + distance[i][0];
        }
      }
      this.data[dataIndex][0] = this.origin[dataIndex][0];

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
