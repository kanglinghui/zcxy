<template>
  <div class="about">
    <DetailHeader @back="back">
      <h3>进程名：xx进程</h3>
    </DetailHeader>
    <div style="padding: 0 20px">
      <el-button type="primary" :loading="loading" @click="btn">{{
        status ? "切换为柱状图" : "切换为折线图"
      }}</el-button>
      <div id="about" style="width: 100%; height: 500px"></div>
    </div>
  </div>
</template>
<script>
import {
  inject,
  onMounted,
  nextTick,
  reactive,
  toRefs,
  onBeforeUnmount,
} from "vue";
import { useRouter } from "vue-router";
import DetailHeader from "@/components/detailHead";
export default {
  name: "About",
  components: {
    DetailHeader,
  },
  setup() {
    const router = useRouter();
    let echarts = inject("ec"); //引入
    const options1 = {
      legend: {
        data: ["散点", "数据1", "数据2", "数据3"],
        left: 50,
      },
      title: { text: "demo" },
      tooltip: {
        trigger: "axis",
      },
      toolbox: {
        show: false,
      },
      dataZoom: [
        {
          type: "slider", //显示拖拽功能
        },
      ],
      xAxis: {
        type: "category",
        nameLocation: "middle",
        axisPointer: {
          type: "shadow",
        },
        data: ["12-3", "12-4", "12-5", "12-6", "12-7", "12-8"],
      },
      yAxis: {},
      series: [
        {
          name: "散点",
          type: "scatter",
          data: [19, 33, 76, 29, 37, 7],
        },
        {
          name: "数据1",
          type: "line",
          smooth: true, // 平滑曲线
          data: [5, 20, 36, 10, 13, 20],
          showSymbol: false, //  不让显示点
        },
        {
          name: "数据2",
          type: "line",
          smooth: true,
          data: [7, 10, 26, 30, 5, 11],
          showSymbol: false,
        },
        {
          name: "数据3",
          type: "line",
          smooth: true,
          data: [9, 15, 19, 50, 17, 6],
          showSymbol: false,
        },
      ],
    };
    // 柱状图
    const options2 = {
      color: ["rgb(224,101,36)"],
      legend: {
        data: ["bar"],
        left: "10%",
      },
      brush: {
        toolbox: ["rect", "polygon", "lineX", "lineY", "keep", "clear"],
        xAxisIndex: 0,
      },
      toolbox: {
        show: false,
      },
      tooltip: {},
      xAxis: {
        data: [
          "name1",
          "name2",
          "name3",
          "name4",
          "name5",
          "name6",
          "name7",
          "name8",
          "name9",
          "name10",
        ],
        name: "X Axis",
        axisLine: { onZero: true },
        splitLine: { show: false },
        splitArea: { show: false },
      },
      yAxis: {},
      grid: {
        bottom: 100,
      },
      series: [
        {
          name: "bar",
          type: "bar",
          stack: "one",
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(0,0,0,0.3)",
            },
          },
          data: [1, -2, 3, 1.5, -0.8, 2, 4, 1.6, -3.1, 1.8],
        },
      ],
    };
    const data = reactive({
      status: true,
      loading: false,
    });
    let myChart;
    const btn = () => {
      data.loading = true;
      myChart.setOption({ series: [] }, true); //清空数据
      if (data.status) {
        data.status = false;
      } else {
        data.status = true;
      }
      myChart.setOption(data.status ? options1 : options2);
      data.loading = false;
    };
    onMounted(() => {
      nextTick(() => {
        //需要获取到element,所以是onMounted的Hook
        myChart = echarts.init(document.getElementById("about"));
        // 绘制图表
        // 折线散点图
        myChart.setOption(options1);
      });
      window.onresize = function () {
        //自适应大小
        myChart.resize();
      };
    });
    onBeforeUnmount(() => {
      myChart = null;
      window.onresize = null;
    });
    const back = () => {
      router.push("/i/monitoring?type=back");
    };
    return {
      ...toRefs(data),
      back,
      btn,
    };
  },
};
</script>
<style lang="scss" scoped>
.about {
  width: 100vw;
}
</style>
