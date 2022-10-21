<template>
    <div class="tech-feeling" style="height: 100vh; overflow: hidden">
        <!-- 背景是一张图 -->
        <!-- 顶部有一排工具栏, 所有显示均在此下方 -->
        <div class="top-tool">
            <div v-for="i in 4" :key="i" class="tool">
                <svg-icon icon-class="zoomout" style="width: 100%; height: 100%"></svg-icon>
            </div>
        </div>
        <!-- 左上角会出现能隐现的弹出框 -->
    </div>
</template>

<script>
export default {
    name: "TechFeeling",
    components: {},
    data() {
        return {};
    },
    mounted() {},
    methods: {},
};
</script>
<style scoped lang="scss">
.tech-feeling {
    background-image: url("./China_satellite.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 0 -100px;
    .top-tool {
        display: flex;
        justify-content: center;
        .tool {
            width: 50px;
            height: 50px;
            border-right: 2px solid black;
            box-sizing: border-box;
            background: linear-gradient(135deg, white 2px, rgba(43, 66, 79, 1) 0) top left,
                linear-gradient(-45deg, white 2px, rgba(43, 66, 79, 1) 0) bottom right;
            background-size: 50% 100%;
            background-repeat: no-repeat;
            // background-color: rgba(43, 66, 79, 1);
        }
    }
}
</style>
