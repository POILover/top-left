<template>
  <div class="translation-item">
    <div class="title">延边界</div>
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script>
import { option } from "./option";
import echarts from "echarts";
import resize from "../../mixin/resize";
export default {
  name: "AlongY",
  mixins: [resize],
  data() {
    return {
      minX: 0,
      minY: 0,
      maxX: 100,
      maxY: 100,
      k: -2,
      option: {},
      data: [
        [0, 80],
        [40, 0]
      ],
      origin: [
        [0, 80],
        [40, 0]
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
      // TODO: 换一种判断方式，左下和右上可能交换
      let anotherIndex = dataIndex ? 0 : 1;
      const ghost = this.chart.convertFromPixel("grid", e.target.position);
      // TODO: 镜像
      //左上角 && 向右
      if (
        this.data[dataIndex][0] == this.minX &&
        this.data[dataIndex][1] == this.maxY &&
        ghost[0] > this.minX
      ) {
        this.data[dataIndex][0] = ghost[0];
        this.data[dataIndex][1] = this.maxY;
      }
      //左上角 && 向左
      else if (
        this.data[dataIndex][0] <= this.minX &&
        this.data[dataIndex][1] == this.maxY &&
        ghost[0] < this.minX
      ) {
        this.data[dataIndex][0] = this.minX;
        this.data[dataIndex][1] = ghost[1] > this.maxY ? this.maxY : ghost[1];
      }
      // 左下角&&向右
      else if(
        this.data[dataIndex][0] == this.minX &&
        this.data[dataIndex][1] <= this.minY &&
        ghost[0] > this.minX
      ){
        this.data[dataIndex][0] = ghost[0];
        this.data[dataIndex][1] = this.minY;
      }
      //
      else if (this.data[dataIndex][1] < this.maxY) {
        this.data[dataIndex][0] = this.minX;
        this.data[dataIndex][1] = ghost[1];
      }
      //
      else if (this.data[dataIndex][0] > this.minX) {
        this.data[dataIndex][0] = ghost[0];
        this.data[dataIndex][1] = this.maxY;
      }
      //
      else if (this.data[dataIndex][1] > this.maxY) {
        this.data[dataIndex][1] = this.maxY;
      }
      //
      else if (this.data[dataIndex][0] > this.maxX) {
        this.data[dataIndex][0] = this.maxX;
      }

      let k = this.k;

      // 根据y求x
      let x = 0,
        y = 0;
      x = (this.minY - this.data[dataIndex][1]) / k + this.data[dataIndex][0];
      let anotherPoint = [x, this.minY];
      if (x > this.maxX) {
        // 如果x越界，则根据x求y
        y = k * (this.maxX - this.data[dataIndex][0]) + this.data[dataIndex][1];
        anotherPoint = [this.maxX, y];
      }
      // 赋值计算点

      this.data[anotherIndex] = anotherPoint;
      console.log(this.data);

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
