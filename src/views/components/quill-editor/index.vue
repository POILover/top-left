<template>
    <div class="app-container">
        <quillEditor
            ref="quillEditor"
            v-model="content"
            :options="editorOption"
            style="background: white"
        />
        <input
            style="display: none"
            ref="ghostUploader"
            type="file"
            accept="image/*"
            @change="uploadAndInsertFile"
        />
    </div>
</template>

<script>
// css
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

// editor
import { quillEditor } from "vue-quill-editor";

import Quill from "quill";

// font-size list
let fontSizeStyle = Quill.import("attributors/style/size");
fontSizeStyle.whitelist = ["12px", "14px", "16px", "18px", "20px", "24px"];
Quill.register(fontSizeStyle, true);

//image resize module, see also
import resizeImage from "quill-image-resize-module";
Quill.register("modules/resizeImage", resizeImage);
export default {
    name: "QuillEditor",
    components: { quillEditor },
    data() {
        return {
            content: "",
            editorOption: {
                placeholder: "you can upload, paste or drop image files here...",
                modules: {
                    resizeImage: {
                        displayStyles: {
                            backgroundColor: "black",
                            border: "none",
                            color: "white",
                        },
                        modules: ["Resize", "DisplaySize"],
                    },
                    toolbar: {
                        container: [
                            { size: ["12px", "14px", "16px", "18px", "20px", "24px"] },
                            "bold",
                            "italic",
                            "underline",
                            "image",
                        ],
                        handlers: {
                            image: () => {
                                this.$refs.ghostUploader.click();
                            },
                        },
                    },
                },
            },
        };
    },
    mounted() {
        this.initPasteAndDrop();
    },
    methods: {
        // insert upload file
        async uploadAndInsertFile() {
            const file = this.$refs.ghostUploader.files[0];
            const imageUrl = await this.uploadImage(file);
            if (imageUrl) {
                this.insertImage(imageUrl);
            }
        },
        insertImage(imageUrl) {
            const editor = this.$refs.quillEditor.quill;
            console.log(editor.getSelection());
            let length = editor.getSelection()?.index || editor.getLength();
            editor.insertEmbed(length, "image", imageUrl);
            editor.setSelection(length + 1);
        },
        async uploadImage(file) {
            // mock upload
            const reader = new FileReader();
            reader.readAsDataURL(file);
            return await new Promise(resolve => {
                reader.onload = function (e) {
                    console.log("upload success");
                    resolve(e.target.result);
                };
            });
        },

        // init paste and drop event
        initPasteAndDrop() {
            let quill = this.$refs.quillEditor.quill;
            if (!quill) {
                return;
            }
            quill.root.addEventListener(
                "paste",
                e => {
                    if (e.clipboardData?.files?.length) {
                        e.preventDefault();
                        const files = e.clipboardData.files;
                        this.handleImageFiles(files);
                    }
                },
                false
            );
            quill.root.addEventListener(
                "drop",
                e => {
                    // if quill has no cursor, create one
                    // if quill cursor is different with insert poistion, choose the latter
                    // TODO: deprecate
                    if (document.caretRangeFromPoint) {
                        const selection = document.getSelection();
                        const range = document.caretRangeFromPoint(e.clientX, e.clientY);
                        if (selection && range) {
                            selection.setBaseAndExtent(
                                range.startContainer,
                                range.startOffset,
                                range.startContainer,
                                range.startOffset
                            );
                        }
                    }

                    if (e.dataTransfer?.files?.length) {
                        e.preventDefault();
                        const files = e.dataTransfer.files;
                        this.handleImageFiles(files);
                    }
                },
                false
            );
        },
        handleImageFiles(files) {
            [].forEach.call(files, async file => {
                if (!file.type.match(/^image\/(gif|jpe?g|a?png|bmp)/i)) {
                    return;
                }
                const imageUrl = await this.uploadImage(file);
                if (imageUrl) {
                    this.insertImage(imageUrl);
                }
            });
        },
    },
};
</script>
<style lang="scss">
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="12px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="12px"]::before {
    content: "12px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="14px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="14px"]::before {
    content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="16px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16px"]::before {
    content: "16px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="18px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="18px"]::before {
    content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="20px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="20px"]::before {
    content: "20px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="24px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="24px"]::before {
    content: "24px";
}
</style>
