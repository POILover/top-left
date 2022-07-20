<template>
  <!-- position relative -->
  <div class="app-container" style="position:relative;width:800px">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit cum eius in
    voluptatibus dolorum nisi cupiditate obcaecati illo id accusantium
    temporibus, a placeat nemo minima sunt ratione consequuntur. Voluptatum,
    modi! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam
    dolor corrupti magni, necessitatibus dolorum similique, atque ab quam maxime
    quas rem quisquam exercitationem vitae non aspernatur cumque ipsa optio
    vero!
    <div style="height:400px;width:600px;" v-custom-drag>
      <div
        id="drag-item"
        @mouseup="scaleMouseup($event)"
        ref="dragItem"
        :class="classObj"
      >
        <!-- overflow hidden  -->
        <div
          style="height:100%;background:white;overflow:hidden"
          :style="tempStyle"
        >
          <div class="drag-header" style="height:50px">
            <span style="user-select:none">拖拽区域</span>
            <svg-icon
              :title="magnifierTip"
              :icon-class="magnifierClass"
              style="font-size:20px;color:#1682e6;float:right;margin:5px 5px 0 0; cursor: pointer"
              @click="onClickZoom"
            ></svg-icon>
          </div>
          <div ref="chart" style="width:100%;height:calc(100% - 50px)"></div>
        </div>
      </div>
    </div>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit cum eius in
    voluptatibus dolorum nisi cupiditate obcaecati illo id accusantium
    temporibus, a placeat nemo minima sunt ratione consequuntur. Voluptatum,
    modi! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam
    dolor corrupti magni, necessitatibus dolorum similique, atque ab quam maxime
    quas rem quisquam exercitationem vitae non aspernatur cumque ipsa optio
    vero!
  </div>
</template>

<script>
// TODO: 优化样式或制造应用场景，添加注释，转为mixin
import customDrag from "@/directive/custom-drag/index";
import { option } from "./option";
import echarts from "echarts";
export default {
  name: "Linear",
  directives: { customDrag },
  data() {
    return {
      option: {},
      magnifierTip: "放大",
      magnifierCSS: ";top:20%;left:20%",
      magnifierClass: "zoomout",
      tempStyle: "height:400px",
      classObj: ""
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
    },
    // 放缩结束后的抬手事件
    scaleMouseup(e) {
      if (e.target.className === "drag-item" && !this.chart.isDisposed()) {
        this.chart.resize({ width: "auto" });
      }
    },
    onClickZoom() {
      let dragItem = document.getElementById("drag-item");
      let bool = this.classObj === "";
      if (!bool) {
        this.magnifierCSS = dragItem.style.cssText;
      }
      dragItem.style.cssText = bool ? this.magnifierCSS : ";top:20%;left:20%";
      this.tempStyle = bool ? "" : "height:400px";
      this.magnifierClass = bool ? "zoomin" : "zoomout";
      this.magnifierTip = bool ? "还原" : "放大";
      this.classObj = bool ? "drag-item" : "";
      if (!this.chart.isDisposed()) {
        setTimeout(() => {
          this.chart.resize({ width: "auto" });
        }, 500);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.drag-item {
  width: 1000px;
  height: 500px;
  position: fixed;

  overflow: hidden;
  resize: both;
  z-index: 998;
}
.drag-item:before {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  width: 12px;
  height: 12px;
  padding: 0px;
  // background: linear-gradient(-45deg, black 50%, transparent 0);
  background-clip: content-box;
  cursor: ew-resize;
  -webkit-filter: drop-shadow(0 0 2px black);
  filter: drop-shadow(0 0 2px black);
  z-index: 9999;
}
</style>
