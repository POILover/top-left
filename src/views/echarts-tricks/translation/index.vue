<template>
  <div class="app-container">
    <div class="translation-container">
      <linear></linear>
      <log></log>
      <along-y></along-y>
      <stretch></stretch>
      <multi-line></multi-line>
      <along-boundary></along-boundary>
    </div>
  </div>
</template>

<script>
import Linear from "./linear/index";
import Log from "./log/index";
import AlongY from "./alongY/index";
import Stretch from "./stretch/index";
import MultiLine from "./multi-line/index"
import AlongBoundary from "./alongBoundary/index"
export default {
  name: "Translation",
  components: { Linear, Log, AlongY, Stretch, MultiLine, AlongBoundary },
  data() {
    return {};
  }
};
</script>
<style lang="scss">
.translation-container {
  display: flex;
  flex-wrap: wrap;
  .translation-item {
    flex: 50% 0 0;
    margin-bottom: 20px;
    .title {
      display: none;
      font-size: 20px;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
    .chart {
      width: 80%;
      min-width: 300px;
      max-width: 500px;
      margin: 0 auto;
      height: 400px;
      // background: pink;
    }
  }
}
</style>
