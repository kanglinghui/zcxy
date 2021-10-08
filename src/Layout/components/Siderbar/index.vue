<template>
  <div class="sidebar" :style="isCollapse ? 'width:65px' : 'width:210px'">
    <el-menu
      :uniqueOpened="true"
      :default-active="active"
      class="el-menu-vertical-demo"
      background-color="#2c3e50"
      text-color="#fff"
      active-text-color="#409eff"
      :collapse="isCollapse"
      :router="true"
    >
      <el-menu-item index="/admin">
        <i class="el-icon-s-tools"></i>
        <template #title>管理员管理</template>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-s-custom"></i>
        <template #title>客户管理</template>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-user"></i>
        <template #title>用户管理</template>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-coin"></i>
        <template #title>账户管理</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import { reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const data = reactive({
      //   isCollapse: true,
    });
    const isCollapse = computed(() => {
      return !store.state.menuScal;
    });
    const active = computed(() => {
      return route.path;
    });
    return {
      ...toRefs(data),
      isCollapse,
      active,
    };
  },
};
</script>
<style lang="scss" scoped>
.sidebar {
  width: 210px;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  height: 100vh;
  z-index: 1;
}
</style>
<style lang="scss">
.el-menu-vertical-demo {
  height: 100vh;
}
.el-menu-item {
  &.is-active {
    background-color: rgba(35, 50, 64, 1) !important;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    &:hover {
      background-color: rgba(35, 50, 64, 1) !important;
    }
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.05) !important;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>
