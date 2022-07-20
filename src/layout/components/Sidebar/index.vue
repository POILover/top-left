<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :background-color="variables.subMenuBg"
        :text-color="variables.menuText"
        :active-text-color="menuActiveTextColor"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in currentChildrenRoutes"
          :key="basePath + route.path"
          :item="route"
          :base-path="basePath"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from "./SidebarItem.vue";
import variables from "@/styles/custom_wlj.scss";
import { constantRoutes as routes } from "@/router";
export default {
  components: { SidebarItem },
  computed: {
    currentRootRoute() {
      let idx = routes.findIndex(
        item => item.path === this.$route.matched[0].path
      );
      return routes[idx];
    },
    basePath() {
      return this.currentRootRoute.path;
    },
    currentChildrenRoutes() {
      return this.currentRootRoute.children;
    },
    menuActiveTextColor() {
      return variables.menuActiveText;
    },
    variables() {
      return variables;
    },
    activeMenu() {
      const { path } = this.$route;
      return path;
    }
  }
};
</script>

<style lang="scss">
.sidebar-container {
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }
  .el-menu-item.is-active {
    background-color: #eff0f1 !important;
  }
  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%;
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
</style>

<style lang="scss" scoped>
@import "~@/styles/custom_wlj.scss";
.el-scrollbar {
  // margin-top: 60px;
  height: calc(100% - #{$topBarHeight});
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>
