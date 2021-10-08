<template>
  <el-dialog
    :title="title"
    v-model="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="500px"
  >
    <div class="add">
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        label-width="140px"
        class="demo-ruleForm"
        :status-icon="true"
        :disabled="!isAdmin"
      >
        <el-form-item label="管理员名称" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入管理员名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="修改密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item
          label="是否为超级管理员"
          prop="permissions"
          v-if="permissions"
        >
          <!-- <el-checkbox v-model="form.permissions"></el-checkbox> -->
          <el-select
            v-model="form.permissions"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option label="是" :value="1"> </el-option>
            <el-option label="否" :value="0"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            v-model="form.beizhu"
            placeholder="请输入备注信息"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item :disabled="false">
          <div class="flex-sb">
            <div></div>
            <div>
              <el-button @click="cancel">{{
                isAdmin ? "取 消" : "关 闭"
              }}</el-button>
              <el-button type="primary" @click="submit" v-if="isAdmin"
                >提 交</el-button
              >
            </div>
          </div>
        </el-form-item> -->
      </el-form>
      <div class="flex-sb">
        <div></div>
        <div>
          <el-button @click="cancel">{{
            isAdmin ? "取 消" : "关 闭"
          }}</el-button>
          <el-button type="primary" @click="submit" v-if="isAdmin"
            >提 交</el-button
          >
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { reactive, toRefs, ref, computed } from "vue";
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "修改",
    },
    permissions: {
      type: Boolean,
      default: false,
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
    const data = reactive({
      form: {
        name: "",
        password: "",
        permissions: 0,
        beizhu: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 6,
            message: "密码长度不小于6个字符",
            trigger: "blur",
          },
        ],
        permissions: [
          {
            required: true,
            message: "请选择是否为超级管理员",
            trigger: "change",
          },
        ],
      },
    });
    const submit = () => {
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
    return {
      ...toRefs(data),
      ruleForm,
      submit,
      dialogVisible,
      cancel,
    };
  },
};
</script>
<style lang="scss" scoped></style>
