<template>
  <div class="process">
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 100%"
      height="calc(100vh - 170px)"
    >
      <el-table-column
        prop="name"
        label="进程号"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="进程名"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="CPU占用"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="内存占用"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="进程状态"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column prop="name" label="功耗详情" align="center">
        <template #default="scope">
          <span
            class="oper edit"
            style="margin-right: 0"
            @click="detail(scope.row)"
            >查看</span
          >
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
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const data = reactive({
      tableData: [{ name: "数据", id: 1 }],
    });
    const detail = (row) => {
      //   console.log(getCurrentInstance().parent.props); //父组件的一些数据
      console.log(row);
      router.push(`/power/:${row.id}`);
    };
    // onActivated(() => {
    //   console.log(getCurrentInstance().parent.props.label, "上下文");
    //   if (!route.query.type) {
    //     console.log("加载数据...");
    //     alert(2);
    //   }
    // });
    return {
      ...toRefs(data),
      detail,
    };
  },
};
</script>
