<template>
  <div>
    <div class="opacity-wrapper" style="width:600px;height:300px;">
      <div
        class="scroll-wrapper"
        style="width:600px;height:200px;overflow:hidden;white-space:nowrap"
      >
        <div style="display:inline-block;">
          <div
            v-for="i in 15"
            :key="i + '1'"
            style="padding:10px;height:200px;width:200px;display:inline-block;line-height:180px;text-align:center"
            class="sponsor-bg1"
          >
            {{ ((i - 1) % 5) + 1 }}
          </div>
          <div
            v-for="i in 3"
            :key="i + '2'"
            style="padding:10px;height:200px;width:200px;display:inline-block;line-height:180px;text-align:center"
            class="sponsor-bg1"
          >
            {{ i }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "@better-scroll/core";
export default {
  name: "HorizonInfiniteRolling",
  mounted() {
    //this.$animation()
    this.$nextTick(() => {
      let wrapper = document.querySelector(".scroll-wrapper");
      wrapper.addEventListener("mouseover", () => {
        clearInterval(this.scrollTimer);
      });
      wrapper.addEventListener("mouseleave", () => {
        this.scrollTimer = setInterval(this.scrollFun, 50);
      });
      this.scroll = new BScroll(wrapper, {
        scrollX: true,
        scrollY: false,
        mouseWheel: true,
        bounce: false
      });
      this.scroll.on("scrollEnd", () => {
        console.log(Math.abs(this.scroll.maxScrollX - this.scroll.x));
        if (Math.abs(this.scroll.maxScrollX - this.scroll.x) <= 1) {
          this.scroll.scrollTo(0, 0, 0);
        }
      });
      this.scrollTimer = setInterval(this.scrollFun, 50);
    });
  },
  beforeDestroy() {
    if (this.scrollTimer) {
      clearInterval(this.scrollTimer);
    }
  },
  methods: {
    scrollFun() {
      this.scroll.scrollBy(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.sponsor-bg1 {
  background-color: #f72c5b;
  border-radius: 50%;
}
</style>
