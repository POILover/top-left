<template>
  <div class="app-container">
    <!-- <span style="font-size:14px;color:red">
      * 写着写着，甚至都不知道为什么要用el-table了😷
    </span> -->
    <edi-table :structure="structure" :tableData="tableData">
      <template v-slot:header>
        <el-table-column label="slot-header">
          <template slot-scope="scope">
            <div class="cell-content">
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
      </template>
      <template v-slot:tailer>
        <el-table-column label="slot-tailer">
          <template slot-scope="{}">
            <div class="cell-content">
              <el-button size="small" type="warning">禁止通行</el-button>
            </div>
          </template>
        </el-table-column>
      </template>
    </edi-table>
  </div>
</template>

<script>
import EdiTable from "@/components/EdiTable";
const selectData = [
  { label: "拉的多不多", value: "option1" },
  { label: "拉布拉多", value: "option2" }
];
const multiSelectData = [
  { label: "能拉", value: "option1" },
  { label: "只能拉一点点", value: "option2" },
  { label: "到二仙桥", value: "option3" },
  { label: "走成华大道", value: "option4" }
];
export default {
  name: "EdiTablePage",
  components: { EdiTable },
  data() {
    return {
      structure: [
        {
          label: "normal",
          prop: "item1",
          type: "normal"
        },

        {
          label: "select",
          prop: "item2",
          type: "select",
          data: selectData
        },
        {
          label: "multi-select",
          prop: "item3",
          type: "multi-select",
          data: multiSelectData
        },
        {
          label: "disable",
          prop: "item4",
          type: "normal",
          disableEdit: true
        }
      ],
      tableData: [
        {
          id: 1,
          item1: "货拉拉",
          item2: "option1",
          item3: ["option1", "option2"],
          item4: "该走哪条路"
        },
        {
          id: 2,
          item1: "到二仙桥",
          item2: "option2",
          item3: ["option1", "option2", "option3", "option4"],
          item4: "这车能拉吗"
        }
      ]
    };
  }
};
</script>
<style scoped></style>
