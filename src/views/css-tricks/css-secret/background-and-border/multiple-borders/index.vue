<template>
    <div class="example-container">
        <div class="example-dom">
            <div class="example-content1"></div>
        </div>
        <div class="example-dom">
            <div class="example-content2"></div>
        </div>
        <div class="example-dom">
            <div class="example-content3"></div>
        </div>
    </div>
</template>

<script>
/* 
    NOTE
    不影响布局, 可能会副作用
    KEY ATTRIBUTE
    使用box-shadow
*/
export default {
    name: "MultipleBorders",
    data() {
        return {};
    },
    mounted() {},
};
</script>
<style lang="scss" scoped>
.example-container {
    .example-dom {
        padding: 20px;
        width: 500px;
        height: 250px;
        .example-content1 {
            width: 200px;
            height: 100px;
            background: yellowgreen;
            box-shadow: 0 0 0 10px #655, 0 0 0 15px deeppink, 0 2px 5px 15px rgba(0, 0, 0, 0.6);
        }
        .example-content2 {
            width: 200px;
            height: 100px;
            background: yellowgreen;
            border: 10px solid #655;
            outline: 4px dashed deeppink;
            outline-offset: -6px;
        }
        .example-content3 {
            width: 200px;
            height: 100px;
            background: yellowgreen;
            border: 10px solid #655;
            outline: 4px solid deeppink;
        }
    }
    .expample-css {
        flex: 1;
    }
}
</style>
