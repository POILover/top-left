<template>
  <div class="right-menu">
    <el-dropdown
      class="avatar-container right-menu-item hover-effect"
      trigger="click"
    >
      <Avatar
        :username="avatarName"
        style="margin-top:7px;background-color:#409eff;color: #FFFFFF;width: 40px;height: 40px;font: 15px / 45px Helvetica, Arial, sans-serif"
      />
      <el-dropdown-menu slot="dropdown" class="profile-content">
        <div class="info">
          <Avatar
            :username="avatarName"
            style="margin: 0 auto;background-color:#409eff;color: #FFFFFF;width: 58px;height: 58px"
          />
          <div style="margin-top:10px;margin-bottom: 10px;color: #1f2329">
            {{ realName }}
          </div>
          <el-dropdown-item divided @click.native="logout">
            <div style="color: #f54a45">退出登录</div>
          </el-dropdown-item>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
// TODO: 重写头像
import Avatar from "vue-avatar";

export default {
  name: "TopRight",
  components: { Avatar },
  computed: {
    avatarName() {
      return "Wang";
    },

    realName() {
      return "Wang";
    }
  },
  methods: {
    async logout() {}
  }
};
</script>
<style lang="scss" scoped>
.profile-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px;
  width: 200px;
  min-width: 170px;

  .info {
    margin: 0;
    padding-top: 22px !important;
    padding-bottom: 10px !important;
    text-align: center;
  }
}

.avatar-info {
  margin: 0 auto;
  background-color: #cccccc;
  color: #ffffff;
  width: 58px;
  height: 58px;
}

.right-menu {
  float: right;
  height: 100%;

  &:focus {
    outline: none;
  }

  .right-menu-item {
    display: inline-block;
    padding: 4px;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;

    &.hover-effect {
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }

  .avatar-container {
    margin-right: 30px;

    .avatar-wrapper {
      margin-top: 5px;
      position: relative;

      .user-avatar {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }

      .el-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
