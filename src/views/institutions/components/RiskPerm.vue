<template>
  <el-dialog
    :title="title"
    v-model="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="close"
    width="800px"
  >
    <el-form
      :model="form"
      :rules="rules"
      :disabled="!status"
      ref="ruleForm"
      label-width="140px"
      class="demo-ruleForm"
      :status-icon="true"
    >
      <div class="flex-sp">
        <el-form-item label="自成交" prop="zjc">
          <el-select v-model="form.zcj" placeholder="请选择">
            <el-option label="是" :value="1"> </el-option>
            <el-option label="否" :value="0"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="撤单率" prop="cd">
          <el-select v-model="form.cd" placeholder="请选择">
            <el-option label="是" :value="1"> </el-option>
            <el-option label="否" :value="0"> </el-option>
            <el-option label="0.1" :value="0.1"> </el-option>
            <el-option label="0.2" :value="0.2"> </el-option>
            <el-option label="0.3" :value="0.3"> </el-option>
            <el-option label="0.4" :value="0.4"> </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="flex-sp">
        <el-form-item label="报单流速" prop="cd">
          <el-select v-model="form.cd" placeholder="请选择">
            <el-option label="是" :value="1"> </el-option>
            <el-option label="否" :value="0"> </el-option>
            <el-option label="0.1" :value="0.1"> </el-option>
            <el-option label="0.2" :value="0.2"> </el-option>
            <el-option label="0.3" :value="0.3"> </el-option>
            <el-option label="0.4" :value="0.4"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间量总委托笔数">
          <el-select v-model="form.bd1" placeholder="请选择">
            <el-option label="是" :value="1"> </el-option>
            <el-option label="否" :value="0"> </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="flex-sp">
        <el-form-item label="总委托笔数" prop="zjc">
          <el-select v-model="form.zcj1" placeholder="请选择">
            <el-option label="是" :value="1"> </el-option>
            <el-option label="否" :value="0"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="撤单比(%)" prop="cd">
          <el-select v-model="form.cd2" placeholder="请选择">
            <el-option label="是" :value="1"> </el-option>
            <el-option label="否" :value="0"> </el-option>
            <!-- <el-option label="0.1" :value="0.1"> </el-option>
          <el-option label="0.2" :value="0.2"> </el-option>
          <el-option label="0.3" :value="0.3"> </el-option>
          <el-option label="0.4" :value="0.4"> </el-option> -->
          </el-select>
        </el-form-item>
      </div>
      <div class="flex-sp">
        <el-form-item label="废单比(%)" prop="bd">
          <el-select v-model="form.bd3" placeholder="请选择">
            <el-option label="是" :value="1"> </el-option>
            <el-option label="否" :value="0"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="委托成交比(%)" prop="bd">
          <el-select v-model="form.bd4" placeholder="请选择">
            <el-option label="是" :value="1"> </el-option>
            <el-option label="否" :value="0"> </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="flex-sp">
        <el-form-item label="净买入额度(元)" prop="bd">
          <el-select v-model="form.bd5" placeholder="请选择">
            <el-option label="是" :value="1"> </el-option>
            <el-option label="否" :value="0"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账户撤单频率" prop="bd">
          <el-select v-model="form.bd6" placeholder="请选择">
            <el-option label="是" :value="1"> </el-option>
            <el-option label="否" :value="0"> </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="flex-sp">
        <el-form-item label="单笔撤间隔(秒)" prop="bd">
          <el-select v-model="form.bd7" placeholder="请选择">
            <el-option label="是" :value="1"> </el-option>
            <el-option label="否" :value="0"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下单频率笔数" prop="bd">
          <el-select v-model="form.bd8" placeholder="请选择">
            <el-option label="是" :value="1"> </el-option>
            <el-option label="否" :value="0"> </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="flex-sp">
        <el-form-item label="通道检查" prop="bd">
          <el-select v-model="form.bd9" placeholder="请选择">
            <el-option label="是" :value="1"> </el-option>
            <el-option label="否" :value="0"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资金检查" prop="bd">
          <el-select v-model="form.bd10" placeholder="请选择">
            <el-option label="是" :value="1"> </el-option>
            <el-option label="否" :value="0"> </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="flex-sp">
        <el-form-item label="停板价格检查" prop="bd">
          <el-select v-model="form.bd11" placeholder="请选择">
            <el-option label="是" :value="1"> </el-option>
            <el-option label="否" :value="0"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单账户自成交检查" prop="bd" style="opacity: 0">
          <el-select v-model="form.bd" placeholder="请选择">
            <el-option label="是" :value="1"> </el-option>
            <el-option label="否" :value="0"> </el-option>
          </el-select>
        </el-form-item>
      </div>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">{{ status ? "取 消" : "关 闭" }}</el-button>
        <el-button type="primary" v-if="status" @click="save">保 存</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { reactive, toRefs, computed, ref } from "vue";
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
    const ruleForm = ref(null);
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
      form: {
        zcj: 1,
        bd: 0,
        cd: 0,
        cd1: 0,
        zcj1: 0,
        bd1: 0,
        bd2: 0,
        bd3: 0,
        bd4: 0,
        bd5: 0,
        bd6: 0,
        bd7: 0,
        bd8: 0,
        bd9: 0,
        bd10: 0,
        bd11: 0,
        cd2: 0,
      },
      rules: {
        bd: [],
        cd: [],
        zcj: [],
      },
    });
    const cancel = () => {
      emit("update:dialog", false);
    };
    const save = () => {
      emit("update:dialog", false);
    };
    const close = () => {
      ruleForm.value.resetFields();
    };
    return {
      ...toRefs(data),
      dialogVisible,
      cancel,
      save,
      ruleForm,
      close,
      status,
    };
  },
};
</script>
<style lang="scss" scoped>
.flex-sp {
  display: flex;
  justify-content: space-evenly;
}
</style>
