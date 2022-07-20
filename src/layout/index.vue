<template>
  <div class="app-wrapper">
    <topbar />
    <sidebar class="sidebar-container" />
    <div class="main-container hasTagsView">
      <div>
        <tags-view />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { AppMain, Sidebar, TagsView, Topbar } from "./components";

export default {
  name: "Layout",
  components: {
    AppMain,
    Sidebar,
    TagsView,
    Topbar
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
@import "~@/styles/custom_wlj.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.main-container {
  min-height: calc(100vh - #{$topBarHeight} - #{$tagsViewHeight});
  transition: margin-left 0.28s;
  margin-left: $sideBarWidth;
  position: relative;
}

.sidebar-container {
  height: calc(100% - #{$topBarHeight});
  margin-top: 0px;
  border-right: 1px #eeeeee solid;
  transition: width 0.28s;
  width: $sideBarWidth !important;
  float: left;
  // position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
</style>
