<template>
  <div class="sidebar" :style="isCollapse ? 'width:65px' : 'width:210px'">
    <el-menu
      :uniqueOpened="true"
      :default-active="active"
      class="el-menu-vertical-demo"
      background-color="#2c3e50"
      text-color="#fff"
      active-text-color="#77ade9"
      :collapse="isCollapse"
      :router="true"
    >
      <el-menu-item class="act">
        <div>
          {{ isCollapse ? "Nebula" : "自诚星云系统——Nebula" }}
        </div>
      </el-menu-item>
      <el-menu-item index="/i/admin">
        <i class="el-icon-s-custom"></i>
        <template #title>管理员管理</template></el-menu-item
      >
      <el-menu-item index="/i/institutions">
        <i class="el-icon-s-shop"></i>
        <template #title>机构管理</template></el-menu-item
      >
      <el-menu-item index="/i/monitoring" v-if="isAdmin">
        <i class="el-icon-video-camera-solid"></i>
        <template #title>监控</template>
      </el-menu-item>
      <el-menu-item index="/i/log" v-if="isAdmin">
        <i class="el-icon-tickets"></i>
        <template #title>操作日志</template>
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
    const isAdmin = computed(() => {
      return store.state.isAdmin;
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
      isAdmin,
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
.act {
  padding-left: 10px !important;
  text-align: center;
  background-color: #314e75 !important;
}
.el-menu-item {
  &.is-active {
    font-weight: 600;
    // text-shadow: 2px 2px 2px rgba(255, 255, 255, 0.8);
  }
  &.act {
    &:hover {
      background-color: rgba(49, 78, 117, 0.8) !important;
    }
  }
}
.logo-text {
  text-align: center;
  line-height: 30px;
  color: #fff;
  width: calc(100% - 1px);
  background-color: rgba(35, 50, 64, 1);
  transition: 0.8s;
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
