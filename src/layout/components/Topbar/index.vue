<template>
  <div
    :style="
      `background-color:${variables.menuBg};display:flex;width:100%;justify-content:space-between`
    "
  >
    <div style="flex:1" class="top-left"></div>
    <div style="flex:1">
      <el-menu
        class="top-menu"
        :default-active="activeMenu"
        :background-color="variables.menuBg"
        text-color="#fff"
        active-text-color="#ffd04b"
        :unique-opened="false"
        :collapse-transition="false"
        mode="horizontal"
        :router="true"
      >
        <template v-for="route in routes">
          <el-menu-item
            v-if="route.meta && route.meta.title"
            :index="route.path"
            :key="route.path"
          >
            {{ route.meta.title }}
          </el-menu-item>
        </template>
      </el-menu>
    </div>

    <div style="flex:1" class="top-right"><top-right></top-right></div>
  </div>
</template>

<script>
import variables from "@/styles/custom_wlj.scss";
import TopRight from "./TopRight.vue";
import { constantRoutes as routes } from "@/router";
export default {
  name: "Topbar",
  components: { TopRight },
  data() {
    return {
      routes
    };
  },
  computed: {
    variables() {
      return variables;
    },
    activeMenu() {
      return this.$route.matched[0].path;
    },
    menuActiveTextColor() {
      return variables.menuActiveText;
    }
  }
};
</script>
<style lang="scss">
.top-menu {
  display: flex;
  justify-content: center;
}
.top-menu.el-menu.el-menu--horizontal {
  border-bottom: none !important;
}
</style>
