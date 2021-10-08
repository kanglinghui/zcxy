<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="fade-transform-s">
        <keep-alive exclude="Login">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>
<script>
import * as echarts from "echarts";
import { provide } from "vue";

export default {
  name: "App",
  setup() {
    provide("ec", echarts); //provide
  },
};
</script>
<style lang="scss">
#nprogress .bar {
  background-color: rgba(45, 63, 80, 0.8) !important;
}
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
/*外层轨道。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果*/
::-webkit-scrollbar-track {
  width: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
/*滚动条的设置*/
::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  background-clip: padding-box;
  min-height: 28px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
/*滚动条移上去的背景*/
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
