<template>
  <div class="status">
    <div class="flex-sb">
      <div></div>
      <div class="search">
        <el-input placeholder="请输入内容进行检索" v-model="input" clearable>
        </el-input>
      </div>
    </div>
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 100%"
      height="calc(100vh - 208px)"
    >
      <el-table-column
        prop="name"
        label="账户"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="母单号"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="策略名称"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column prop="date" label="启动时间" width="80" align="center">
      </el-table-column>
      <el-table-column prop="date" label="启动时间" width="80" align="center">
      </el-table-column>
      <el-table-column prop="name" label="策略状态" width="80" align="center">
      </el-table-column>
      <el-table-column prop="name" label="下单频率" width="70" align="center">
        <template #default="scope">
          <span
            class="oper edit"
            style="margin-right: 0"
            @click="detail(scope.row)"
            >详情</span
          >
        </template>
      </el-table-column>
      <el-table-column prop="name" label="策略日志" width="95" align="center">
        <template #default="scope">
          <span class="oper edit" @click="detail(scope.row)">详情</span>
          <span class="oper freeze">导出</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作" width="70" align="center">
        <template #default="scope">
          <span class="oper delete" @click="detail(scope.row)">停止</span>
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
  </div>
</template>
<script>
import { reactive, toRefs, onActivated } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const data = reactive({
      tableData: [{ date: "09:00", name: "数据" }],
      input: "",
    });
    const detail = (row) => {
      console.log(row);
    };
    onActivated(() => {
      if (!route.query.type) {
        console.log("加载数据...");
      }
    });
    return {
      ...toRefs(data),
      detail,
    };
  },
};
</script>
<style lang="scss" scoped>
.search {
  margin-bottom: 10px;
}
</style>
