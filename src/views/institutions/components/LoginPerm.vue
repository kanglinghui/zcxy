<template>
  <el-dialog
    :title="title"
    v-model="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="700px"
  >
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 100%"
      height="calc(100vh - 350px)"
    >
      <el-table-column prop="ip" label="IP" align="center"> </el-table-column>
      <el-table-column prop="mac" label="MAC" align="center"> </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="80"
        v-if="showType === 'toEdit' && isAdmin"
      >
        <template #default="scope">
          <span class="oper delete" @click="del(scope.row)">删除</span>
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
      tableData: [{ ip: "127.0.0.1", mac: "xxxx.xxx" }],
    });
    const cancel = () => {
      emit("update:dialog", false);
    };
    const save = () => {
      emit("update:dialog", false);
    };
    const del = (row) => {
      console.log(row);
    };
    return {
      ...toRefs(data),
      dialogVisible,
      cancel,
      save,
      del,
      status,
    };
  },
};
</script>
