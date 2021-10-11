<template>
  <div class="log">
    <card-box>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        height="calc(100vh - 157px)"
      >
        <el-table-column prop="code" label="编号" width="80" align="left">
        </el-table-column>
        <el-table-column prop="user" label="用户" width="100" align="left">
        </el-table-column>
        <el-table-column prop="type" label="操作类型" width="100" align="left">
        </el-table-column>
        <el-table-column
          prop="detail"
          label="详情"
          show-overflow-tooltip
          align="left"
        >
        </el-table-column>
        <el-table-column prop="date" label="操作时间" width="140" align="right">
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
    </card-box>
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
export default {
  name: "Log",
  setup() {
    const data = reactive({
      tableData: [
        {
          code: "01",
          type: "用户登录",
          user: "f123",
          detail: "登录成功，账号f123，登录IP：127.0.0.1:8080",
          date: "2021-09-22 14:03:25",
        },
        {
          code: "01",
          type: "用户登录",
          user: "f123",
          detail: "登录成功，账号f123，登录IP：127.0.0.1:8080",
          date: "2021-09-22 14:03:25",
        },
        {
          code: "01",
          type: "用户登录",
          user: "f123",
          detail: "登录成功，账号f123，登录IP：127.0.0.1:8080",
          date: "2021-09-22 14:03:25",
        },
        {
          code: "01",
          type: "用户登录",
          user: "f123",
          detail: "登录成功，账号f123，登录IP：127.0.0.1:8080",
          date: "2021-09-22 14:03:25",
        },
        {
          code: "01",
          type: "用户登录",
          user: "f123",
          detail: "登录成功，账号f123，登录IP：127.0.0.1:8080",
          date: "2021-09-22 14:03:25",
        },
        {
          code: "01",
          type: "用户登录",
          user: "f123",
          detail: "登录成功，账号f123，登录IP：127.0.0.1:8080",
          date: "2021-09-22 14:03:25",
        },
        {
          code: "01",
          type: "用户登录",
          user: "f123",
          detail: "登录成功，账号f123，登录IP：127.0.0.1:8080",
          date: "2021-09-22 14:03:25",
        },
      ],
    });
    return {
      ...toRefs(data),
    };
  },
};
</script>
