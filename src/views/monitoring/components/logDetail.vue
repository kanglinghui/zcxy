<template>
  <div class="logDetail">
    <DetailHeader @back="back">
      <h3>当前策略: {{ "策略xx" }}</h3>
    </DetailHeader>
    <div class="table-box">
      <el-table
        :data="tableData"
        stripe
        class="log-table"
        style="width: 100%"
        height="calc(100vh - 117px)"
      >
        <el-table-column prop="ip" label="IP" width="80" align="left">
        </el-table-column>
        <el-table-column prop="date" label="时间" width="200" align="left">
        </el-table-column>
        <!-- <el-table-column prop="type" label="操作类型" width="100" align="left">
        </el-table-column> -->
        <el-table-column
          prop="detail"
          label="详情"
          show-overflow-tooltip
          align="left"
        >
        </el-table-column>
        <!-- <el-table-column prop="date" label="操作时间" width="140" align="right">
        </el-table-column> -->
      </el-table>
    </div>
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
import { useRouter, useRoute } from "vue-router";
import DetailHeader from "@/components/detailHead";

export default {
  name: "LogDetail",
  components: {
    DetailHeader,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    console.log(route);
    const data = reactive({
      tableData: [
        {
          ip: "127.0.0.1",
          date: "[23/Sep/2021:10:20:02 + 0800]",
          detail: "GET /public/uploadxxxxxxxxxx",
        },
        {
          ip: "127.0.0.1",
          date: "[23/Sep/2021:10:20:02 + 0800]",
          detail: "GET /public/uploadxxxxxxxxxx",
        },
        {
          ip: "127.0.0.1",
          date: "[23/Sep/2021:10:20:02 + 0800]",
          detail: "GET /public/uploadxxxxxxxxxx",
        },
        {
          ip: "127.0.0.1",
          date: "[23/Sep/2021:10:20:02 + 0800]",
          detail: "GET /public/uploadxxxxxxxxxx",
        },
        {
          ip: "127.0.0.1",
          date: "[23/Sep/2021:10:20:02 + 0800]",
          detail: "GET /public/uploadxxxxxxxxxx",
        },
        {
          ip: "127.0.0.1",
          date: "[23/Sep/2021:10:20:02 + 0800]",
          detail: "GET /public/uploadxxxxxxxxxx",
        },
        {
          ip: "127.0.0.1",
          date: "[23/Sep/2021:10:20:02 + 0800]",
          detail: "GET /public/uploadxxxxxxxxxx",
        },
        {
          ip: "127.0.0.1",
          date: "[23/Sep/2021:10:20:02 + 0800]",
          detail: "GET /public/uploadxxxxxxxxxx",
        },
        {
          ip: "127.0.0.1",
          date: "[23/Sep/2021:10:20:02 + 0800]",
          detail: "GET /public/uploadxxxxxxxxxx",
        },
      ],
    });
    const back = () => {
      router.push("/i/monitoring?type=status");
    };
    return {
      ...toRefs(data),
      back,
    };
  },
};
</script>
<style lang="scss" scoped>
.logDetail {
  .table-box {
    padding: 0 20px;
  }
}
</style>
