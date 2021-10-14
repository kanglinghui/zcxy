<template>
  <div id="linePoin" style="width: 100%; height: 500px"></div>
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
export default {
  name: "LinePoin",
  setup() {
    const router = useRouter();
    let echarts = inject("ec"); //引入
    const options1 = {
      legend: {
        data: ["子单(新建)", "最新价", "市场VWAP", "成交进度"],
        left: 0,
      },
      color: [
        "rgb(23,31,205)",
        "rgb(247,147,84)",
        "rgb(214,192,78)",
        "rgb(204,231,90)",
      ],
      grid: {
        left: 0,
        right: 0,
      },
      //   title: { text: "demo" },
      tooltip: {
        trigger: "axis",
      },
      toolbox: {
        show: false,
      },
      //   dataZoom: [
      //     {
      //       type: "slider", //显示拖拽功能
      //     },
      //   ],
      xAxis: {
        type: "category",
        nameLocation: "middle",
        axisPointer: {
          type: "shadow",
        },
        data: [
          "12-03",
          "12-04",
          "12-05",
          "12-06",
          "12-07",
          "12-08",
          "12-09",
          "12-10",
          "12-11",
          "12-12",
          "12-13",
          "12-14",
        ],
      },
      yAxis: {},
      series: [
        {
          name: "子单(新建)",
          type: "scatter",
          data: [19, 33, 76, 29, 37, 7, 19, 33, 76, 29, 37, 7],
        },
        {
          name: "最新价",
          type: "line",
          smooth: true, // 平滑曲线
          data: [5, 20, 36, 10, 13, 20, 5, 20, 36, 10, 13, 20],
          showSymbol: false, //  不让显示点
        },
        {
          name: "市场VWAP",
          type: "line",
          smooth: true,
          data: [7, 10, 26, 30, 5, 11, 7, 10, 26, 30, 5, 11],
          showSymbol: false,
        },
        {
          name: "成交进度",
          type: "line",
          smooth: true,
          data: [9, 15, 19, 50, 17, 6, 9, 15, 19, 50, 17, 6],
          showSymbol: false,
        },
      ],
    };
    const data = reactive({
      loading: false,
    });
    let myChart;
    onMounted(() => {
      nextTick(() => {
        //需要获取到element,所以是onMounted的Hook
        myChart = echarts.init(document.getElementById("linePoin"));
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
    };
  },
};
</script>
<style lang="scss" scoped></style>
