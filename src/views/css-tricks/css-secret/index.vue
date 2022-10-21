<template>
    <div class="app-container">
        <div class="examples" style="">
            <translucent-borders />
            <multiple-borders />
        </div>
    </div>
</template>

<script>
import hljs from "highlight.js";
import "highlight.js/styles/hybrid.css";
import TranslucentBorders from "./background-and-border/translucent-borders/index";
import MultipleBorders from "./background-and-border/multiple-borders/index";
export default {
    name: "CssSecret",
    components: { TranslucentBorders, MultipleBorders },
    data() {
        return {
            csscode: `
    width: 100%;
    height: 100%;
    background: #58a;
    background: linear-gradient(135deg, transparent 15px, #58a 0) top left,
        linear-gradient(-135deg, transparent 15px, #58a 0) top right,
        linear-gradient(-45deg, transparent 15px, #58a 0) bottom right,
        linear-gradient(45deg, transparent 15px, #58a 0) bottom left;
    background-size: 50% 50%;
    background-repeat: no-repeat;
            `,
            hljscode: null,
        };
    },
    mounted() {
        document.querySelectorAll("code pre").forEach(el => {
            hljs.highlightElement(el, { language: "scss" });
        });
    },
};
</script>
<style lang="scss" scoped>
.example-container {
    .example-dom {
        padding: 20px;
        width: 200px;
        height: 200px;
        .example-content {
            width: 100%;
            height: 100%;
            background: #58a;
            background: linear-gradient(135deg, transparent 15px, #58a 0) top left,
                linear-gradient(-135deg, transparent 15px, #58a 0) top right,
                linear-gradient(-45deg, transparent 15px, #58a 0) bottom right,
                linear-gradient(45deg, transparent 15px, #58a 0) bottom left;
            background-size: 50% 50%;
            background-repeat: no-repeat;
        }
    }
    .expample-css {
        flex: 1;
    }
}
</style>
