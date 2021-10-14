<template>
  <div class="analyse">
    <DetailHeader @back="back">
      <h3>当前策略: {{ "策略xx" }}</h3>
    </DetailHeader>
    <div class="box">
      <div style="margin-bottom: 15px">
        <el-date-picker
          v-model="date"
          type="datetimerange"
          range-separator="到"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        >
        </el-date-picker>
      </div>
      <!-- <div class="chart"> -->
      <linePointChart />
      <lineBar id="lineBar" height="300px" name="成交量比重(%)" />
      <barChart id="bar1" height="300px" name="VWAP 滑点" />
      <barChart id="bar2" height="300px" name="到达价格滑点" />
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { ElDatePicker } from "element-plus";
import DetailHeader from "@/components/detailHead";
import linePointChart from "@/components/chart/analyse/linePoint.vue";
import lineBar from "@/components/chart/analyse/lineBar.vue";
import barChart from "@/components/chart/analyse/Bar.vue";

export default {
  name: "Analyse",
  components: {
    [ElDatePicker.name]: ElDatePicker,
    DetailHeader,
    linePointChart,
    lineBar,
    barChart,
  },
  setup() {
    const router = useRouter();
    const data = reactive({
      date: "",
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
.analyse {
  width: 100%;
  height: 100vh;
  .box {
    padding: 0 20px;
    height: calc(100vh - 47px);
    overflow-y: auto;
  }
}
</style>
