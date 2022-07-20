<template>
  <div class="app-container">
    <el-button @click="onAddMainNode" type="primary">
      添加主节点
    </el-button>
    <el-table
      :data="childList"
      style="margin-top:10px;width:50%"
      row-key="customId"
      :tree-props="{
        children: 'childList'
      }"
      ref="table"
      @row-click="onRowClick"
    >
      <el-table-column label="编号">
        <template slot-scope="scope">
          <span>
            {{ scope.$index + 1 }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="templateName">
        <template slot-scope="scope">
          <span v-if="editObject.editRowIndex !== scope.$index">
            {{ scope.row.templateName }}
          </span>
          <el-input v-else v-model="scope.row.templateName"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="templateDesc">
        <template slot-scope="scope">
          <span v-if="editObject.editRowIndex !== scope.$index">
            {{ scope.row.templateDesc }}
          </span>
          <el-input v-else v-model="scope.row.templateDesc"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <span v-if="editObject.editRowIndex !== scope.$index">
            <el-button type="text" @click="onAddChildNode(scope)">
              添加子节点
            </el-button>
            <el-button type="text" @click="onEditRow(scope)">
              编辑
            </el-button>
            <el-button type="text" @click="onDeleteRow(scope)">
              删除
            </el-button>
          </span>
          <span v-else>
            <el-button type="text" @click="onSaveRow()">
              保存
            </el-button>
            <el-button type="text" @click="onCancelRow(scope)">
              取消
            </el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "InlineEditTreeTable",
  data() {
    return {
      childList: [
        {
          templateDesc: "1desc",
          templateName: "1name",
          childList: [
            {
              templateDesc: "2desc",
              templateName: "2name",
              childList: []
            }
          ]
        },
        {
          templateDesc: "3desc",
          templateName: "3name",
          childList: [
            {
              templateDesc: "4desc",
              templateName: "4name",
              childList: []
            }
          ]
        }
      ],
      customId: -1,
      editObject: { editRow: false, editRowIndex: -1 },
      preObject: {}
    };
  },
  mounted() {
    this.childList = this.setCustomId(this.childList);
    // this.refreshTreeTable();
  },
  methods: {
    getCustomId() {
      // TODO: computed
      return this.customId--;
    },
    setCustomId(data) {
      let _this = this;
      function recursiveSetCustomId(childList) {
        for (let i = 0, len = childList.length; i < len; i++) {
          childList[i].customId = _this.getCustomId();
          if (childList[i].childList) {
            recursiveSetCustomId(childList[i].childList);
          }
        }
      }
      recursiveSetCustomId(data);
      return data;
    },
    onRowClick(row) {
      // TODO: 优化展开事件
      // (this.$refs[`table`] as ElTable).toggleRowExpansion(row);
    },
    onConfirm() {
      this.isDialogVisible = false;
    },
    onCancel() {
      this.isDialogVisible = false;
    },
    onAddMainNode() {
      this.preObject = {};
      if (this.editObject.editRowIndex >= 0) {
        this.$message.error("请先保存");
        return;
      }
      const customId = this.getCustomId();
      this.childList.push({
        customId: customId,
        templateDesc: `${customId}desc`,
        templateName: `${customId}name`
      });

      this.editObject.editRowIndex =
        this.recursiveCountChildLength(this.childList) - 1;
      // this.refreshTreeTable();
    },
    recursiveCountChildLength(data) {
      // 递归获取原数据所有子节点的个数
      let childrenLen = 0;
      function recursiveGetChildrenLen(childList) {
        let len = childList.length;
        childrenLen += len;
        for (let i = 0; i < len; i++) {
          if (childList[i].childList) {
            recursiveGetChildrenLen(childList[i].childList);
          }
        }
      }
      recursiveGetChildrenLen(data);
      return childrenLen;
    },
    onAddChildNode(scope) {
      this.preObject = {};
      if (this.editObject.editRowIndex >= 0) {
        this.$message.error("请先保存");
        return;
      }
      if (!scope.row.childList) {
        this.$set(scope.row, "childList", []);
      }
      const customId = this.getCustomId();
      scope.row.childList.push({
        customId: customId,
        templateDesc: `${customId}desc`,
        templateName: `${customId}name`
      });

      // 要编辑的节点是当前节点的index，并偏移该节点下所有子节点个数的数量
      this.editObject.editRowIndex =
        scope.$index + this.recursiveCountChildLength(scope.row.childList);
      // this.refreshTreeTable();
      this.$nextTick(() => {
        this.$refs[`table`].toggleRowExpansion(scope.row, true);
      });
    },
    // refreshTreeTable() {
    //   // HACK: 刷新节点
    //   this.childList.push({ customId: 0 });
    //   this.childList.pop();
    // },
    onEditRow(scope) {
      if (this.editObject.editRowIndex >= 0) {
        this.$message.error("请先保存");
        return;
      }
      this.preObject = { ...scope.row };
      this.editObject.editRowIndex = scope.$index;
    },
    recursiveFindRow(targetData, targetCustomId) {
      // 得益于引用类型，递归查询并返回目标节点的父节点和目标节点在父节点的位置
      let flag = true;
      let retList = [],
        retIndex = -1;
      function findRow(childList) {
        for (let i = 0, len = childList.length; i < len; i++) {
          if (childList[i].customId == targetCustomId) {
            retList = childList;
            retIndex = i;
            flag = false;
            break;
          }
          if (flag && childList[i].childList) {
            findRow(childList[i].childList);
          }
        }
      }
      findRow(targetData);
      return [retList, retIndex];
    },
    onDeleteRow(scope) {
      let editRowIndex = this.editObject.editRowIndex;
      if (editRowIndex >= 0 && scope.$index !== editRowIndex) {
        this.$message.error("请先保存");
        return;
      }
      // 递归寻找要删除的节点在源数据的位置，并删除
      let [childList, idx] = this.recursiveFindRow(
        this.childList,
        scope.row.customId
      );
      childList.splice(idx, 1);
      // this.refreshTreeTable();
    },

    onSaveRow() {
      this.editObject.editRowIndex = -1;
    },

    onCancelRow(scope) {
      if (Object.keys(this.preObject).length) {
        let [childList, idx] = this.recursiveFindRow(
          this.childList,
          scope.row.customId
        );
        childList.splice(idx, 1, this.preObject);
      } else {
        this.onDeleteRow(scope);
      }

      this.editObject.editRowIndex = -1;
      this.preObject = {};
    }
  }
};
</script>
