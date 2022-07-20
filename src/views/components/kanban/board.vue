<template>
  <div class="app-container">
    <div style="margin-bottom:10px">全部看板</div>
    <div class="board-container">
      <div
        @click="onClickKanban(kanban.kanbanId)"
        v-for="kanban in kanbanList"
        :key="kanban.id"
        class="kanban"
      >
        <h3 class="kanban-name">{{ kanban.name }}</h3>
        <el-popover popper-class="kanban-popover" placement="right" trigger="click">
          <div class="board-popover">
            <div
              @click="onDeleteKanban(kanban.kanbanId)"
              class="popover-content"
            >
              永久删除
            </div>
            <div class="popover-content">归档</div>
            <div
              @click="onRenameKanban(kanban.name, kanban.kanbanId)"
              class="popover-content"
            >
              重命名
            </div>
          </div>
          <div @click.stop="" slot="reference" class="kanban-more-icon">
            <i class="el-icon-more"></i>
          </div>
        </el-popover>

        <p class="kanban-create-time">创建于 {{ kanban.createTime }}</p>
        <div class="kanban-creater">
          <Avatar class="avatar" :username="kanban.createUserName"> </Avatar>
        </div>
      </div>
      <div @click="onNewKanban" class="kanban-create">
        <i class="el-icon-plus"></i>新建看板
      </div>
    </div>
    <el-dialog
      :title="dialogType === 'create' ? '新建看板' : '编辑看板'"
      :visible.sync="showCreateKanbanDialog"
      class="create-kanban-dialog"
      width="540px"
    >
      <div class="create-kanban-dialog-container">
        <div class="item-name">
          <span>名称：</span>
          <el-input
            v-model="selectedKanbanName"
            style="width:230px"
            placeholder="输入看板名称"
          ></el-input>
        </div>
        <div class="item-color">
          <span>主题色：</span>
          <div class="color-container">
            <div
              @click="onClickKanbanFormColor(colorCode)"
              v-for="(color, colorCode) in kanbanColorMap"
              :key="colorCode"
              class="color-item"
              :style="`background-color:${color}`"
              :class="selectedKanbanColorCode === colorCode ? 'selected' : ''"
            ></div>
          </div>
        </div>
        <div class="item-date">
          <span>起止日期：</span>
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="selectedKanbanStartEndDate"
            class="date-picker"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>

        <div class="set-private">
          <el-checkbox v-model="isSelectedKanbanPrivate">设为私密</el-checkbox>
        </div>
        <div class="operate-btn">
          <span class="button plain" @click="onCancelKanbanDialog">取消</span>
          <span
            @click="onConfirmKanbanDialog"
            :class="selectedKanbanName ? '' : 'disabled'"
            class="button red"
          >
            {{ dialogType === "create" ? "新建" : "确认" }}
          </span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Avatar from "vue-avatar";
import { kanbanList } from "./data/data";
export default {
  name: "Board",
  components: { Avatar },
  data() {
    return {
      kanbanList,
      newKanbanName: "",
      menuId: 4,
      showTmpKanban: false,
      selectedKanbanId: -1,
      selectedKanbanName: "",
      selectedKanbanColorCode: "color1",
      selectedKanbanStartEndDate: ["", ""],
      isSelectedKanbanPrivate: false,
      dialogType: "create",
      showCreateKanbanDialog: false,
      loading: false,
      allMemberList: [],
      checkedMemberList: [],
      kanbanColorMap: {
        color1: "rgb(246, 175, 5)",
        color2: "rgb(179, 138, 119)",
        color3: "rgb(240, 138, 93)",
        color4: "rgb(108, 175, 120)",
        color5: "rgb(58, 195, 174)",
        color6: "rgb(85, 133, 193)",
        color7: "rgb(245, 86, 84)",
        color8: "rgb(59, 89, 152)"
      }
    };
  },
  created() {
    this.getKanban();
  },
  methods: {
    onConfirmKanbanDialog() {
      this.showCreateKanbanDialog = false;
    },
    onCancelKanbanDialog() {
      this.showCreateKanbanDialog = false;
    },
    onClickKanbanFormColor(colorCode) {
      this.selectedKanbanColorCode = colorCode;
    },
    getKanban() {},
    onClickKanban(kanbanId) {
      this.$router.push(`/components/kanban?id=${kanbanId}`);
    },
    onNewKanban() {
      this.dialogType = "create";
      this.showCreateKanbanDialog = true;
    },
    onRenameKanban(name, id) {
      this.$prompt("", "重命名", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPlaceholder: "请输入看板名称",
        confirmButtonClass: "custom-confirm-button",
        inputValue: name
      })
        .then(value => {
          let name = value?.value;
          this.$message.warning(`kanban id: ${id}, kanban name: ${name}`);
        })
        .catch(() => {});
    },
    onCreateKanban() {
      if (this.newKanbanName) {
        this.$message.warning(`new kanban name: ${this.newKanbanName}`);
      } else {
        this.showTmpKanban = false;
      }
    },
    onDeleteKanban(kanbanId) {
      this.$confirm("确认删除？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$message.warning(`delete: kanban id ${kanbanId}`);
      });
    }
  }
};
</script>
<style lang="scss">
.item-date {
  .date-picker {
    width: 230px;
    .el-range__icon {
      display: none;
    }
    .el-range-separator {
      width: 30px !important;
    }
  }
}
.kanban-name {
  .el-input__inner {
    padding: 0 5px !important;
    border-radius: 16px !important;
    border: 1px solid white !important;
  }
  .el-input__inner:focus {
    border: 1px solid #dcdfe6 !important;
  }
}
.custom-confirm-button {
  background: red !important;
  border-color: red !important;
}

.kanban-popover.el-popover {
  padding: 0 !important;
  min-width: 0px !important;
  border-radius: 8px;
  .board-popover {
    width: 100px;
    .popover-content {
      font-weight: 400;
      cursor: pointer;
      display: flex;
      color: rgba(3, 14, 44, 0.85);
      justify-content: flex-start;
      padding-left: 16px;
      padding-right: 16px;
      align-items: center;
      width: 100%;
      min-height: 40px;
      position: relative;
      &:hover {
        background-color: rgba(255, 202, 25, 0.25);
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.create-kanban-dialog-container {
  padding: 0px 75px;
  .item-name {
    display: flex;
    -webkit-box-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    align-items: center;
    min-height: 40px;
    color: rgb(3, 14, 44);
    transform: translateX(12px);
    & > span {
      margin-right: 24px;
      text-align: right;
    }
  }
  .item-member {
    display: flex;
    -webkit-box-pack: start;
    justify-content: flex-start;
    min-height: 40px;
    color: rgb(3, 14, 44);
    margin-top: 16px;
    transform: translateX(10px);
    & > span {
      margin-right: 24px;
      text-align: right;
      transform: translateX(-16px);
      min-width: 60px;
    }
    .member-container {
      display: flex;
      margin-left: 8px;
      flex-flow: wrap;
      transform: translateX(-24px);
      .member-item {
        background-color: rgb(17, 175, 167);
        // min-width: 40px;
        border-radius: 4px;
        height: 20px;
        line-height: 20px;
        font-weight: 400;
        color: rgb(255, 255, 255);
        margin-right: 4px;
        max-width: 208px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: right;
        padding: 0px 8px;
        margin-bottom: 8px;
        position: relative;
        transition: all 0.5s ease 0s !important;
        i {
          color: rgb(255, 255, 255);
          // font-size: 10px;
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          display: none !important;
          transition: all 0.5s ease 0s !important;
        }
        i:hover {
          color: rgba(255, 255, 255, 0.65);
        }
      }
      .member-item.dialog-member-list:hover {
        padding-right: 24px;
        i {
          display: block !important;
        }
      }
      .memeber-list-icon {
        //  margin-right: -5px;
        // font-size: 24px;
        // font-weight: 600;
        // color: rgba(3, 14, 44, 0.65);
        // span:first-child:focus {
        //     outline: none !important;
        // }
        // i {
        cursor: pointer;
        padding: 2px 0;
        border-radius: 50%;
        margin-left: 3px;
        // }
        &:hover {
          background: rgba(3, 14, 44, 0.04);
        }
      }
    }
  }

  .item-color {
    display: flex;
    -webkit-box-pack: start;
    justify-content: flex-start;
    min-height: 40px;
    color: rgb(3, 14, 44);
    margin-top: 20px;
    transform: translateX(10px);
    .color-container {
      display: flex;
      margin-left: 8px;
      flex-flow: wrap;
      transform: translateX(-20px);
      .color-item {
        background-color: rgb(246, 175, 5);
        cursor: pointer;
        width: 32px;
        height: 32px;
        box-shadow: rgb(246 175 5 / 45%) 0px 2px 8px 0px;
        border-radius: 50%;
        margin-right: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 8px;
        &.selected::before {
          content: "√";
        }
      }
    }

    & > span:first-child {
      text-align: right;
      display: block;
      margin-right: 0px;
      transform: translateX(-15px);
      padding-right: 24px;
      min-width: 84px;
    }
  }
  .item-date {
    display: flex;
    -webkit-box-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    align-items: center;
    min-height: 40px;
    color: rgb(3, 14, 44);
    margin: 8px 0;
    & > span {
      transform: translateX(-16px);
    }
    .date-picker {
      transform: translateX(8px);
    }
  }
  .operate-btn {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    min-height: 40px;
    .button {
      padding-left: 2px;
      cursor: pointer;
      // background: white;
      text-align: center;
      font-size: 14px;
      width: 66px;
      height: 32px;
      line-height: 32px;
      border-radius: 14px;
      margin-left: 8px;
      &.red {
        color: white;
        background: rgb(245, 86, 84);
      }
      &.disabled {
        cursor: not-allowed;
        background: rgba(245, 86, 84, 0.5);
      }
    }
  }
  .set-private {
    display: flex;
    -webkit-box-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    align-items: center;
    min-height: 40px;
    color: rgb(3, 14, 44);
    transform: translateX(12px);
  }
}
.board-container {
  display: flex;
  flex-wrap: wrap;
  .kanban {
    margin: 0px 24px 16px 0px;
    cursor: pointer;
    user-select: none;
    position: relative;
    width: 224px;
    height: 114px;
    background: rgb(255, 255, 255);
    box-shadow: rgba(3, 14, 44, 0.09) 0px 2px 6px 0px;
    border-radius: 8px;
    box-sizing: border-box;
    border-left: 8px solid rgb(246, 175, 5);
    padding: 16px 24px;
    transition: transform 0.5s ease-out 0s, box-shadow 0.5s ease-out 0s;
    &:hover {
      // transform: translateY(-5px);
      box-shadow: rgba(3, 14, 44, 0.15) 0px 2px 16px 0px;
    }
    .kanban-more-icon {
      position: absolute;
      top: 6px;
      right: 6px;
      // opacity: 0;
      display: flex;
      -webkit-box-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      align-items: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      &:hover {
        background: rgba(3, 14, 44, 0.04);
      }
      i {
        font-weight: 200;
        transform: rotate(90deg);
      }
    }
    .kanban-name {
      font-size: 16px;
      color: rgba(3, 14, 44, 0.85);
      font-weight: 500;
      margin-bottom: 16px;
      max-width: 144px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: 0;
    }
    .kanban-name-input {
      width: 100px;
      display: inline;
    }
    .kanban-create-time {
      color: rgba(3, 14, 44, 0.45);
      font-size: 12px;
      margin-bottom: 12px;
      margin-top: 0;
    }
    .kanban-creater {
      width: 24px;
      height: 24px;
      line-height: 24px;
      border-radius: 50%;

      .avatar {
        width: 24px !important;
        height: 24px !important;
        line-height: 24px !important;
        margin: 0px 2px;
        background-color: rgba(128, 128, 128, 0.3) !important;
        color: rgba(128, 128, 128, 1) !important;
        font-size: 10px !important;
      }
    }
  }
  .kanban-create {
    margin-bottom: 16px;
    width: 224px;
    height: 114px;
    border-radius: 8px;
    border: 1px dashed rgba(3, 14, 44, 0.25);
    color: rgba(3, 14, 44, 0.65);
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    cursor: pointer;
    -webkit-box-align: center;
    align-items: center;
    i {
      margin-right: 5px;
    }
  }
}
</style>
