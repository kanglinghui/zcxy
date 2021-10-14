<template>
  <div :id="id" :style="{ width: width, height: height }"></div>
</template>
<script>
import { onMounted, nextTick, onBeforeUnmount, inject } from "vue";
export default {
  props: {
    id: {
      type: String,
      default: "bar",
    },
    height: {
      type: String,
      default: "500px",
    },
    name: {
      type: String,
      default: "bar",
    },
    width: {
      type: String,
      default: "100%",
    },
  },
  setup(props) {
    let echarts = inject("ec");
    let myChart;
    const options = {
      color: ["rgb(224,101,36)"],
      legend: {
        data: [props.name],
        left: 0,
      },
      brush: {
        toolbox: ["rect", "polygon", "lineX", "lineY", "keep", "clear"],
        xAxisIndex: 0,
      },
      toolbox: {
        show: false,
      },
      tooltip: {},
      //   dataZoom: [
      //     {
      //       type: "slider", //显示拖拽功能
      //     },
      //   ],
      xAxis: {
        data: [
          "数据1",
          "数据2",
          "数据3",
          "数据4",
          "数据5",
          "数据6",
          "数据7",
          "数据8",
          "数据9",
          "数据10",
          "数据11",
          "数据12",
          "数据13",
          "数据14",
          "数据15",
          "数据16",
          "数据17",
          "数据18",
          "数据19",
          "数据20",
          "数据21",
          "数据22",
          "数据23",
          "数据24",
          "数据25",
          "数据26",
          "数据27",
          "数据28",
          "数据29",
          "数据30",
        ],
        name: "",
        axisLine: { onZero: true },
        splitLine: { show: false },
        splitArea: { show: false },
      },
      yAxis: {
        splitLine: {
          lineStyle: {
            // 使用深浅的间隔色
            type: "dashed",
          },
        },
      },
      grid: {
        left: 0,
        right: 0,
        bottom: 100,
      },
      series: [
        {
          name: props.name,
          type: "bar",
          stack: "one",
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(0,0,0,0.3)",
            },
          },
          barWidth: "5",
          data: [
            1, -2, 3, 1.5, -0.8, 2, 4, 1.6, -3.1, 1.8, 1, -2, 3, 1.5, -0.8, 2,
            4, 1.6, -3.1, 1.8, 1, -2, 3, 1.5, -0.8, 2, 4, 1.6, -3.1, 1.8,
          ],
        },
      ],
    };
    onMounted(() => {
      nextTick(() => {
        //需要获取到element,所以是onMounted的Hook
        myChart = echarts.init(document.getElementById(props.id));
        // 绘制图表
        // 折线散点图
        myChart.setOption(options);
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
    return {};
  },
};
</script>
<style lang="scss" scoped></style>
