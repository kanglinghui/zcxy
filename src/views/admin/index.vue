<template>
  <div class="admin">
    <el-card>
      <div class="flex-spea">
        <div>
          <el-select
            v-model="value"
            clearable
            placeholder="请选择"
            style="margin-right: 10px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-button
            icon="el-icon-check"
            type="primary"
            @click="sub"
            :loading="loading"
            >提交</el-button
          >
        </div>
        <div style="margin-bottom: 15px">
          <el-button icon="el-icon-plus" type="primary" @click="add"
            >添加管理员</el-button
          >
          <el-button icon="el-icon-question" type="primary"
            >管理员权限说明</el-button
          >
        </div>
      </div>
      <el-table
        :data="tableData"
        v-loading="loading"
        stripe
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
        height="calc(100vh - 200px)"
      >
        <el-table-column type="selection" width="50" align="center">
        </el-table-column>
        <el-table-column type="index" label="ID" width="150" align="center">
        </el-table-column>

        <el-table-column
          prop="name"
          label="管理员名称"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作" width="185" align="center">
          <template v-slot:default="scope">
            <div v-if="scope.row.disabled">
              <span @click="edit(scope.$index)" class="edit oper">修改</span>
              <span class="delete oper" @click="del(scope.row, scope.$index)"
                >删除</span
              >
              <span class="freeze oper" @click="del(scope.row, scope.$index)"
                >冻结</span
              >
              <span class="start oper" @click="del(scope.row, scope.$index)"
                >启用</span
              >
            </div>
            <div v-else>
              <span class="sub" @click="sub(scope.row, scope.$index)"
                >完成</span
              >
              <span class="cancel" @click="cancel(scope.$index)">取消</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 15px">
        <el-pagination
          background
          layout="prev, pager, next"
          :hide-on-single-page="false"
          :total="tableData.length"
        >
        </el-pagination>
      </div>
    </el-card>
    <AddUI v-model:dialog="addShow" :title="title" :permissions="permissions" />
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
import { ElMessageBox } from "element-plus";
import { $msg } from "@/utils/message.js";
import AddUI from "./components/Add.vue";
export default {
  name: "Admin",
  components: {
    AddUI,
  },
  setup() {
    const data = reactive({
      addShow: false,
      tableData: [
        { name: "admin", password: "123456", permissions: true },
        { name: "admin1", password: "123456", permissions: true },
        { name: "admin2", password: "123456", permissions: true },
        { name: "admin3", password: "123456", permissions: false },
        { name: "admin4", password: "123456", permissions: true },
        { name: "admin5", password: "123456", permissions: true },
        { name: "admin6", password: "123456", permissions: false },
        { name: "admin7", password: "123456", permissions: true },
        { name: "admin8", password: "123456", permissions: false },
        { name: "admin9", password: "123456", permissions: true },
      ],
      rowPermissions: undefined,
      loading: false,
      options: [
        { label: "删除", value: 1 },
        { label: "冻结", value: 2 },
      ],
      value: "",
      title: "",
      permissions: false,
    });
    data.tableData.forEach((item) => {
      item.disabled = true;
    });
    const handleSelectionChange = (row) => {
      console.log(row);
    };
    const add = () => {
      data.addShow = true;
      data.title = "添加管理员";
      data.permissions = true;
    };
    const edit = (index) => {
      console.log(index);
      //   data.tableData[index].disabled = false;
      //   data.rowPermissions = data.tableData[index].permissions;
      data.addShow = true;
      data.title = "修改";
      data.permissions = false;
    };
    const del = (row, index) => {
      ElMessageBox.confirm(`此操作将移除《${row.name}》, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          data.tableData.splice(index, 1);
          $msg({
            type: "success",
            msg: "移除成功!",
          });
        })
        .catch(() => {});
    };
    const sub = () => {
      data.loading = true;
      setTimeout(() => {
        $msg({
          type: "success",
          msg: "提交成功",
        });
        data.loading = false;
      }, 2000);
      //   console.log(row, index);
      //   data.tableData[index].disabled = true;
    };
    const cancel = (index) => {
      data.tableData[index].disabled = true;
      data.tableData[index].permissions = data.rowPermissions;
    };
    return {
      ...toRefs(data),
      edit, //表格修改
      del, //表格移除
      sub, //表格完成
      cancel, //表格取消
      add, //新建
      handleSelectionChange, //表格选中
    };
  },
};
</script>

<style lang="scss" scoped>
:deep(th) {
  color: #303133;
  background-color: rgb(226, 226, 227);
}
.flex-spea {
  display: flex;
  justify-content: space-between;
}
// :deep(td) {
//     padding:0;
// }
</style>
