<template>
  <el-dialog
    :title="title"
    v-model="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="600px"
  >
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      height="calc(100vh - 350px)"
    >
      <el-table-column label="普通交易" align="center">
        <template #default="scope">
          <el-checkbox v-model="scope.row.jy"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="行情" align="center">
        <template #default="scope">
          <el-checkbox v-model="scope.row.hq"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="smart算法" align="center">
        <template #default="scope">
          <el-checkbox v-model="scope.row.smart"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="pov算法" align="center">
        <template #default="scope">
          <el-checkbox v-model="scope.row.pov"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="T0" align="center">
        <template #default="scope">
          <el-checkbox v-model="scope.row.t0"></el-checkbox>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">{{ status ? "取 消" : "关 闭" }}</el-button>
        <el-button type="primary" v-if="status" @click="save">保 存</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { reactive, toRefs, computed } from "vue";
export default {
  props: {
    title: {
      type: String,
      default: "登录权限编辑",
    },
    dialog: {
      type: Boolean,
      default: false,
    },
    showType: {
      type: String,
      default: "toView",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const dialogVisible = computed({
      get() {
        return props.dialog;
      },
      set(val) {
        emit("update:dialog", val);
      },
    });
    const status = computed(() => {
      let state;
      if (props.isAdmin && props.showType === "toView") {
        state = false;
      } else if (props.isAdmin && props.showType !== "toView") {
        state = true;
      } else if (!props.isAdmin) {
        state = false;
      }
      return state;
    });
    const data = reactive({
      tableData: [
        { jy: false, hq: false, smart: false, pov: false, t0: false },
      ],
    });
    const cancel = () => {
      emit("update:dialog", false);
    };
    const save = () => {
      emit("update:dialog", false);
    };
    return {
      ...toRefs(data),
      dialogVisible,
      cancel,
      save,
      status,
    };
  },
};
</script>
