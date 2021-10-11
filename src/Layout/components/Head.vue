<template>
  <div
    class="head"
    :style="show ? 'width:calc(100vw - 210px);' : 'width:calc(100vw - 65px);'"
  >
    <div class="head-tool">
      <i :class="icon" @click="sidebarShow(icon)"></i>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>自诚星云系统</el-breadcrumb-item>
        <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="user">
      <el-dropdown>
        <span class="el-dropdown-link">
          <b class="username"><i class="el-icon-user-solid"></i> {{ name }}</b
          ><i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <!-- <el-dropdown-item @click="checkpass"
              ><span
                ><i class="el-icon-key"></i>修改密码</span
              ></el-dropdown-item
            > -->
            <el-dropdown-item @click="logout"
              ><span
                ><i class="el-icon-setting"></i>退出系统</span
              ></el-dropdown-item
            >
            <!-- <el-dropdown-item divided
              ><span class="default"
                ><i class="el-icon-user-solid"></i>{{ name }}</span
              ></el-dropdown-item
            > -->
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { remoeStorge, removeSession } from "@/utils/auth.js";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const name = computed(() => {
      return store.state.username;
    });
    const data = reactive({
      icon: "el-icon-s-fold",
      show: true,
    });
    const sidebarShow = (icon) => {
      if (icon === "el-icon-s-fold") {
        data.icon = "el-icon-s-unfold";
        data.show = false;
        store.commit("SET_MENU_SCAL", false);
      } else {
        data.icon = "el-icon-s-fold";
        data.show = true;
        store.commit("SET_MENU_SCAL", true);
      }
    };
    const checkpass = () => {
      console.log("checkpass1111");
    };
    const logout = () => {
      remoeStorge("user");
      removeSession("token");
      router.push("/login");
    };
    const title = computed(() => {
      console.log(route);
      return route.meta.title;
    });
    return {
      ...toRefs(data),
      sidebarShow,
      checkpass,
      logout,
      title,
      name,
    };
  },
};
</script>
<style lang="scss" scoped>
.head {
  height: 36px;
  line-height: 36px;
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  z-index: 1;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding-right: 15px;
  box-sizing: border-box;
  background-color: #fff;
  transition: 0.5s;
  .head-tool {
    // width: 40px;
    padding: 0 15px;
    display: flex;
    text-align: center;
    line-height: 36px;
    .el-breadcrumb {
      line-height: 36px;
    }
    i {
      margin-right: 20px;
      line-height: 36px;
      cursor: pointer;
      transition: 0.5s;
      font-size: 16px;
      &:hover {
        color: #314e75;
      }
    }
  }
  .user {
    text-align: right;
    .el-dropdown-link {
      cursor: pointer;
      .username {
        color: #666;
      }
      &:hover {
        b,
        i {
          color: #314e75;
        }
      }
    }
  }
}
.default {
  cursor: default;
  color: #409eff;
}
</style>
