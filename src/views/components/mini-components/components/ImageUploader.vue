<template>
  <div class="gpc-image-upload-container">
    <el-upload
      class="avatar-uploader"
      action="String"
      :show-file-list="false"
      :before-upload="onValidateFile"
    >
      <i v-if="showUplaoder" class="el-icon-plus avatar-uploader-icon"></i>
      <div v-else class="img-container avatar-uploader-icon">
        <img id="img" height="100%" width="100%" :src="src" alt="" />
        <div class="img-icon-container">
          <i
            @click.stop.prevent="showImageDialog = true"
            class="el-icon-zoom-in img-icon"
          ></i>
          <i
            @click.stop.prevent="onDeleteImage"
            class="el-icon-delete img-icon"
          ></i>
        </div>
      </div>
    </el-upload>
    <el-dialog
      append-to-body
      custom-class="gpc-upload-dialog"
      :visible.sync="showImageDialog"
    >
      <img width="100%" :src="src" alt="" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "ImageUplader",
  data() {
    return {
      src:
        "https://himg.bdimg.com/sys/portrait/item/public.1.341ddc69.o1AnaBNj43rtLhvNpnTm-Q.jpg",
      showImageDialog: false
    };
  },
  computed: {
    showUplaoder() {
      return !this.src;
    }
  },
  methods: {
    onValidateFile(file) {
      let form = new FormData();
      form.append("image", file);
    },
    onDeleteImage() {
      this.src = "";
    }
  }
};
</script>
<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 200px;
  line-height: 200px;
  text-align: center;
}
</style>
<style lang="scss" scoped>
.gpc-image-upload-container {
  .img-container {
    position: relative;
    &:hover {
      img {
        filter: brightness(0.2);
      }
      .img-icon-container {
        opacity: 1;
      }
    }
    .img-icon-container {
      width: 100%;
      height: 20px;
      position: absolute;
      top: 50%;
      display: flex;
      justify-content: center;
      opacity: 0;
      .img-icon {
        margin-left: 20px;
        color: white;
        font-size: 24px;
        cursor: pointer;
      }
    }
  }
}
</style>
