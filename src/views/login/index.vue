<template>
  <div class="login">
    <div class="login-container">
      <vue-particles
        color="#ddd"
        :particleOpacity="0.1"
        :particlesNumber="15"
        shapeType="circle"
        :particleSize="100"
        linesColor="#ddd"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      ></vue-particles>
      <div class="login-inner-container">
        <transition name="fade-transform-top">
          <el-form
            v-show="!showSelectUser"
            ref="loginForm"
            :model="formData"
            :rules="formRules"
            class="login-form"
            autocomplete="on"
            label-position="left"
          >
            <div class="title-container">
              <h3 class="title">管理端登录</h3>
            </div>
            <el-form-item prop="account">
              <span class="svg-container">
                <i class="el-icon-user"></i>
              </span>
              <el-input
                ref="account"
                v-model="formData.account"
                placeholder="account"
                name="account"
                type="text"
                tabindex="1"
                autocomplete="on"
              />
            </el-form-item>

            <el-tooltip
              v-model="capsTooltip"
              content="Caps lock is On"
              placement="right"
              manual
            >
              <el-form-item prop="password">
                <span class="svg-container">
                  <i class="el-icon-lock"></i>
                </span>
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="formData.password"
                  :type="passwordType"
                  placeholder="Password"
                  name="password"
                  tabindex="2"
                  autocomplete="on"
                  @keyup="checkCapslock"
                  @blur="capsTooltip = false"
                  @keyup.enter="handleLogin"
                />
                <span class="show-pwd" @click="showPassword">
                  <i class="el-icon-view"></i>
                </span>
              </el-form-item>
            </el-tooltip>

            <el-button
              :loading="loading"
              type="primary"
              size="medium"
              style="width: 100%"
              @click.prevent="handleLogin"
              >登 录</el-button
            >
            <div class="check">
              <el-checkbox v-model="check" label="记住密码"></el-checkbox>
            </div>
          </el-form>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs, ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import { setSession, setStorge, getStorge } from "@/utils/auth.js";
export default {
  name: "Login",
  setup() {
    const validateAccount = (rule, value, callback) => {
      // do valid here
      // if invalid, callback(new Error())
      if (value.length < 6) {
        return callback(new Error("请输入不小于6位账号"));
      }
      callback();
    };
    const validatePassword = (rule, value, callback) => {
      // do valid here
      // if invalid, callback(new Error())
      if (value.length < 6) {
        return callback(new Error("请输入不小于6位密码"));
      }
      callback();
    };
    const loginForm = ref(null);
    const account = ref(null);
    const password = ref(null);
    const router = useRouter();
    const data = reactive({
      formData: {
        account: "",
        password: "",
      },
      formRules: {
        account: [
          { required: true, trigger: "blur", validator: validateAccount },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      check: false,
    });
    if (getStorge("user")) {
      data.formData = getStorge("user");
      data.check = true;
    }
    const checkCapslock = (e) => {
      const { key } = e;
      data.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    };
    const showPassword = async () => {
      if (data.passwordType === "password") {
        data.passwordType = "";
      } else {
        data.passwordType = "password";
      }
      await nextTick();
      password.value.focus();
    };
    const handleLogin = () => {
      loginForm.value.validate(async (valid) => {
        if (valid) {
          if (data.check) {
            setStorge("user", data.formData);
          }
          setSession("token", "key123");
          router.push("/i/admin");
        }
      });
    };
    return {
      ...toRefs(data),
      loginForm,
      account,
      password,
      checkCapslock,
      showPassword,
      handleLogin,
    };
  },
};
</script>
<style lang="scss" scoped>
/* particles */
#particles-js {
  background-color: #2c3e50;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

/* footer */
.svg-link-container,
.info-container {
  position: absolute;
  display: flex;
  width: 100%;
  height: 40px;
  justify-content: center;
}

.svg-link-container {
  bottom: 15%;

  .icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;

    .vue-icon {
      width: 1.3em !important;
      height: 1.3em !important;
    }
    .element-icon {
      width: 5em !important;
      height: 2em !important;
    }
    .gitlab-icon {
      width: 4.8em !important;
      height: 2em !important;
    }
  }
}

.info-container {
  bottom: calc(15% - 50px);

  .text-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;

    span {
      color: #aaaaaa;
      font-size: 14px;
    }
  }
}
</style>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      // color: $light_gray;
      height: 47px;
      // caret-color: $cursor;
      font-size: 16px;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: rgb(41, 39, 50);
$dark_gray: #889aa4;
$light_gray: #eee;
$white: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;

  .login-inner-container {
    min-height: 600px;
    width: 100%;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;

    .release-info {
      width: 100px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #409eff;
      position: fixed;
      top: -50px;
      right: -50px;
      transform: rotate(45deg);
      cursor: pointer;

      span {
        user-select: none;
        padding-top: 65px;
        font-size: 18px;
        font-weight: bold;
        color: #eeeeee;
      }
    }
  }

  .login-form {
    position: absolute;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    // color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      // color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
      color: #fff;

      .logo-icon {
        position: relative;
        top: -1px;
        left: 7px;
        transform: rotate(180deg);
        width: 1em !important;
        height: 1em !important;
      }
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
.check {
  text-align: right;
}
:deep(.el-button) {
  height: 36px;
  margin-bottom: 10px;
  background-color: #314e75 !important;
  &:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.6);
  }
  //   line-height: 32px;
}
:deep(.el-checkbox__inner) {
  background-color: transparent !important;
  border-color: $white !important;
}
:deep(.el-checkbox__label) {
  color: #fff;
}
:deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
  color: $white !important;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}
.el-checkbox__inner {
  &:hover {
    border: 1px solid $white !important;
  }
}
.el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: $white !important;
}
</style>
