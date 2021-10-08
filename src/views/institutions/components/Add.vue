<template>
  <el-dialog
    title="添加机构"
    v-model="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="500px"
    @close="close"
  >
    <div class="add">
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        label-width="140px"
        class="demo-ruleForm"
        :status-icon="true"
      >
        <el-form-item label="ID" prop="id">
          <el-input v-model="form.id" v-if="form.id" disabled>
            <!-- <template #append>
              <el-button @click="generate">重新生成</el-button>
            </template> -->
          </el-input>
          <el-button type="primary" style="width: 100%" v-else @click="generate"
            >生成</el-button
          >
        </el-form-item>
        <el-form-item label="机构名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入机构名称"></el-input>
        </el-form-item>
        <el-form-item label="备注信息" prop="beizhu">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            v-model="form.beizhu"
            placeholder="请输入备注信息"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="flex-sb">
            <div></div>
            <div>
              <el-button @click="cancel">取 消</el-button>
              <el-button type="primary" @click="submit">提 交</el-button>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
import { reactive, toRefs, ref, computed } from "vue";
import { ElMessage } from "element-plus";
export default {
  props: {
    dialog: {
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
    const data = reactive({
      form: {
        id: "",
        name: "",
        beizhu: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入机构名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        id: [],
        beizhu: [],
      },
    });
    const generate = () => {
      data.form.id = Date.parse(new Date());
    };
    const submit = () => {
      if (!data.form.id) {
        ElMessage.error("请先生成ID!");
        return;
      }
      ruleForm.value.validate((valid) => {
        if (valid) {
          ruleForm.value.resetFields();
          emit("update:dialog", false);
        } else {
          return false;
        }
      });
    };
    const cancel = () => {
      emit("update:dialog", false);
    };
    const close = () => {
      console.log(ruleForm);
      ruleForm.value.resetFields();
    };

    return {
      ...toRefs(data),
      dialogVisible,
      ruleForm,
      submit,
      cancel,
      generate,
      close,
    };
  },
};
</script>
