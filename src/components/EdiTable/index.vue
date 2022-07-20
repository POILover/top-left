<template>
  <div class="editable">
    <el-table
      :cell-style="cellStyle"
      @cell-click="cellClick"
      style="width:100%;margin-top:15px;"
      size="small"
      border
      max-height="800px"
      :data="tableData"
      ref="editable"
      row-key="id"
    >
      <!-- TODO: 重新定义slot -->
      <slot name="header"></slot>
      <!-- TODO: deal key -->
      <el-table-column
        v-for="(item, key) in structure"
        :key="key"
        :label="item.label"
        :prop="item.prop"
      >
        <template slot-scope="scope">
          <template v-if="showInput(scope) && !item.disableEdit">
            <el-input
              @blur="updateData"
              ref="slot-input"
              v-if="showInput(scope) && item.type === 'normal'"
              size="mini"
              v-model="scope.row[item.prop]"
              style="width:100%"
            ></el-input>
            <!-- <InputNumber
              @blur="updateData"
              ref="slot-input"
              v-if="showInput(scope) && item.type === 'normal'"
              size="mini"
              v-model="scope.row[item.prop]"
              style="width:100%"
          ></InputNumber> -->
            <el-select
              @visible-change="updateDataSelect"
              ref="slot-input"
              v-if="showInput(scope) && item.type === 'select'"
              size="mini"
              v-model="scope.row[item.prop]"
              style="width:100%"
              automatic-dropdown
            >
              <el-option
                v-for="selOption in item.data"
                :key="selOption.value"
                :label="selOption.label"
                :value="selOption.value"
              >
              </el-option>
            </el-select>
            <el-select
              @visible-change="updateDataSelect"
              ref="slot-input"
              v-if="showInput(scope) && item.type === 'multi-select'"
              size="mini"
              v-model="scope.row[item.prop]"
              style="width:100%"
              automatic-dropdown
              multiple
              collapse-tags
            >
              <el-option
                v-for="selOption in item.data"
                :key="selOption.value"
                :label="selOption.label"
                :value="selOption.value"
              >
              </el-option>
            </el-select>
          </template>
          <div class="cell-content" v-else>
            {{ getLabel(scope, item) }}
          </div>
          <!-- TODO: 将两个icon放到最后 -->
          <i
            @click.stop="deleteCell(scope)"
            v-if="showOperator(scope) && key === structure.length - 1"
            class="el-icon-close hover-icon delete"
          ></i>
          <i
            @click.stop="addRow(scope)"
            v-if="showOperator(scope) && key === structure.length - 1"
            class="el-icon-plus hover-icon add"
          ></i>
        </template>
      </el-table-column>
      <slot name="tailer"></slot>
    </el-table>
    <el-button
      v-if="!tableData.length"
      @click="addRow()"
      size="mini"
      class="add-button"
      plain
    >
      +
    </el-button>
  </div>
</template>

<script>
// TODO: 重写，同el-table式使用[不太可能]
// TODO: input / input-number / input-textarea / select / multi-select / date-picker / time-picker
// TODO: slot-before, slot-after, unEditAble
// TODO: 添加sortable
import Sortable from "sortablejs";
export default {
  name: "EdiTable",
  props: {
    tableData: {
      type: Array,
      required: true
    },
    structure: {
      type: Array,
      required: true
    },
    unEditableColumn: {
      type: String || Array,
      default: ""
    }
  },
  data() {
    return {
      clickIndex: [-1, -1],
      slotHeaderLength: 0
    };
  },

  computed: {
    addRowItem() {
      let ret = {};
      this.structure.forEach(item => {
        if (item.type === "multi-select") {
          ret[item.prop] = [];
        } else {
          ret[item.prop] = undefined;
        }
      });
      ret.id = this.tableData.length + 1;
      return ret;
    }
  },

  mounted() {
    this.slotHeaderLength = this.$slots.header.length;
    this.$nextTick(() => {
      this.setSort();
    });
  },

  methods: {
    setSort() {
      const el = this.$refs.editable.$el.querySelectorAll(
        ".el-table__body-wrapper > table > tbody"
      )[0];
      this.sortable = Sortable.create(el, {
        ghostClass: "sortable-ghost", // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          dataTransfer.setData("Text", "");
        },
        onEnd: evt => {
          const targetRow = this.tableData.splice(evt.oldIndex, 1)[0];
          this.tableData.splice(evt.newIndex, 0, targetRow);
          console.log(this.tableData)
        }
      });
    },
    getLabel(scope, item) {
      const cellValue = scope.row[item.prop];
      let ret;
      if (item.type === "normal") {
        return cellValue;
      } else if (item.type === "select") {
        let idx = item.data.findIndex(d => d.value == cellValue);
        if (idx >= 0) {
          return item.data[idx].label;
        } else {
          return "";
        }
      } else if (item.type === "multi-select") {
        ret = [];
        cellValue.forEach(val => {
          let idx = item.data.findIndex(d => d.value == val);
          if (idx >= 0) {
            ret.push(item.data[idx].label);
          }
        });
        // TODO: 换行
        return ret.join(",");
      }
    },
    deleteCell(scope) {
      let index = scope.row.index;
      this.tableData.splice(index, 1);
    },
    addRow(scope) {
      if (scope) {
        let index = scope.row.index;
        this.tableData.splice(index + 1, 0, {
          ...this.addRowItem
        });
      } else {
        this.tableData.push({
          ...this.addRowItem
        });
      }
    },
    updateData() {
      this.clickIndex = [-1, -1];
      this.$refs[`slot-input`][0].blur();
      console.log(this.tableData);
    },
    // TODO: 结合change和visible-change事件
    updateDataSelect(isExpand) {
      if (!isExpand) {
        this.clickIndex = [-1, -1];
        this.$refs[`slot-input`][0].blur();
      }
    },
    showOperator(scope) {
      return this.clickIndex[0] !== scope.row.index;
    },
    showInput(scope) {
      return (
        scope.row.index === this.clickIndex[0] &&
        scope.column.index === this.clickIndex[1]
      );
    },
    // 根据slot和disableEdit禁用click
    cellClick(row, column) {
      const prop = column.property;
      const disableEdit = this.structure.some(
        item => item.prop === prop && item.disableEdit
      );
      const columnIdx = column.index;
      if (
        columnIdx < this.slotHeaderLength ||
        columnIdx > this.tableData.length + this.slotHeaderLength ||
        disableEdit
      ) {
        return;
      }
      this.clickIndex = [row.index, columnIdx];
      this.$nextTick(() => {
        this.$refs[`slot-input`][0].focus();
      });
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      row.index = rowIndex;
      column.index = columnIndex;
      return "height:46px";
    }
  }
};
</script>
<style lang="scss">
// TODO: 多行文本实现
// TODO: 切换时闪烁
.editable {
  .el-table__row {
    td {
      padding: 0 !important;
      .cell {
        //   height: 46px;
        padding: 0 !important;
        overflow: hidden;
        .el-table--border td:first-child .cell {
          padding: 0 !important;
        }
        .el-input {
          input {
            height: 46px !important;
            border: none !important;
            box-sizing: border-box;
            // border-bottom: 1px solid transparent !important;
            border-radius: 0 !important;
          }
          .el-input__inner {
            font-family: Arial, "Times New Roman", "Microsoft YaHei", SimHei;
            font-size: 13px;
            letter-spacing: 1px;
            line-height: 46px;
            padding-left: 10px !important;
          }
        }
        .cell-content {
          font-size: 13px;
          padding: 0 10px;
          height: 100%;
          font-family: Arial, "Times New Roman", "Microsoft YaHei", SimHei;
          // line-height: 46px;
          letter-spacing: 1px;
        }
      }
    }
  }
  .sortable-ghost {
    opacity: 0.8;
    color: #fff !important;
    background: #42b983 !important;
  }
}
</style>
<style lang="scss" scoped>
.editable {
  width: 50%;
  .add-button {
    width: 100%;
    margin-bottom: 20px;
    height: 30px !important;
    font-size: 16px;
  }

  .hover-icon {
    display: none;
    position: absolute;
    right: 5px;
    &.add {
      bottom: 5px;
    }
    &.delete {
      top: 5px;
    }
    &:hover {
    }
  }

  .el-table__row:hover .hover-icon {
    display: block;
  }
}
</style>
