<template>
  <div>
    <HeadUI />
    <SidebarUI v-if="isMenu" />
    <el-scrollbar>
      <div
        class="app-main"
        :style="
          isCollapse
            ? 'width:calc(100vw - 210px);margin-left:210px;'
            : 'width:calc(100vw - 65px);margin-left:65px;'
        "
      >
        <router-view v-slot="{ Component }">
          <transition name="fade-transform-top" mode="out-in">
            <keep-alive :include="['Institutions', 'Monitoring']">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import SidebarUI from "./components/Siderbar.vue";
import HeadUI from "./components/Head.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  components: {
    SidebarUI,
    HeadUI,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const isCollapse = computed(() => {
      return store.state.menuScal;
    });
    const isMenu = computed(() => {
      return route.path !== "/institutionsEdit";
    });
    return {
      isCollapse,
      isMenu,
    };
  },
};
</script>
<style lang="scss" scoped>
.app-main {
  margin-top: 36px;
  padding: 15px;
  background-color: #fafafa;
  height: calc(100vh - 36px);
  box-sizing: border-box;
  transition: 0.6s;
}
</style>
