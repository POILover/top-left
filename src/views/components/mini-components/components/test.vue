<template>
    <div>
        <div class="history-container">
            <div v-for="i in 63" :key="i" class="block-container">
                <div class="origin">origin {{ i }}</div>
                <div class="scale">scale {{ i }}</div>
            </div>
        </div>
        <div class="ghost"></div>
    </div>
</template>

<script>
export default {
    name: "Test",
};
</script>
<style lang="scss" scoped>
.history-container {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    .block-container {
        width: 100px;
        height: 100px;
        background-color: #fff;
        border-top: 1px solid #ebeef5;
        border-right: 1px solid #ebeef5;
        .scale {
            display: none;
        }
        .origin {
            display: block;
        }
        &:hover {
            background-color: #ebeef5;
            transform: scale(2);
            transition: transform 0.4s;
            .scale {
                display: block;
            }
            .origin {
                display: none;
            }
        }
    }
}
</style>
