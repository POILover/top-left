<template>
    <div class="example-container">
        <div class="example-dom">
            <div class="example-content">Can I haz semi-transparent borders? Pretty please?</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TranslucentBorders",
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
        background: url("http://csssecrets.io/images/stone-art.jpg");
        .example-content {
            border: 10px solid hsla(0, 0%, 100%, 0.5);
            background: white;
            background-clip: padding-box;

            /* styling */
            max-width: 20em;
            padding: 2em;
            margin: 2em auto 0;
            font: 100%/1.5 sans-serif;
        }
    }
    .expample-css {
        flex: 1;
    }
}
</style>
