<template>
  <div class="monitoring">
    <el-tabs type="border-card" v-model="activeLabel">
      <el-tab-pane
        v-for="(item, i) in tabsList"
        :key="i"
        :name="item.label"
        :label="item.label"
        :lazy="item.async"
      >
        <component :is="item.name" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import StatusUI from "./components/Status.vue";
import ProcessUI from "./components/Process.vue";
import { onActivated, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
export default {
  name: "Monitoring",
  components: {
    StatusUI,
    ProcessUI,
  },
  setup() {
    const route = useRoute();
    const data = reactive({
      activeLabel: "策略状态",
      tabsList: [
        {
          label: "策略状态",
          name: "StatusUI",
          async: true,
        },
        {
          label: "进程监控",
          name: "ProcessUI",
          async: true,
        },
      ],
    });
    onActivated(() => {
      if (route.query.type === "process") {
        data.activeLabel = "进程监控";
      } else {
        data.activeLabel = "策略状态";
      }
    });
    return {
      ...toRefs(data),
    };
  },
};
</script>
